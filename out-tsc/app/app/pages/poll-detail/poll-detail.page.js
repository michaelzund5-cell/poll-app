/**
 * @file src/app/pages/poll-detail/poll-detail.page.ts
 * @description Survey detail, vote selection and live-result controller.
 */
import { Component, computed, inject, signal, } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PollFacade } from '../../application/polls/poll.facade';
import { isClosed } from '../../domain/polls/poll.rules';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
function PollDetailPage_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtext(1, "Loading survey\u2026");
    i0.ɵɵelementEnd();
} }
function PollDetailPage_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.problem());
} }
function PollDetailPage_Conditional_5_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const current_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(current_r2.description);
} }
function PollDetailPage_Conditional_5_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Voting disabled");
    i0.ɵɵelementEnd();
} }
function PollDetailPage_Conditional_5_For_24_For_11_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 22);
    i0.ɵɵlistener("click", function PollDetailPage_Conditional_5_For_24_For_11_Template_button_click_0_listener() { const choice_r4 = i0.ɵɵrestoreView(_r3).$implicit; const prompt_r5 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.toggle(prompt_r5.id, choice_r4.id, prompt_r5.multiple)); });
    i0.ɵɵelement(1, "span", 23);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const choice_r4 = ctx.$implicit;
    const prompt_r5 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("selected", ctx_r0.isSelected(prompt_r5.id, choice_r4.id));
    i0.ɵɵproperty("disabled", ctx_r0.locked());
    i0.ɵɵadvance();
    i0.ɵɵclassProp("multiple", prompt_r5.multiple);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(choice_r4.text);
} }
function PollDetailPage_Conditional_5_For_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 18)(1, "div", 19)(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "h3");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "div", 20);
    i0.ɵɵrepeaterCreate(10, PollDetailPage_Conditional_5_For_24_For_11_Template, 4, 6, "button", 21, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prompt_r5 = ctx.$implicit;
    const ɵ$index_58_r6 = ctx.$index;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("disabled", ctx_r0.locked());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ɵ$index_58_r6 + 1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(prompt_r5.text);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", prompt_r5.multiple ? "Select one or more answers" : "Select one answer", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(prompt_r5.choices);
} }
function PollDetailPage_Conditional_5_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.alreadyVoted() ? "You already voted in this browser. Results remain visible." : "This survey has ended. It can still be viewed, but voting is disabled.", " ");
} }
function PollDetailPage_Conditional_5_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "footer", 13)(1, "p", 24);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 22);
    i0.ɵɵlistener("click", function PollDetailPage_Conditional_5_Conditional_26_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.submitVote()); });
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.feedback());
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r0.canSubmit() || ctx_r0.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.saving() ? "Submitting\u2026" : "Submit vote", " ");
} }
function PollDetailPage_Conditional_5_For_37_For_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25)(1, "div")(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 26);
    i0.ɵɵelement(7, "div");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "small");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const choice_r8 = ctx.$implicit;
    const prompt_r9 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(choice_r8.text);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r0.livePercentage(prompt_r9, choice_r8), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", ctx_r0.livePercentage(prompt_r9, choice_r8), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", ctx_r0.liveVotes(prompt_r9, choice_r8), " vote", ctx_r0.liveVotes(prompt_r9, choice_r8) === 1 ? "" : "s", " ");
} }
function PollDetailPage_Conditional_5_For_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 16)(1, "h3");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(3, PollDetailPage_Conditional_5_For_37_For_4_Template, 10, 6, "div", 25, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prompt_r9 = ctx.$implicit;
    const ɵ$index_112_r10 = ctx.$index;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ɵ$index_112_r10 + 1, ". ", prompt_r9.text);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(prompt_r9.choices);
} }
function PollDetailPage_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "header", 4)(1, "div")(2, "p", 5);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h1");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(6, PollDetailPage_Conditional_5_Conditional_6_Template, 2, 1, "p");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 6)(8, "span");
    i0.ɵɵtext(9, "Deadline");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "strong");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 7);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "div", 8)(15, "section", 9)(16, "header", 10)(17, "div")(18, "p", 5);
    i0.ɵɵtext(19, "Vote");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "h2");
    i0.ɵɵtext(21, "Your answers");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(22, PollDetailPage_Conditional_5_Conditional_22_Template, 2, 0, "span");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(23, PollDetailPage_Conditional_5_For_24_Template, 12, 5, "article", 11, _forTrack0);
    i0.ɵɵconditionalCreate(25, PollDetailPage_Conditional_5_Conditional_25_Template, 2, 1, "div", 12)(26, PollDetailPage_Conditional_5_Conditional_26_Template, 5, 3, "footer", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "aside", 14)(28, "header", 10)(29, "div")(30, "p", 5);
    i0.ɵɵtext(31, "Live");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "h2");
    i0.ɵɵtext(33, "Current results");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "span", 15);
    i0.ɵɵtext(35, "Live");
    i0.ɵɵelementEnd()();
    i0.ɵɵrepeaterCreate(36, PollDetailPage_Conditional_5_For_37_Template, 5, 2, "section", 16, _forTrack0);
    i0.ɵɵelementStart(38, "p", 17);
    i0.ɵɵtext(39, " Results update while you select answers and refresh when submitted votes arrive through Supabase Realtime. ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const current_r2 = ctx;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(current_r2.category);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(current_r2.title);
    i0.ɵɵadvance();
    i0.ɵɵconditional(current_r2.description ? 6 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.formatDate(current_r2.closesAt));
    i0.ɵɵadvance();
    i0.ɵɵclassProp("closed", ctx_r0.locked());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.locked() ? "Past survey" : "Open survey", " ");
    i0.ɵɵadvance(9);
    i0.ɵɵconditional(ctx_r0.locked() ? 22 : -1);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(current_r2.prompts);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.locked() ? 25 : 26);
    i0.ɵɵadvance(11);
    i0.ɵɵrepeater(current_r2.prompts);
} }
export class PollDetailPage {
    route = inject(ActivatedRoute);
    polls = inject(PollFacade);
    pollId = Number(this.route.snapshot.paramMap.get('id'));
    votedKey = `poll-app:voted:${this.pollId}`;
    stopRealtime;
    poll = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "poll" }] : /* istanbul ignore next */ []));
    selected = signal({}, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "selected" }] : /* istanbul ignore next */ []));
    busy = signal(true, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "busy" }] : /* istanbul ignore next */ []));
    saving = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "saving" }] : /* istanbul ignore next */ []));
    problem = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "problem" }] : /* istanbul ignore next */ []));
    feedback = signal(this.route.snapshot.queryParamMap.get('created') === '1'
        ? 'Survey published successfully.'
        : null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "feedback" }] : /* istanbul ignore next */ []));
    alreadyVoted = signal(this.readVoteMarker(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "alreadyVoted" }] : /* istanbul ignore next */ []));
    locked = computed(() => this.alreadyVoted() || isClosed(this.poll()?.closesAt), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "locked" }] : /* istanbul ignore next */ []));
    constructor() {
        void this.load();
        this.stopRealtime = this.polls.watchVotes(() => {
            void this.load(false);
        });
    }
    ngOnDestroy() {
        this.stopRealtime?.();
    }
    isSelected(questionId, answerId) {
        return (this.selected()[questionId] ?? []).includes(answerId);
    }
    toggle(questionId, answerId, multiple) {
        if (this.locked()) {
            return;
        }
        this.selected.update((current) => {
            const previous = current[questionId] ?? [];
            const next = multiple
                ? previous.includes(answerId)
                    ? previous.filter((id) => id !== answerId)
                    : [...previous, answerId]
                : [answerId];
            return { ...current, [questionId]: next };
        });
    }
    livePercentage(prompt, choice) {
        if (this.locked()) {
            return choice.percentage;
        }
        const selectedIds = this.selected()[prompt.id] ?? [];
        const previewVotes = choice.votes + (selectedIds.includes(choice.id) ? 1 : 0);
        const previewTotal = prompt.totalVotes + selectedIds.length;
        return previewTotal === 0
            ? 0
            : Math.round((previewVotes / previewTotal) * 100);
    }
    liveVotes(prompt, choice) {
        return choice.votes + (!this.locked() && this.isSelected(prompt.id, choice.id) ? 1 : 0);
    }
    canSubmit() {
        const current = this.poll();
        return Boolean(current &&
            current.prompts.length > 0 &&
            current.prompts.every((prompt) => (this.selected()[prompt.id] ?? []).length > 0));
    }
    async submitVote() {
        if (!this.canSubmit() || this.locked() || this.saving()) {
            return;
        }
        this.saving.set(true);
        this.feedback.set(null);
        try {
            await this.polls.vote(Object.values(this.selected()).flat());
            this.writeVoteMarker();
            this.alreadyVoted.set(true);
            this.selected.set({});
            this.feedback.set('Vote saved. Live results were updated.');
            await this.load(false);
        }
        catch (error) {
            console.error('Vote submission failed', error);
            this.feedback.set('Your vote could not be saved.');
        }
        finally {
            this.saving.set(false);
        }
    }
    async load(showSpinner = true) {
        if (!Number.isFinite(this.pollId)) {
            this.problem.set('Invalid survey id.');
            this.busy.set(false);
            return;
        }
        if (showSpinner) {
            this.busy.set(true);
        }
        try {
            const current = await this.polls.open(this.pollId);
            this.poll.set(current);
            this.problem.set(current ? null : 'This survey does not exist.');
        }
        catch (error) {
            console.error('Survey loading failed', error);
            this.problem.set('The survey could not be loaded.');
        }
        finally {
            this.busy.set(false);
        }
    }
    formatDate(date) {
        if (!date) {
            return 'No deadline';
        }
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(date);
    }
    readVoteMarker() {
        try {
            return Boolean(localStorage.getItem(this.votedKey));
        }
        catch {
            return false;
        }
    }
    writeVoteMarker() {
        try {
            localStorage.setItem(this.votedKey, new Date().toISOString());
        }
        catch {
            // Voting still succeeds if local browser storage is unavailable.
        }
    }
    static ɵfac = function PollDetailPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PollDetailPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PollDetailPage, selectors: [["app-poll-detail-page"]], decls: 6, vars: 1, consts: [[1, "detail"], ["routerLink", "/", 1, "back"], [1, "state"], [1, "state", "error"], [1, "survey-header"], [1, "eyebrow"], [1, "meta"], [1, "badge"], [1, "layout"], [1, "voting"], [1, "panel-header"], [1, "question", 3, "disabled"], [1, "locked-note"], [1, "vote-footer"], [1, "results"], [1, "live"], [1, "result-group"], [1, "results-note"], [1, "question"], [1, "question-title"], [1, "choices"], ["type", "button", 3, "selected", "disabled"], ["type", "button", 3, "click", "disabled"], [1, "control"], ["aria-live", "polite"], [1, "result-row"], [1, "bar"]], template: function PollDetailPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "a", 1);
            i0.ɵɵtext(2, "\u2190 Back to surveys");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(3, PollDetailPage_Conditional_3_Template, 2, 0, "div", 2)(4, PollDetailPage_Conditional_4_Template, 2, 1, "div", 3)(5, PollDetailPage_Conditional_5_Template, 40, 9);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_0_0;
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.busy() ? 3 : ctx.problem() ? 4 : (tmp_0_0 = ctx.poll()) ? 5 : -1, tmp_0_0);
        } }, dependencies: [RouterLink], styles: ["[_nghost-%COMP%] {\n  display: block;\n  min-height: calc(100vh - 72px);\n  background: #f7f4f7;\n  color: #332338;\n}\n\n.detail[_ngcontent-%COMP%] {\n  width: min(1180px, 100%);\n  margin: 0 auto;\n  padding: clamp(1rem, 3vw, 2rem) clamp(1rem, 4vw, 2.5rem) 3rem;\n}\n\n.back[_ngcontent-%COMP%] {\n  display: inline-flex;\n  margin-bottom: 1rem;\n  color: #655767;\n  font-size: 0.8rem;\n  font-weight: 800;\n}\n\n.state[_ngcontent-%COMP%] {\n  padding: 3rem 1rem;\n  text-align: center;\n}\n\n.error[_ngcontent-%COMP%] {\n  color: #a74650;\n}\n\n.survey-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 2rem;\n  margin-bottom: 1rem;\n  padding: 1.25rem 1.5rem;\n  border-radius: 0.85rem;\n  background: #332338;\n  color: #fff;\n}\n\n.eyebrow[_ngcontent-%COMP%] {\n  margin: 0 0 0.25rem;\n  color: #e59a4e;\n  font-size: 0.68rem;\n  font-weight: 900;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.survey-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #ffc473;\n  font-size: clamp(1.8rem, 4vw, 3rem);\n}\n\n.survey-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:not(.eyebrow) {\n  max-width: 700px;\n  margin: 0.65rem 0 0;\n  color: #ede4ee;\n  line-height: 1.5;\n}\n\n.meta[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 140px;\n  gap: 0.25rem;\n  color: #dfd4e0;\n  font-size: 0.72rem;\n}\n\n.meta[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #fff;\n}\n\n.badge[_ngcontent-%COMP%] {\n  width: fit-content;\n  margin-top: 0.5rem;\n  border-radius: 999px;\n  padding: 0.32rem 0.55rem;\n  background: #ffc473;\n  color: #332338;\n  font-weight: 900;\n}\n\n.badge.closed[_ngcontent-%COMP%] {\n  background: #59415e;\n  color: #f1e8f2;\n}\n\n.layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.08fr) minmax(340px, 0.92fr);\n  gap: 1rem;\n  align-items: start;\n}\n\n.voting[_ngcontent-%COMP%], \n.results[_ngcontent-%COMP%] {\n  border: 1px solid #e8e0e9;\n  border-radius: 0.85rem;\n  background: #fff;\n  box-shadow: 0 12px 30px rgba(51, 35, 56, 0.06);\n}\n\n.results[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 88px;\n}\n\n.panel-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1rem 1.1rem;\n  border-bottom: 1px solid #eee7ef;\n}\n\n.panel-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.15rem;\n}\n\n.panel-header[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #9b6b35;\n  font-size: 0.7rem;\n  font-weight: 900;\n}\n\n.question[_ngcontent-%COMP%] {\n  padding: 1rem 1.1rem;\n  border-bottom: 1px solid #eee7ef;\n}\n\n.question.disabled[_ngcontent-%COMP%] {\n  background: #fbf9fb;\n}\n\n.question-title[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.7rem minmax(0, 1fr);\n  gap: 0.65rem;\n}\n\n.question-title[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 1.55rem;\n  height: 1.55rem;\n  place-items: center;\n  border-radius: 50%;\n  background: #ffc473;\n  font-size: 0.7rem;\n  font-weight: 900;\n}\n\n.question-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.95rem;\n}\n\n.question-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0;\n  color: #857986;\n  font-size: 0.7rem;\n}\n\n.choices[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.45rem;\n  margin-top: 0.8rem;\n}\n\n.choices[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.1rem minmax(0, 1fr);\n  gap: 0.55rem;\n  align-items: center;\n  width: 100%;\n  border: 1px solid #e5dee6;\n  border-radius: 0.45rem;\n  padding: 0.65rem 0.7rem;\n  background: #fff;\n  color: #332338;\n  text-align: left;\n}\n\n.choices[_ngcontent-%COMP%]   button.selected[_ngcontent-%COMP%] {\n  border-color: #e6a75f;\n  background: #fff8ef;\n}\n\n.choices[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.62;\n}\n\n.control[_ngcontent-%COMP%] {\n  width: 0.9rem;\n  height: 0.9rem;\n  border: 1.5px solid #887c89;\n  border-radius: 50%;\n}\n\n.control.multiple[_ngcontent-%COMP%] {\n  border-radius: 0.15rem;\n}\n\n.choices[_ngcontent-%COMP%]   button.selected[_ngcontent-%COMP%]   .control[_ngcontent-%COMP%] {\n  border-color: #e59a4e;\n  background: #ffc473;\n  box-shadow: inset 0 0 0 2px #fff;\n}\n\n.vote-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 1rem;\n  padding: 1rem 1.1rem;\n}\n\n.vote-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 auto 0 0;\n  color: #756877;\n  font-size: 0.72rem;\n}\n\n.vote-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  border-radius: 0.45rem;\n  padding: 0.65rem 0.9rem;\n  background: #ffc473;\n  color: #332338;\n  font-weight: 900;\n}\n\n.vote-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n\n.locked-note[_ngcontent-%COMP%] {\n  margin: 1rem;\n  padding: 0.85rem;\n  border-radius: 0.55rem;\n  background: #f4eef5;\n  color: #655767;\n  font-size: 0.78rem;\n}\n\n.live[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n}\n\n.live[_ngcontent-%COMP%]::before {\n  width: 0.55rem;\n  height: 0.55rem;\n  border-radius: 50%;\n  background: #52a96c;\n  content: \"\";\n  box-shadow: 0 0 0 4px rgba(82, 169, 108, 0.13);\n}\n\n.result-group[_ngcontent-%COMP%] {\n  padding: 1rem 1.1rem;\n  border-bottom: 1px solid #eee7ef;\n}\n\n.result-group[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.8rem;\n  font-size: 0.85rem;\n}\n\n.result-row[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.3rem;\n  margin-top: 0.8rem;\n}\n\n.result-row[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:first-child {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  font-size: 0.78rem;\n}\n\n.result-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #9b6b35;\n}\n\n.bar[_ngcontent-%COMP%] {\n  height: 0.55rem;\n  overflow: hidden;\n  border-radius: 999px;\n  background: #eee8ef;\n}\n\n.bar[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: inherit;\n  background: linear-gradient(90deg, #f3a955, #ffc473);\n  transition: width 180ms ease;\n}\n\n.result-row[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #968b97;\n  font-size: 0.65rem;\n}\n\n.results-note[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 1rem 1.1rem;\n  color: #756877;\n  font-size: 0.7rem;\n  line-height: 1.45;\n}\n\n@media (max-width: 900px) {\n  .layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .results[_ngcontent-%COMP%] {\n    position: static;\n  }\n}\n\n@media (max-width: 600px) {\n  .detail[_ngcontent-%COMP%] {\n    padding-inline: 0.75rem;\n  }\n\n  .survey-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n  }\n\n  .meta[_ngcontent-%COMP%] {\n    min-width: 0;\n  }\n\n  .vote-footer[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .vote-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PollDetailPage, [{
        type: Component,
        args: [{ selector: 'app-poll-detail-page', standalone: true, imports: [RouterLink], template: "<section class=\"detail\">\n  <a class=\"back\" routerLink=\"/\">\u2190 Back to surveys</a>\n\n  @if (busy()) {\n    <div class=\"state\">Loading survey\u2026</div>\n  } @else if (problem()) {\n    <div class=\"state error\">{{ problem() }}</div>\n  } @else if (poll(); as current) {\n    <header class=\"survey-header\">\n      <div>\n        <p class=\"eyebrow\">{{ current.category }}</p>\n        <h1>{{ current.title }}</h1>\n\n        @if (current.description) {\n          <p>{{ current.description }}</p>\n        }\n      </div>\n\n      <div class=\"meta\">\n        <span>Deadline</span>\n        <strong>{{ formatDate(current.closesAt) }}</strong>\n\n        <span class=\"badge\" [class.closed]=\"locked()\">\n          {{ locked() ? 'Past survey' : 'Open survey' }}\n        </span>\n      </div>\n    </header>\n\n    <div class=\"layout\">\n      <section class=\"voting\">\n        <header class=\"panel-header\">\n          <div>\n            <p class=\"eyebrow\">Vote</p>\n            <h2>Your answers</h2>\n          </div>\n\n          @if (locked()) {\n            <span>Voting disabled</span>\n          }\n        </header>\n\n        @for (\n          prompt of current.prompts;\n          track prompt.id;\n          let questionIndex = $index\n        ) {\n          <article class=\"question\" [class.disabled]=\"locked()\">\n            <div class=\"question-title\">\n              <span>{{ questionIndex + 1 }}</span>\n              <div>\n                <h3>{{ prompt.text }}</h3>\n                <p>\n                  {{\n                    prompt.multiple\n                      ? 'Select one or more answers'\n                      : 'Select one answer'\n                  }}\n                </p>\n              </div>\n            </div>\n\n            <div class=\"choices\">\n              @for (choice of prompt.choices; track choice.id) {\n                <button\n                  type=\"button\"\n                  [class.selected]=\"isSelected(prompt.id, choice.id)\"\n                  [disabled]=\"locked()\"\n                  (click)=\"toggle(prompt.id, choice.id, prompt.multiple)\"\n                >\n                  <span\n                    class=\"control\"\n                    [class.multiple]=\"prompt.multiple\"\n                  ></span>\n                  <span>{{ choice.text }}</span>\n                </button>\n              }\n            </div>\n          </article>\n        }\n\n        @if (locked()) {\n          <div class=\"locked-note\">\n            {{\n              alreadyVoted()\n                ? 'You already voted in this browser. Results remain visible.'\n                : 'This survey has ended. It can still be viewed, but voting is disabled.'\n            }}\n          </div>\n        } @else {\n          <footer class=\"vote-footer\">\n            <p aria-live=\"polite\">{{ feedback() }}</p>\n            <button\n              type=\"button\"\n              [disabled]=\"!canSubmit() || saving()\"\n              (click)=\"submitVote()\"\n            >\n              {{ saving() ? 'Submitting\u2026' : 'Submit vote' }}\n            </button>\n          </footer>\n        }\n      </section>\n\n      <aside class=\"results\">\n        <header class=\"panel-header\">\n          <div>\n            <p class=\"eyebrow\">Live</p>\n            <h2>Current results</h2>\n          </div>\n          <span class=\"live\">Live</span>\n        </header>\n\n        @for (\n          prompt of current.prompts;\n          track prompt.id;\n          let questionIndex = $index\n        ) {\n          <section class=\"result-group\">\n            <h3>{{ questionIndex + 1 }}. {{ prompt.text }}</h3>\n\n            @for (choice of prompt.choices; track choice.id) {\n              <div class=\"result-row\">\n                <div>\n                  <span>{{ choice.text }}</span>\n                  <strong>{{ livePercentage(prompt, choice) }}%</strong>\n                </div>\n\n                <div class=\"bar\">\n                  <div\n                    [style.width.%]=\"livePercentage(prompt, choice)\"\n                  ></div>\n                </div>\n\n                <small>\n                  {{ liveVotes(prompt, choice) }}\n                  vote{{ liveVotes(prompt, choice) === 1 ? '' : 's' }}\n                </small>\n              </div>\n            }\n          </section>\n        }\n\n        <p class=\"results-note\">\n          Results update while you select answers and refresh when submitted\n          votes arrive through Supabase Realtime.\n        </p>\n      </aside>\n    </div>\n  }\n</section>\n", styles: [":host {\n  display: block;\n  min-height: calc(100vh - 72px);\n  background: #f7f4f7;\n  color: #332338;\n}\n\n.detail {\n  width: min(1180px, 100%);\n  margin: 0 auto;\n  padding: clamp(1rem, 3vw, 2rem) clamp(1rem, 4vw, 2.5rem) 3rem;\n}\n\n.back {\n  display: inline-flex;\n  margin-bottom: 1rem;\n  color: #655767;\n  font-size: 0.8rem;\n  font-weight: 800;\n}\n\n.state {\n  padding: 3rem 1rem;\n  text-align: center;\n}\n\n.error {\n  color: #a74650;\n}\n\n.survey-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 2rem;\n  margin-bottom: 1rem;\n  padding: 1.25rem 1.5rem;\n  border-radius: 0.85rem;\n  background: #332338;\n  color: #fff;\n}\n\n.eyebrow {\n  margin: 0 0 0.25rem;\n  color: #e59a4e;\n  font-size: 0.68rem;\n  font-weight: 900;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.survey-header h1 {\n  margin: 0;\n  color: #ffc473;\n  font-size: clamp(1.8rem, 4vw, 3rem);\n}\n\n.survey-header p:not(.eyebrow) {\n  max-width: 700px;\n  margin: 0.65rem 0 0;\n  color: #ede4ee;\n  line-height: 1.5;\n}\n\n.meta {\n  display: grid;\n  min-width: 140px;\n  gap: 0.25rem;\n  color: #dfd4e0;\n  font-size: 0.72rem;\n}\n\n.meta strong {\n  color: #fff;\n}\n\n.badge {\n  width: fit-content;\n  margin-top: 0.5rem;\n  border-radius: 999px;\n  padding: 0.32rem 0.55rem;\n  background: #ffc473;\n  color: #332338;\n  font-weight: 900;\n}\n\n.badge.closed {\n  background: #59415e;\n  color: #f1e8f2;\n}\n\n.layout {\n  display: grid;\n  grid-template-columns: minmax(0, 1.08fr) minmax(340px, 0.92fr);\n  gap: 1rem;\n  align-items: start;\n}\n\n.voting,\n.results {\n  border: 1px solid #e8e0e9;\n  border-radius: 0.85rem;\n  background: #fff;\n  box-shadow: 0 12px 30px rgba(51, 35, 56, 0.06);\n}\n\n.results {\n  position: sticky;\n  top: 88px;\n}\n\n.panel-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1rem 1.1rem;\n  border-bottom: 1px solid #eee7ef;\n}\n\n.panel-header h2 {\n  margin: 0;\n  font-size: 1.15rem;\n}\n\n.panel-header > span {\n  color: #9b6b35;\n  font-size: 0.7rem;\n  font-weight: 900;\n}\n\n.question {\n  padding: 1rem 1.1rem;\n  border-bottom: 1px solid #eee7ef;\n}\n\n.question.disabled {\n  background: #fbf9fb;\n}\n\n.question-title {\n  display: grid;\n  grid-template-columns: 1.7rem minmax(0, 1fr);\n  gap: 0.65rem;\n}\n\n.question-title > span {\n  display: grid;\n  width: 1.55rem;\n  height: 1.55rem;\n  place-items: center;\n  border-radius: 50%;\n  background: #ffc473;\n  font-size: 0.7rem;\n  font-weight: 900;\n}\n\n.question-title h3 {\n  margin: 0;\n  font-size: 0.95rem;\n}\n\n.question-title p {\n  margin: 0.25rem 0 0;\n  color: #857986;\n  font-size: 0.7rem;\n}\n\n.choices {\n  display: grid;\n  gap: 0.45rem;\n  margin-top: 0.8rem;\n}\n\n.choices button {\n  display: grid;\n  grid-template-columns: 1.1rem minmax(0, 1fr);\n  gap: 0.55rem;\n  align-items: center;\n  width: 100%;\n  border: 1px solid #e5dee6;\n  border-radius: 0.45rem;\n  padding: 0.65rem 0.7rem;\n  background: #fff;\n  color: #332338;\n  text-align: left;\n}\n\n.choices button.selected {\n  border-color: #e6a75f;\n  background: #fff8ef;\n}\n\n.choices button:disabled {\n  cursor: not-allowed;\n  opacity: 0.62;\n}\n\n.control {\n  width: 0.9rem;\n  height: 0.9rem;\n  border: 1.5px solid #887c89;\n  border-radius: 50%;\n}\n\n.control.multiple {\n  border-radius: 0.15rem;\n}\n\n.choices button.selected .control {\n  border-color: #e59a4e;\n  background: #ffc473;\n  box-shadow: inset 0 0 0 2px #fff;\n}\n\n.vote-footer {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 1rem;\n  padding: 1rem 1.1rem;\n}\n\n.vote-footer p {\n  margin: 0 auto 0 0;\n  color: #756877;\n  font-size: 0.72rem;\n}\n\n.vote-footer button {\n  border: 0;\n  border-radius: 0.45rem;\n  padding: 0.65rem 0.9rem;\n  background: #ffc473;\n  color: #332338;\n  font-weight: 900;\n}\n\n.vote-footer button:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n\n.locked-note {\n  margin: 1rem;\n  padding: 0.85rem;\n  border-radius: 0.55rem;\n  background: #f4eef5;\n  color: #655767;\n  font-size: 0.78rem;\n}\n\n.live {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n}\n\n.live::before {\n  width: 0.55rem;\n  height: 0.55rem;\n  border-radius: 50%;\n  background: #52a96c;\n  content: \"\";\n  box-shadow: 0 0 0 4px rgba(82, 169, 108, 0.13);\n}\n\n.result-group {\n  padding: 1rem 1.1rem;\n  border-bottom: 1px solid #eee7ef;\n}\n\n.result-group h3 {\n  margin: 0 0 0.8rem;\n  font-size: 0.85rem;\n}\n\n.result-row {\n  display: grid;\n  gap: 0.3rem;\n  margin-top: 0.8rem;\n}\n\n.result-row > div:first-child {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  font-size: 0.78rem;\n}\n\n.result-row strong {\n  color: #9b6b35;\n}\n\n.bar {\n  height: 0.55rem;\n  overflow: hidden;\n  border-radius: 999px;\n  background: #eee8ef;\n}\n\n.bar > div {\n  height: 100%;\n  border-radius: inherit;\n  background: linear-gradient(90deg, #f3a955, #ffc473);\n  transition: width 180ms ease;\n}\n\n.result-row small {\n  color: #968b97;\n  font-size: 0.65rem;\n}\n\n.results-note {\n  margin: 0;\n  padding: 1rem 1.1rem;\n  color: #756877;\n  font-size: 0.7rem;\n  line-height: 1.45;\n}\n\n@media (max-width: 900px) {\n  .layout {\n    grid-template-columns: 1fr;\n  }\n\n  .results {\n    position: static;\n  }\n}\n\n@media (max-width: 600px) {\n  .detail {\n    padding-inline: 0.75rem;\n  }\n\n  .survey-header {\n    flex-direction: column;\n    gap: 1rem;\n  }\n\n  .meta {\n    min-width: 0;\n  }\n\n  .vote-footer {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .vote-footer button {\n    width: 100%;\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PollDetailPage, { className: "PollDetailPage", filePath: "app/pages/poll-detail/poll-detail.page.ts", lineNumber: 29 }); })();
//# sourceMappingURL=poll-detail.page.js.map