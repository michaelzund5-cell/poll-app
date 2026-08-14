/**
 * @file src/app/application/polls/poll.facade.ts
 * @description Application use cases and persistence-to-domain mapping.
 */
import { inject, Injectable } from '@angular/core';
import { POLL_CATEGORIES, } from '../../domain/polls/poll.contracts';
import { SupabasePollStore } from '../../infrastructure/polls/supabase-poll.store';
import * as i0 from "@angular/core";
const FALLBACK_CATEGORY = 'Lifestyle & Preferences';
export class PollFacade {
    store = inject(SupabasePollStore);
    /** Loads domain-friendly summaries for the home screen. */
    async browse() {
        const rows = await this.store.list();
        return rows.map((row) => ({
            id: row.id,
            title: row.title,
            category: this.toCategory(row.category),
            description: row.description ?? undefined,
            closesAt: row.end_date ? new Date(row.end_date) : undefined,
        }));
    }
    /** Loads one survey and calculates current vote totals/percentages. */
    async open(id) {
        const row = await this.store.get(id);
        if (!row) {
            return null;
        }
        const questions = [...row.questions].sort((left, right) => left.position - right.position);
        const answerIds = questions.flatMap((question) => question.answers.map((answer) => answer.id));
        const votes = await this.store.votesFor(answerIds);
        const votesByAnswer = new Map();
        for (const vote of votes) {
            votesByAnswer.set(vote.answer_id, (votesByAnswer.get(vote.answer_id) ?? 0) + 1);
        }
        return {
            id: row.id,
            title: row.title,
            category: this.toCategory(row.category),
            description: row.description ?? undefined,
            closesAt: row.end_date ? new Date(row.end_date) : undefined,
            prompts: questions.map((question) => {
                const choices = [...question.answers].sort((left, right) => left.position - right.position);
                const totalVotes = choices.reduce((total, answer) => total + (votesByAnswer.get(answer.id) ?? 0), 0);
                return {
                    id: question.id,
                    text: question.text,
                    multiple: question.allow_multiple,
                    totalVotes,
                    choices: choices.map((answer) => {
                        const votesForAnswer = votesByAnswer.get(answer.id) ?? 0;
                        return {
                            id: answer.id,
                            label: answer.label,
                            text: answer.text,
                            votes: votesForAnswer,
                            percentage: totalVotes === 0
                                ? 0
                                : Math.round((votesForAnswer / totalVotes) * 100),
                        };
                    }),
                };
            }),
        };
    }
    create(draft) {
        return this.store.create(draft);
    }
    vote(answerIds) {
        return this.store.recordVotes(answerIds);
    }
    watchVotes(onVoteInserted) {
        return this.store.watchVotes(onVoteInserted);
    }
    toCategory(rawCategory) {
        const normalized = rawCategory.trim();
        return POLL_CATEGORIES.includes(normalized)
            ? normalized
            : FALLBACK_CATEGORY;
    }
    static ɵfac = function PollFacade_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PollFacade)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: PollFacade, factory: PollFacade.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PollFacade, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=poll.facade.js.map