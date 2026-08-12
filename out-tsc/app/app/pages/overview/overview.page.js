/**
 * @file src/app/pages/overview/overview.page.ts
 * @description Home controller for sorting and filtering surveys.
 */
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PollFacade } from '../../application/polls/poll.facade';
import { POLL_CATEGORIES, } from '../../domain/polls/poll.contracts';
import { deadlineTimestamp, daysRemaining, isClosed, POLL_LIMITS, } from '../../domain/polls/poll.rules';
import { CreatePollDialogService } from '../../presentation/create-poll-dialog/create-poll-dialog.service';
import * as i0 from "@angular/core";
const _c0 = a0 => ["/poll", a0];
const _forTrack0 = ($index, $item) => $item.id;
function OverviewPage_Conditional_18_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 17)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "small");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const poll_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(4, _c0, poll_r1.id));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(poll_r1.category);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(poll_r1.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.deadlineLabel(poll_r1.closesAt));
} }
function OverviewPage_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 8)(1, "header")(2, "div")(3, "p", 3);
    i0.ɵɵtext(4, "Priority");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h3");
    i0.ɵɵtext(6, "Ending soon surveys");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8, "Earliest deadline first");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 16);
    i0.ɵɵrepeaterCreate(10, OverviewPage_Conditional_18_For_11_Template, 7, 6, "a", 17, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵrepeater(ctx_r1.closingSoon());
} }
function OverviewPage_For_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const category_r3 = ctx.$implicit;
    i0.ɵɵproperty("value", category_r3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(category_r3);
} }
function OverviewPage_Conditional_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Loading surveys\u2026 ");
} }
function OverviewPage_Conditional_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.problem());
} }
function OverviewPage_Conditional_42_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18)(1, "strong");
    i0.ɵɵtext(2, "No surveys found.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Choose another category or create a new survey.");
    i0.ɵɵelementEnd()();
} }
function OverviewPage_Conditional_42_Conditional_1_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 21)(1, "div")(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "small");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const poll_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("past", ctx_r1.mode() === "closed");
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(6, _c0, poll_r4.id));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(poll_r4.category);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(poll_r4.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.deadlineLabel(poll_r4.closesAt));
} }
function OverviewPage_Conditional_42_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19);
    i0.ɵɵrepeaterCreate(1, OverviewPage_Conditional_42_Conditional_1_For_2_Template, 8, 8, "a", 20, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.visiblePolls());
} }
function OverviewPage_Conditional_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, OverviewPage_Conditional_42_Conditional_0_Template, 5, 0, "div", 18)(1, OverviewPage_Conditional_42_Conditional_1_Template, 3, 0, "div", 19);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r1.visiblePolls().length === 0 ? 0 : 1);
} }
export class OverviewPage {
    pollFacade = inject(PollFacade);
    source = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "source" }] : /* istanbul ignore next */ []));
    createDialog = inject(CreatePollDialogService);
    mode = signal('open', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "mode" }] : /* istanbul ignore next */ []));
    openCategory = signal('all', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "openCategory" }] : /* istanbul ignore next */ []));
    closedCategory = signal('all', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "closedCategory" }] : /* istanbul ignore next */ []));
    busy = signal(true, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "busy" }] : /* istanbul ignore next */ []));
    problem = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "problem" }] : /* istanbul ignore next */ []));
    categories = POLL_CATEGORIES;
    activeCategory = computed(() => this.mode() === 'open' ? this.openCategory() : this.closedCategory(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "activeCategory" }] : /* istanbul ignore next */ []));
    visiblePolls = computed(() => {
        const closed = this.mode() === 'closed';
        const category = this.activeCategory();
        return [...this.source()]
            .filter((poll) => isClosed(poll.closesAt) === closed)
            .filter((poll) => category === 'all' || poll.category === category)
            .sort((left, right) => deadlineTimestamp(left.closesAt) -
            deadlineTimestamp(right.closesAt));
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "visiblePolls" }] : /* istanbul ignore next */ []));
    closingSoon = computed(() => [...this.source()]
        .filter((poll) => !isClosed(poll.closesAt))
        .filter((poll) => {
        const days = daysRemaining(poll.closesAt);
        return (days !== null &&
            days >= 0 &&
            days <= POLL_LIMITS.endingSoonDays);
    })
        .sort((left, right) => deadlineTimestamp(left.closesAt) -
        deadlineTimestamp(right.closesAt))
        .slice(0, 3), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "closingSoon" }] : /* istanbul ignore next */ []));
    constructor() {
        void this.reload();
    }
    setMode(mode) {
        this.mode.set(mode);
    }
    setCategory(value) {
        const category = value;
        if (this.mode() === 'open') {
            this.openCategory.set(category);
            return;
        }
        this.closedCategory.set(category);
    }
    deadlineLabel(date) {
        const days = daysRemaining(date);
        if (days === null)
            return 'No deadline';
        if (days < 0)
            return 'Closed';
        if (days === 0)
            return 'Ends today';
        if (days === 1)
            return '1 day left';
        return `${days} days left`;
    }
    async reload() {
        this.busy.set(true);
        this.problem.set(null);
        try {
            this.source.set(await this.pollFacade.browse());
        }
        catch (error) {
            console.error('Survey list loading failed', error);
            this.problem.set('Surveys could not be loaded.');
        }
        finally {
            this.busy.set(false);
        }
    }
    static ɵfac = function OverviewPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OverviewPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OverviewPage, selectors: [["app-overview-page"]], decls: 43, vars: 8, consts: [[1, "home"], [1, "hero"], [1, "hero-copy"], [1, "eyebrow"], ["type", "button", 3, "click"], ["aria-hidden", "true", 1, "hero-art"], ["src", "/images/smartphone.png", "alt", ""], [1, "content"], [1, "ending-soon"], [1, "browser"], [3, "change", "value"], ["value", "all"], [3, "value"], [1, "tabs"], ["aria-live", "polite", 1, "status"], [1, "error"], [1, "soon-grid"], [1, "soon-card", 3, "routerLink"], [1, "empty"], [1, "survey-list"], [1, "survey-row", 3, "past", "routerLink"], [1, "survey-row", 3, "routerLink"]], template: function OverviewPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "section", 1)(2, "div", 2)(3, "p", 3);
            i0.ɵɵtext(4, "Poll App");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6, "Collect Feedback,");
            i0.ɵɵelement(7, "br");
            i0.ɵɵtext(8, "Unlock Ideas");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "p");
            i0.ɵɵtext(10, " Create and share surveys in minutes. Collect opinions, engage your audience and turn feedback into action. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "button", 4);
            i0.ɵɵlistener("click", function OverviewPage_Template_button_click_11_listener() { return ctx.createDialog.open(); });
            i0.ɵɵtext(12, " New Survey ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "div", 5);
            i0.ɵɵelement(14, "img", 6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "section", 7)(16, "h2");
            i0.ɵɵtext(17, "Your surveys");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(18, OverviewPage_Conditional_18_Template, 12, 0, "section", 8);
            i0.ɵɵelementStart(19, "section", 9)(20, "header")(21, "div")(22, "p", 3);
            i0.ɵɵtext(23, "Browse");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "h3");
            i0.ɵɵtext(25, "All surveys");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(26, "label")(27, "span");
            i0.ɵɵtext(28, "Category");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "select", 10);
            i0.ɵɵlistener("change", function OverviewPage_Template_select_change_29_listener($event) { return ctx.setCategory($event.target.value); });
            i0.ɵɵelementStart(30, "option", 11);
            i0.ɵɵtext(31, "All");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(32, OverviewPage_For_33_Template, 2, 2, "option", 12, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(34, "div", 13)(35, "button", 4);
            i0.ɵɵlistener("click", function OverviewPage_Template_button_click_35_listener() { return ctx.setMode("open"); });
            i0.ɵɵtext(36, " Open surveys ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "button", 4);
            i0.ɵɵlistener("click", function OverviewPage_Template_button_click_37_listener() { return ctx.setMode("closed"); });
            i0.ɵɵtext(38, " Past surveys ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(39, "div", 14);
            i0.ɵɵconditionalCreate(40, OverviewPage_Conditional_40_Template, 1, 0)(41, OverviewPage_Conditional_41_Template, 2, 1, "span", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(42, OverviewPage_Conditional_42_Template, 2, 1);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(18);
            i0.ɵɵconditional(ctx.closingSoon().length > 0 ? 18 : -1);
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("value", ctx.activeCategory());
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.categories);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("active", ctx.mode() === "open");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.mode() === "closed");
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.busy() ? 40 : ctx.problem() ? 41 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(!ctx.busy() && !ctx.problem() ? 42 : -1);
        } }, dependencies: [RouterLink], styles: ["[_nghost-%COMP%] {\n  display: block;\n  min-height: calc(100vh - 72px);\n  color: #fff;\n}\n\n.home[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 72px);\n  background:\n    radial-gradient(circle at 76% 18%, rgba(110, 110, 110, 0.32), transparent 30%),\n    #343434;\n}\n\n.hero[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.05fr) minmax(250px, 0.95fr);\n  gap: 2rem;\n  align-items: center;\n  min-height: 370px;\n  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 6vw, 5rem) 1rem;\n}\n\n.eyebrow[_ngcontent-%COMP%] {\n  margin: 0 0 0.3rem;\n  color: #f5ae5c;\n  font-size: 0.7rem;\n  font-weight: 900;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%] {\n  color: #f5ae5c;\n}\n\nh1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: clamp(2.7rem, 5.4vw, 5rem);\n  line-height: 0.98;\n}\n\n.hero-copy[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:not(.eyebrow) {\n  max-width: 590px;\n  margin: 1.25rem 0;\n  line-height: 1.55;\n}\n\n.hero-copy[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  border: 0;\n  border-radius: 0.5rem;\n  padding: 0.68rem 1rem;\n  background: #ffc473;\n  color: #343434;\n  font-weight: 900;\n}\n\n.hero-art[_ngcontent-%COMP%] {\n  min-height: 300px;\n}\n\n.hero-art[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: min(100%, 390px);\n  height: 100%;\n  object-fit: contain;\n  filter: drop-shadow(0 18px 24px rgba(0, 0, 0, 0.22));\n}\n\n.content[_ngcontent-%COMP%] {\n  padding: 0 clamp(1rem, 6vw, 5rem) clamp(3rem, 6vw, 5rem);\n}\n\n.content[_ngcontent-%COMP%]    > h2[_ngcontent-%COMP%] {\n  margin: 0 0 2rem;\n  text-align: center;\n  font-size: clamp(2rem, 4vw, 3rem);\n}\n\n.ending-soon[_ngcontent-%COMP%], \n.browser[_ngcontent-%COMP%] {\n  width: min(980px, 100%);\n  margin-inline: auto;\n}\n\n.ending-soon[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%], \n.browser[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 0.85rem;\n}\n\n.ending-soon[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.browser[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.ending-soon[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #bdbdbd;\n  font-size: 0.72rem;\n}\n\n.soon-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 1rem;\n  margin-bottom: 2rem;\n}\n\n.soon-card[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 155px;\n  flex-direction: column;\n  padding: 1rem;\n  border-radius: 0.8rem 1.8rem 0.8rem 0.8rem;\n  background: #f7f7f7;\n  color: #343434;\n}\n\n.soon-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #9e682e;\n  font-size: 0.7rem;\n  font-weight: 800;\n}\n\n.soon-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  margin-top: 0.55rem;\n}\n\n.soon-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: auto;\n  padding-top: 0.8rem;\n  color: #a36a2c;\n  font-weight: 800;\n}\n\n.browser[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.3rem;\n  min-width: 220px;\n}\n\n.browser[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #c9c9c9;\n  font-size: 0.7rem;\n  font-weight: 700;\n}\n\nselect[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid rgba(255, 255, 255, 0.14);\n  border-radius: 0.45rem;\n  padding: 0.55rem 0.65rem;\n  background: #454545;\n  color: #fff;\n}\n\n.tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 0.8rem;\n}\n\n.tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  border-radius: 999px;\n  padding: 0.55rem 0.9rem;\n  background: #454545;\n  color: #d5d5d5;\n  font-weight: 800;\n}\n\n.tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: #ffc473;\n  color: #343434;\n}\n\n.status[_ngcontent-%COMP%] {\n  min-height: 1.6rem;\n  color: #d0d0d0;\n  font-size: 0.8rem;\n}\n\n.error[_ngcontent-%COMP%] {\n  color: #ffb9bd;\n}\n\n.survey-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.6rem;\n}\n\n.survey-row[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 62px;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.75rem 0.9rem;\n  border-radius: 0.6rem;\n  background: #484848;\n}\n\n.survey-row.past[_ngcontent-%COMP%] {\n  opacity: 0.8;\n}\n\n.survey-row[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.2rem;\n}\n\n.survey-row[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #f5ae5c;\n  font-size: 0.7rem;\n  font-weight: 800;\n}\n\n.survey-row[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #dddddd;\n}\n\n.empty[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.25rem;\n  padding: 2rem 1rem;\n  border: 1px dashed rgba(255, 255, 255, 0.18);\n  border-radius: 0.7rem;\n  text-align: center;\n}\n\n.empty[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ffc473;\n}\n\n@media (max-width: 760px) {\n  .hero[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 0;\n    min-height: auto;\n  }\n\n  .hero-art[_ngcontent-%COMP%] {\n    min-height: 260px;\n  }\n\n  .hero-art[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    width: min(88%, 340px);\n  }\n\n  .soon-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .ending-soon[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%], \n   .browser[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .browser[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n    min-width: 100%;\n  }\n}\n\n@media (max-width: 480px) {\n  .hero[_ngcontent-%COMP%], \n   .content[_ngcontent-%COMP%] {\n    padding-inline: 1rem;\n  }\n\n  h1[_ngcontent-%COMP%] {\n    font-size: clamp(2.65rem, 12vw, 4rem);\n  }\n\n  .survey-row[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n\n  .tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OverviewPage, [{
        type: Component,
        args: [{ selector: 'app-overview-page', standalone: true, imports: [RouterLink], template: "<section class=\"home\">\n  <section class=\"hero\">\n    <div class=\"hero-copy\">\n      <p class=\"eyebrow\">Poll App</p>\n      <h1>Collect Feedback,<br>Unlock Ideas</h1>\n      <p>\n        Create and share surveys in minutes. Collect opinions, engage your\n        audience and turn feedback into action.\n      </p>\n\n      <button type=\"button\" (click)=\"createDialog.open()\">\n        New Survey\n      </button>\n    </div>\n\n    <div class=\"hero-art\" aria-hidden=\"true\">\n      <img src=\"/images/smartphone.png\" alt=\"\">\n    </div>\n  </section>\n\n  <section class=\"content\">\n    <h2>Your surveys</h2>\n\n    @if (closingSoon().length > 0) {\n      <section class=\"ending-soon\">\n        <header>\n          <div>\n            <p class=\"eyebrow\">Priority</p>\n            <h3>Ending soon surveys</h3>\n          </div>\n          <span>Earliest deadline first</span>\n        </header>\n\n        <div class=\"soon-grid\">\n          @for (poll of closingSoon(); track poll.id) {\n            <a class=\"soon-card\" [routerLink]=\"['/poll', poll.id]\">\n              <span>{{ poll.category }}</span>\n              <strong>{{ poll.title }}</strong>\n              <small>{{ deadlineLabel(poll.closesAt) }}</small>\n            </a>\n          }\n        </div>\n      </section>\n    }\n\n    <section class=\"browser\">\n      <header>\n        <div>\n          <p class=\"eyebrow\">Browse</p>\n          <h3>All surveys</h3>\n        </div>\n\n        <label>\n          <span>Category</span>\n          <select\n            [value]=\"activeCategory()\"\n            (change)=\"setCategory($any($event.target).value)\"\n          >\n            <option value=\"all\">All</option>\n            @for (category of categories; track category) {\n              <option [value]=\"category\">{{ category }}</option>\n            }\n          </select>\n        </label>\n      </header>\n\n      <div class=\"tabs\">\n        <button\n          type=\"button\"\n          [class.active]=\"mode() === 'open'\"\n          (click)=\"setMode('open')\"\n        >\n          Open surveys\n        </button>\n\n        <button\n          type=\"button\"\n          [class.active]=\"mode() === 'closed'\"\n          (click)=\"setMode('closed')\"\n        >\n          Past surveys\n        </button>\n      </div>\n\n      <div class=\"status\" aria-live=\"polite\">\n        @if (busy()) {\n          Loading surveys\u2026\n        } @else if (problem()) {\n          <span class=\"error\">{{ problem() }}</span>\n        }\n      </div>\n\n      @if (!busy() && !problem()) {\n        @if (visiblePolls().length === 0) {\n          <div class=\"empty\">\n            <strong>No surveys found.</strong>\n            <span>Choose another category or create a new survey.</span>\n          </div>\n        } @else {\n          <div class=\"survey-list\">\n            @for (poll of visiblePolls(); track poll.id) {\n              <a\n                class=\"survey-row\"\n                [class.past]=\"mode() === 'closed'\"\n                [routerLink]=\"['/poll', poll.id]\"\n              >\n                <div>\n                  <span>{{ poll.category }}</span>\n                  <strong>{{ poll.title }}</strong>\n                </div>\n                <small>{{ deadlineLabel(poll.closesAt) }}</small>\n              </a>\n            }\n          </div>\n        }\n      }\n    </section>\n  </section>\n</section>\n", styles: [":host {\n  display: block;\n  min-height: calc(100vh - 72px);\n  color: #fff;\n}\n\n.home {\n  min-height: calc(100vh - 72px);\n  background:\n    radial-gradient(circle at 76% 18%, rgba(110, 110, 110, 0.32), transparent 30%),\n    #343434;\n}\n\n.hero {\n  display: grid;\n  grid-template-columns: minmax(0, 1.05fr) minmax(250px, 0.95fr);\n  gap: 2rem;\n  align-items: center;\n  min-height: 370px;\n  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 6vw, 5rem) 1rem;\n}\n\n.eyebrow {\n  margin: 0 0 0.3rem;\n  color: #f5ae5c;\n  font-size: 0.7rem;\n  font-weight: 900;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\nh1,\nh2 {\n  color: #f5ae5c;\n}\n\nh1 {\n  margin: 0;\n  font-size: clamp(2.7rem, 5.4vw, 5rem);\n  line-height: 0.98;\n}\n\n.hero-copy > p:not(.eyebrow) {\n  max-width: 590px;\n  margin: 1.25rem 0;\n  line-height: 1.55;\n}\n\n.hero-copy > button {\n  border: 0;\n  border-radius: 0.5rem;\n  padding: 0.68rem 1rem;\n  background: #ffc473;\n  color: #343434;\n  font-weight: 900;\n}\n\n.hero-art {\n  min-height: 300px;\n}\n\n.hero-art img {\n  width: min(100%, 390px);\n  height: 100%;\n  object-fit: contain;\n  filter: drop-shadow(0 18px 24px rgba(0, 0, 0, 0.22));\n}\n\n.content {\n  padding: 0 clamp(1rem, 6vw, 5rem) clamp(3rem, 6vw, 5rem);\n}\n\n.content > h2 {\n  margin: 0 0 2rem;\n  text-align: center;\n  font-size: clamp(2rem, 4vw, 3rem);\n}\n\n.ending-soon,\n.browser {\n  width: min(980px, 100%);\n  margin-inline: auto;\n}\n\n.ending-soon > header,\n.browser > header {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 0.85rem;\n}\n\n.ending-soon h3,\n.browser h3 {\n  margin: 0;\n}\n\n.ending-soon header > span {\n  color: #bdbdbd;\n  font-size: 0.72rem;\n}\n\n.soon-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 1rem;\n  margin-bottom: 2rem;\n}\n\n.soon-card {\n  display: flex;\n  min-height: 155px;\n  flex-direction: column;\n  padding: 1rem;\n  border-radius: 0.8rem 1.8rem 0.8rem 0.8rem;\n  background: #f7f7f7;\n  color: #343434;\n}\n\n.soon-card span {\n  color: #9e682e;\n  font-size: 0.7rem;\n  font-weight: 800;\n}\n\n.soon-card strong {\n  margin-top: 0.55rem;\n}\n\n.soon-card small {\n  margin-top: auto;\n  padding-top: 0.8rem;\n  color: #a36a2c;\n  font-weight: 800;\n}\n\n.browser label {\n  display: grid;\n  gap: 0.3rem;\n  min-width: 220px;\n}\n\n.browser label span {\n  color: #c9c9c9;\n  font-size: 0.7rem;\n  font-weight: 700;\n}\n\nselect {\n  width: 100%;\n  border: 1px solid rgba(255, 255, 255, 0.14);\n  border-radius: 0.45rem;\n  padding: 0.55rem 0.65rem;\n  background: #454545;\n  color: #fff;\n}\n\n.tabs {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 0.8rem;\n}\n\n.tabs button {\n  border: 0;\n  border-radius: 999px;\n  padding: 0.55rem 0.9rem;\n  background: #454545;\n  color: #d5d5d5;\n  font-weight: 800;\n}\n\n.tabs button.active {\n  background: #ffc473;\n  color: #343434;\n}\n\n.status {\n  min-height: 1.6rem;\n  color: #d0d0d0;\n  font-size: 0.8rem;\n}\n\n.error {\n  color: #ffb9bd;\n}\n\n.survey-list {\n  display: grid;\n  gap: 0.6rem;\n}\n\n.survey-row {\n  display: flex;\n  min-height: 62px;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.75rem 0.9rem;\n  border-radius: 0.6rem;\n  background: #484848;\n}\n\n.survey-row.past {\n  opacity: 0.8;\n}\n\n.survey-row div {\n  display: grid;\n  gap: 0.2rem;\n}\n\n.survey-row div span {\n  color: #f5ae5c;\n  font-size: 0.7rem;\n  font-weight: 800;\n}\n\n.survey-row small {\n  color: #dddddd;\n}\n\n.empty {\n  display: grid;\n  gap: 0.25rem;\n  padding: 2rem 1rem;\n  border: 1px dashed rgba(255, 255, 255, 0.18);\n  border-radius: 0.7rem;\n  text-align: center;\n}\n\n.empty strong {\n  color: #ffc473;\n}\n\n@media (max-width: 760px) {\n  .hero {\n    grid-template-columns: 1fr;\n    gap: 0;\n    min-height: auto;\n  }\n\n  .hero-art {\n    min-height: 260px;\n  }\n\n  .hero-art img {\n    width: min(88%, 340px);\n  }\n\n  .soon-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .ending-soon > header,\n  .browser > header {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .browser label {\n    min-width: 100%;\n  }\n}\n\n@media (max-width: 480px) {\n  .hero,\n  .content {\n    padding-inline: 1rem;\n  }\n\n  h1 {\n    font-size: clamp(2.65rem, 12vw, 4rem);\n  }\n\n  .survey-row {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n\n  .tabs button {\n    flex: 1;\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OverviewPage, { className: "OverviewPage", filePath: "app/pages/overview/overview.page.ts", lineNumber: 32 }); })();
//# sourceMappingURL=overview.page.js.map