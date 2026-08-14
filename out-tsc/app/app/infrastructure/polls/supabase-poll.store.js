/**
 * @file src/app/infrastructure/polls/supabase-poll.store.ts
 * @description Supabase persistence adapter for polls.
 *
 * Only this layer knows the database schema. Pages and domain code never build
 * Supabase queries directly.
 */
import { inject, Injectable } from '@angular/core';
import { SupabaseConnector } from '../supabase/supabase.connector';
import * as i0 from "@angular/core";
export class SupabasePollStore {
    database = inject(SupabaseConnector).client;
    /** Loads the lightweight survey fields required by the home page. */
    async list() {
        const { data, error } = await this.database
            .from('surveys')
            .select('id,title,category,description,end_date');
        if (error) {
            throw new Error(`Survey list query failed: ${error.message}`);
        }
        return (data ?? []);
    }
    /** Loads one survey including ordered questions and answer options. */
    async get(id) {
        const { data, error } = await this.database
            .from('surveys')
            .select('id,title,category,description,end_date,questions(id,text,allow_multiple,position,answers(id,label,text,position))')
            .eq('id', id)
            .maybeSingle();
        if (error) {
            throw new Error(`Survey detail query failed: ${error.message}`);
        }
        return data;
    }
    /**
     * Creates a complete survey hierarchy.
     *
     * Parent records are created before their children. If a child insert fails,
     * the newly-created parent survey is removed to avoid partial test data.
     */
    async create(draft) {
        const { data: survey, error } = await this.database
            .from('surveys')
            .insert({
            title: draft.title,
            category: draft.category,
            description: draft.description ?? null,
            end_date: draft.closesAt ?? null,
        })
            .select('id')
            .single();
        if (error || !survey) {
            throw new Error(`Survey creation failed: ${error?.message ?? 'Missing id'}`);
        }
        try {
            for (const [questionIndex, prompt] of draft.prompts.entries()) {
                const { data: question, error: questionError } = await this.database
                    .from('questions')
                    .insert({
                    survey_id: survey.id,
                    text: prompt.text,
                    allow_multiple: prompt.multiple,
                    position: questionIndex,
                })
                    .select('id')
                    .single();
                if (questionError || !question) {
                    throw new Error(questionError?.message ?? 'Question id missing');
                }
                const answerRows = prompt.choices.map((choice, answerIndex) => ({
                    question_id: question.id,
                    label: String.fromCharCode(65 + answerIndex),
                    text: choice.text,
                    position: answerIndex,
                }));
                const { error: answerError } = await this.database
                    .from('answers')
                    .insert(answerRows);
                if (answerError) {
                    throw new Error(answerError.message);
                }
            }
        }
        catch (childError) {
            await this.database.from('surveys').delete().eq('id', survey.id);
            throw childError;
        }
        return survey.id;
    }
    /** Stores the selected answer ids for one submitted response. */
    async recordVotes(answerIds) {
        const rows = answerIds.map((answerId) => ({ answer_id: answerId }));
        const { error } = await this.database.from('votes').insert(rows);
        if (error) {
            throw new Error(`Vote creation failed: ${error.message}`);
        }
    }
    /** Loads persisted votes for the supplied answer ids. */
    async votesFor(answerIds) {
        if (answerIds.length === 0) {
            return [];
        }
        const { data, error } = await this.database
            .from('votes')
            .select('answer_id')
            .in('answer_id', answerIds);
        if (error) {
            throw new Error(`Vote query failed: ${error.message}`);
        }
        return (data ?? []);
    }
    /**
     * Subscribes to vote inserts so detail pages can refresh live result data.
     * Returns a cleanup callback for the page lifecycle.
     */
    watchVotes(onVoteInserted) {
        const channel = this.database
            .channel(`poll-votes-${crypto.randomUUID()}`)
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'votes' }, () => onVoteInserted())
            .subscribe();
        return () => {
            void this.database.removeChannel(channel);
        };
    }
    static ɵfac = function SupabasePollStore_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SupabasePollStore)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: SupabasePollStore, factory: SupabasePollStore.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SupabasePollStore, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=supabase-poll.store.js.map