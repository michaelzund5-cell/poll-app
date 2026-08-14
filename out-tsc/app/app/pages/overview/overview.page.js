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
function OverviewPage_Conditional_20_For_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 20)(1, "span", 21);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "small", 22);
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
function OverviewPage_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 9)(1, "header")(2, "h3");
    i0.ɵɵtext(3, "Ending soon surveys");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 19);
    i0.ɵɵrepeaterCreate(5, OverviewPage_Conditional_20_For_6_Template, 7, 6, "a", 20, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(ctx_r1.closingSoon());
} }
function OverviewPage_For_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const category_r3 = ctx.$implicit;
    i0.ɵɵproperty("value", category_r3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(category_r3);
} }
function OverviewPage_Conditional_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Loading surveys\u2026 ");
} }
function OverviewPage_Conditional_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.problem());
} }
function OverviewPage_Conditional_41_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23)(1, "strong");
    i0.ɵɵtext(2, "No surveys found.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Choose another category or create a new survey.");
    i0.ɵɵelementEnd()();
} }
function OverviewPage_Conditional_41_Conditional_1_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 26)(1, "div", 27)(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "small", 28);
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
function OverviewPage_Conditional_41_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵrepeaterCreate(1, OverviewPage_Conditional_41_Conditional_1_For_2_Template, 8, 8, "a", 25, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.visiblePolls());
} }
function OverviewPage_Conditional_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, OverviewPage_Conditional_41_Conditional_0_Template, 5, 0, "div", 23)(1, OverviewPage_Conditional_41_Conditional_1_Template, 3, 0, "div", 24);
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
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OverviewPage, selectors: [["app-overview-page"]], decls: 42, vars: 8, consts: [[1, "home"], [1, "hero"], [1, "hero-copy"], ["type", "button", 3, "click"], ["aria-hidden", "true", 1, "hero-art"], ["src", "/images/smartphone.png", "alt", "", 1, "phone-default"], ["src", "/images/smartphone_hover.png", "alt", "", 1, "phone-hover"], [1, "content"], ["aria-hidden", "true", 1, "survey-divider"], [1, "ending-soon"], [1, "browser"], [1, "browser-head"], [1, "category-filter"], [3, "change", "value"], ["value", "all"], [3, "value"], ["role", "tablist", "aria-label", "Survey status", 1, "tabs"], ["aria-live", "polite", 1, "status"], [1, "error"], [1, "soon-grid"], [1, "soon-card", 3, "routerLink"], [1, "card-category"], [1, "card-deadline"], [1, "empty"], [1, "survey-list"], [1, "survey-row", 3, "past", "routerLink"], [1, "survey-row", 3, "routerLink"], [1, "survey-row-copy"], [1, "survey-row-badge"]], template: function OverviewPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "section", 1)(2, "div", 2)(3, "h1");
            i0.ɵɵtext(4, "Collect Feedback,");
            i0.ɵɵelement(5, "br");
            i0.ɵɵtext(6, "Unlock Ideas");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p");
            i0.ɵɵtext(8, " Create and share surveys in minutes \u2013 from team events to workplace culture. Collect opinions, engage your audience and turn feedback into action. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "button", 3);
            i0.ɵɵlistener("click", function OverviewPage_Template_button_click_9_listener() { return ctx.createDialog.open(); });
            i0.ɵɵtext(10, " New survey ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "div", 4);
            i0.ɵɵelement(12, "img", 5)(13, "img", 6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "section", 7)(15, "div", 8)(16, "span");
            i0.ɵɵtext(17, "\u2715");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "h2");
            i0.ɵɵtext(19, "Your surveys");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(20, OverviewPage_Conditional_20_Template, 7, 0, "section", 9);
            i0.ɵɵelementStart(21, "section", 10)(22, "header", 11)(23, "h3");
            i0.ɵɵtext(24, "All surveys");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "label", 12)(26, "span");
            i0.ɵɵtext(27, "Sort by category");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "select", 13);
            i0.ɵɵlistener("change", function OverviewPage_Template_select_change_28_listener($event) { return ctx.setCategory($event.target.value); });
            i0.ɵɵelementStart(29, "option", 14);
            i0.ɵɵtext(30, "All");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(31, OverviewPage_For_32_Template, 2, 2, "option", 15, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(33, "div", 16)(34, "button", 3);
            i0.ɵɵlistener("click", function OverviewPage_Template_button_click_34_listener() { return ctx.setMode("open"); });
            i0.ɵɵtext(35, " Open surveys ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "button", 3);
            i0.ɵɵlistener("click", function OverviewPage_Template_button_click_36_listener() { return ctx.setMode("closed"); });
            i0.ɵɵtext(37, " Past surveys ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(38, "div", 17);
            i0.ɵɵconditionalCreate(39, OverviewPage_Conditional_39_Template, 1, 0)(40, OverviewPage_Conditional_40_Template, 2, 1, "span", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(41, OverviewPage_Conditional_41_Template, 2, 1);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(20);
            i0.ɵɵconditional(ctx.closingSoon().length > 0 ? 20 : -1);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("value", ctx.activeCategory());
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.categories);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("active", ctx.mode() === "open");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.mode() === "closed");
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.busy() ? 39 : ctx.problem() ? 40 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(!ctx.busy() && !ctx.problem() ? 41 : -1);
        } }, dependencies: [RouterLink], styles: ["[_nghost-%COMP%] {\n  display: block;\n  min-height: calc(100vh - 64px);\n  color: #fffaf4;\n  background: #302136;\n}\n\n.home[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 64px);\n  background: #302136;\n}\n\n.hero[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.08fr) minmax(250px, .92fr);\n  gap: clamp(1.5rem, 5vw, 4rem);\n  align-items: center;\n  width: min(980px, calc(100% - 2rem));\n  min-height: 350px;\n  margin: 0 auto;\n  padding: clamp(2.4rem, 6vw, 4.6rem) 0 1.4rem;\n}\n\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%] {\n  font-family: \"Arial Rounded MT Bold\", \"Trebuchet MS\", sans-serif;\n  color: #ffc06b;\n}\n\nh1[_ngcontent-%COMP%] {\n  max-width: 580px;\n  margin: 0;\n  font-size: clamp(2.65rem, 5.3vw, 5rem);\n  line-height: .98;\n  letter-spacing: -.035em;\n  text-shadow: 0 2px 0 rgba(111, 55, 28, .28);\n}\n\n.hero-copy[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  max-width: 535px;\n  margin: 1.2rem 0 1.05rem;\n  color: #fffaf4;\n  font-size: .86rem;\n  line-height: 1.48;\n}\n\n.hero-copy[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  min-height: 29px;\n  border: 1px solid #df9650;\n  border-radius: 4px;\n  padding: .38rem .68rem;\n  background: #ffc06b;\n  color: #2f2032;\n  font-size: .66rem;\n  font-weight: 900;\n  box-shadow: 0 1px 0 #cf7e39;\n}\n\n.hero-art[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 285px;\n}\n\n.hero-art[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  width: min(100%, 315px);\n  height: 100%;\n  margin: auto;\n  object-fit: contain;\n  filter: drop-shadow(0 18px 22px rgba(0, 0, 0, .16));\n  transition: opacity .22s ease;\n  animation: _ngcontent-%COMP%_phone-float 3.3s ease-in-out infinite;\n}\n\n.phone-hover[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n\n.hero-art[_ngcontent-%COMP%]:hover   .phone-default[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n\n.hero-art[_ngcontent-%COMP%]:hover   .phone-hover[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n\n@keyframes _ngcontent-%COMP%_phone-float {\n  0%, 100% { transform: translateY(0) rotate(.5deg); }\n  50% { transform: translateY(-10px) rotate(-.7deg); }\n}\n\n.content[_ngcontent-%COMP%] {\n  width: min(980px, calc(100% - 2rem));\n  margin: 0 auto;\n  padding: 0 0 clamp(3rem, 6vw, 5rem);\n}\n\n.survey-divider[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  place-items: center;\n  width: min(480px, 78%);\n  height: 28px;\n  margin: 0 auto .15rem;\n  color: #725584;\n}\n\n.survey-divider[_ngcontent-%COMP%]::before, \n.survey-divider[_ngcontent-%COMP%]::after {\n  position: absolute;\n  top: 50%;\n  width: 42%;\n  border-top: 2px dashed #684b7d;\n  content: \"\";\n}\n\n.survey-divider[_ngcontent-%COMP%]::before { left: 0; }\n.survey-divider[_ngcontent-%COMP%]::after { right: 0; }\n\n.survey-divider[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n  transform: rotate(45deg);\n}\n\n.content[_ngcontent-%COMP%]    > h2[_ngcontent-%COMP%] {\n  margin: 0 0 2rem;\n  text-align: center;\n  font-size: clamp(1.85rem, 3.4vw, 2.8rem);\n}\n\n.ending-soon[_ngcontent-%COMP%], \n.browser[_ngcontent-%COMP%] {\n  width: min(920px, 100%);\n  margin-inline: auto;\n}\n\n.ending-soon[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%], \n.browser-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: .85rem;\n}\n\n.ending-soon[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.browser[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #fffaf4;\n  font-size: .88rem;\n  font-weight: 500;\n}\n\n.soon-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: .95rem;\n  margin-bottom: 2rem;\n}\n\n.soon-card[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 152px;\n  flex-direction: column;\n  padding: 1rem 1.05rem .9rem;\n  border: 1px solid rgba(255, 255, 255, .55);\n  border-radius: 12px 30px 12px 12px;\n  background: linear-gradient(145deg, #fffaf9 0%, #f6eef7 100%);\n  color: #2f2032;\n  box-shadow: 0 6px 15px rgba(21, 10, 24, .12);\n  transition: transform .16s ease, box-shadow .16s ease;\n}\n\n.soon-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 9px 18px rgba(21, 10, 24, .16);\n}\n\n.card-category[_ngcontent-%COMP%] {\n  color: #7d687f;\n  font-size: .62rem;\n  font-weight: 600;\n}\n\n.soon-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  max-width: 95%;\n  margin-top: .52rem;\n  font-size: .9rem;\n  line-height: 1.18;\n}\n\n.card-deadline[_ngcontent-%COMP%] {\n  align-self: flex-start;\n  margin-top: auto;\n  padding: .27rem .48rem;\n  border-radius: 4px;\n  background: #ffd08b;\n  color: #65401e;\n  font-size: .6rem;\n  font-weight: 800;\n}\n\n.browser[_ngcontent-%COMP%] {\n  margin-top: .4rem;\n}\n\n.category-filter[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: .55rem;\n}\n\n.category-filter[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #d5c8d7;\n  font-size: .64rem;\n  font-weight: 700;\n}\n\n.category-filter[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  min-width: 155px;\n  border: 1px solid #735f77;\n  border-radius: 4px;\n  padding: .38rem .5rem;\n  background: #3b2940;\n  color: #fffaf4;\n  font-size: .64rem;\n}\n\n.tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: .35rem;\n  margin: 0 0 .65rem;\n}\n\n.tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #6c576f;\n  border-radius: 4px;\n  padding: .35rem .58rem;\n  background: #3d2a42;\n  color: #d9cddb;\n  font-size: .62rem;\n  font-weight: 700;\n}\n\n.tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  border-color: #e49b4d;\n  background: #ffc06b;\n  color: #2f2032;\n}\n\n.status[_ngcontent-%COMP%] {\n  min-height: 1.2rem;\n  color: #d8cbd9;\n  font-size: .7rem;\n}\n\n.error[_ngcontent-%COMP%] { color: #ffb7bd; }\n\n.survey-list[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: .55rem;\n}\n\n.survey-row[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 66px;\n  align-items: center;\n  justify-content: space-between;\n  gap: .8rem;\n  padding: .72rem .78rem;\n  border: 1px solid #503b55;\n  border-radius: 7px;\n  background: #3a2840;\n  color: #fffaf4;\n  transition: border-color .15s ease, transform .15s ease;\n}\n\n.survey-row[_ngcontent-%COMP%]:hover {\n  border-color: #d98d43;\n  transform: translateY(-1px);\n}\n\n.survey-row.past[_ngcontent-%COMP%] {\n  opacity: .8;\n}\n\n.survey-row-copy[_ngcontent-%COMP%] {\n  display: grid;\n  gap: .25rem;\n  min-width: 0;\n}\n\n.survey-row-copy[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #c9b7cc;\n  font-size: .58rem;\n}\n\n.survey-row-copy[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  overflow-wrap: anywhere;\n  font-size: .72rem;\n  font-weight: 600;\n}\n\n.survey-row-badge[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  padding: .25rem .42rem;\n  border-radius: 3px;\n  background: #ffc978;\n  color: #55351d;\n  font-size: .56rem;\n  font-weight: 800;\n}\n\n.empty[_ngcontent-%COMP%] {\n  display: grid;\n  gap: .25rem;\n  padding: 2rem 1rem;\n  border: 1px dashed rgba(255,255,255,.2);\n  text-align: center;\n}\n\n.empty[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: #ffc06b; }\n\n@media (max-width: 760px) {\n  .hero[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 0;\n    min-height: auto;\n    padding-top: 2rem;\n  }\n\n  h1[_ngcontent-%COMP%] {\n    font-size: clamp(2.45rem, 12vw, 4rem);\n  }\n\n  .hero-art[_ngcontent-%COMP%] {\n    min-height: 245px;\n  }\n\n  .hero-art[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    width: min(76%, 280px);\n  }\n\n  .soon-grid[_ngcontent-%COMP%], \n   .survey-list[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .ending-soon[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%], \n   .browser-head[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .category-filter[_ngcontent-%COMP%] {\n    justify-content: space-between;\n  }\n\n  .category-filter[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n}\n\n@media (max-width: 480px) {\n  .hero[_ngcontent-%COMP%], \n   .content[_ngcontent-%COMP%] {\n    width: min(100% - 2rem, 980px);\n  }\n\n  .soon-card[_ngcontent-%COMP%] {\n    min-height: 135px;\n  }\n\n  .survey-row[_ngcontent-%COMP%] {\n    align-items: flex-start;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .hero-art[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OverviewPage, [{
        type: Component,
        args: [{ selector: 'app-overview-page', standalone: true, imports: [RouterLink], template: "<section class=\"home\">\n  <section class=\"hero\">\n    <div class=\"hero-copy\">\n      <h1>Collect Feedback,<br>Unlock Ideas</h1>\n      <p>\n        Create and share surveys in minutes \u2013 from team events to workplace culture.\n        Collect opinions, engage your audience and turn feedback into action.\n      </p>\n\n      <button type=\"button\" (click)=\"createDialog.open()\">\n        New survey\n      </button>\n    </div>\n\n    <div class=\"hero-art\" aria-hidden=\"true\">\n      <img class=\"phone-default\" src=\"/images/smartphone.png\" alt=\"\">\n      <img class=\"phone-hover\" src=\"/images/smartphone_hover.png\" alt=\"\">\n    </div>\n  </section>\n\n  <section class=\"content\">\n    <div class=\"survey-divider\" aria-hidden=\"true\"><span>\u2715</span></div>\n    <h2>Your surveys</h2>\n\n    @if (closingSoon().length > 0) {\n      <section class=\"ending-soon\">\n        <header>\n          <h3>Ending soon surveys</h3>\n        </header>\n\n        <div class=\"soon-grid\">\n          @for (poll of closingSoon(); track poll.id) {\n            <a class=\"soon-card\" [routerLink]=\"['/poll', poll.id]\">\n              <span class=\"card-category\">{{ poll.category }}</span>\n              <strong>{{ poll.title }}</strong>\n              <small class=\"card-deadline\">{{ deadlineLabel(poll.closesAt) }}</small>\n            </a>\n          }\n        </div>\n      </section>\n    }\n\n    <section class=\"browser\">\n      <header class=\"browser-head\">\n        <h3>All surveys</h3>\n\n        <label class=\"category-filter\">\n          <span>Sort by category</span>\n          <select\n            [value]=\"activeCategory()\"\n            (change)=\"setCategory($any($event.target).value)\"\n          >\n            <option value=\"all\">All</option>\n            @for (category of categories; track category) {\n              <option [value]=\"category\">{{ category }}</option>\n            }\n          </select>\n        </label>\n      </header>\n\n      <div class=\"tabs\" role=\"tablist\" aria-label=\"Survey status\">\n        <button\n          type=\"button\"\n          [class.active]=\"mode() === 'open'\"\n          (click)=\"setMode('open')\"\n        >\n          Open surveys\n        </button>\n\n        <button\n          type=\"button\"\n          [class.active]=\"mode() === 'closed'\"\n          (click)=\"setMode('closed')\"\n        >\n          Past surveys\n        </button>\n      </div>\n\n      <div class=\"status\" aria-live=\"polite\">\n        @if (busy()) {\n          Loading surveys\u2026\n        } @else if (problem()) {\n          <span class=\"error\">{{ problem() }}</span>\n        }\n      </div>\n\n      @if (!busy() && !problem()) {\n        @if (visiblePolls().length === 0) {\n          <div class=\"empty\">\n            <strong>No surveys found.</strong>\n            <span>Choose another category or create a new survey.</span>\n          </div>\n        } @else {\n          <div class=\"survey-list\">\n            @for (poll of visiblePolls(); track poll.id) {\n              <a\n                class=\"survey-row\"\n                [class.past]=\"mode() === 'closed'\"\n                [routerLink]=\"['/poll', poll.id]\"\n              >\n                <div class=\"survey-row-copy\">\n                  <span>{{ poll.category }}</span>\n                  <strong>{{ poll.title }}</strong>\n                </div>\n                <small class=\"survey-row-badge\">{{ deadlineLabel(poll.closesAt) }}</small>\n              </a>\n            }\n          </div>\n        }\n      }\n    </section>\n  </section>\n</section>\n", styles: [":host {\n  display: block;\n  min-height: calc(100vh - 64px);\n  color: #fffaf4;\n  background: #302136;\n}\n\n.home {\n  min-height: calc(100vh - 64px);\n  background: #302136;\n}\n\n.hero {\n  display: grid;\n  grid-template-columns: minmax(0, 1.08fr) minmax(250px, .92fr);\n  gap: clamp(1.5rem, 5vw, 4rem);\n  align-items: center;\n  width: min(980px, calc(100% - 2rem));\n  min-height: 350px;\n  margin: 0 auto;\n  padding: clamp(2.4rem, 6vw, 4.6rem) 0 1.4rem;\n}\n\nh1,\nh2 {\n  font-family: \"Arial Rounded MT Bold\", \"Trebuchet MS\", sans-serif;\n  color: #ffc06b;\n}\n\nh1 {\n  max-width: 580px;\n  margin: 0;\n  font-size: clamp(2.65rem, 5.3vw, 5rem);\n  line-height: .98;\n  letter-spacing: -.035em;\n  text-shadow: 0 2px 0 rgba(111, 55, 28, .28);\n}\n\n.hero-copy > p {\n  max-width: 535px;\n  margin: 1.2rem 0 1.05rem;\n  color: #fffaf4;\n  font-size: .86rem;\n  line-height: 1.48;\n}\n\n.hero-copy > button {\n  min-height: 29px;\n  border: 1px solid #df9650;\n  border-radius: 4px;\n  padding: .38rem .68rem;\n  background: #ffc06b;\n  color: #2f2032;\n  font-size: .66rem;\n  font-weight: 900;\n  box-shadow: 0 1px 0 #cf7e39;\n}\n\n.hero-art {\n  position: relative;\n  min-height: 285px;\n}\n\n.hero-art img {\n  position: absolute;\n  inset: 0;\n  width: min(100%, 315px);\n  height: 100%;\n  margin: auto;\n  object-fit: contain;\n  filter: drop-shadow(0 18px 22px rgba(0, 0, 0, .16));\n  transition: opacity .22s ease;\n  animation: phone-float 3.3s ease-in-out infinite;\n}\n\n.phone-hover {\n  opacity: 0;\n}\n\n.hero-art:hover .phone-default {\n  opacity: 0;\n}\n\n.hero-art:hover .phone-hover {\n  opacity: 1;\n}\n\n@keyframes phone-float {\n  0%, 100% { transform: translateY(0) rotate(.5deg); }\n  50% { transform: translateY(-10px) rotate(-.7deg); }\n}\n\n.content {\n  width: min(980px, calc(100% - 2rem));\n  margin: 0 auto;\n  padding: 0 0 clamp(3rem, 6vw, 5rem);\n}\n\n.survey-divider {\n  position: relative;\n  display: grid;\n  place-items: center;\n  width: min(480px, 78%);\n  height: 28px;\n  margin: 0 auto .15rem;\n  color: #725584;\n}\n\n.survey-divider::before,\n.survey-divider::after {\n  position: absolute;\n  top: 50%;\n  width: 42%;\n  border-top: 2px dashed #684b7d;\n  content: \"\";\n}\n\n.survey-divider::before { left: 0; }\n.survey-divider::after { right: 0; }\n\n.survey-divider span {\n  font-size: 1.15rem;\n  transform: rotate(45deg);\n}\n\n.content > h2 {\n  margin: 0 0 2rem;\n  text-align: center;\n  font-size: clamp(1.85rem, 3.4vw, 2.8rem);\n}\n\n.ending-soon,\n.browser {\n  width: min(920px, 100%);\n  margin-inline: auto;\n}\n\n.ending-soon > header,\n.browser-head {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: .85rem;\n}\n\n.ending-soon h3,\n.browser h3 {\n  margin: 0;\n  color: #fffaf4;\n  font-size: .88rem;\n  font-weight: 500;\n}\n\n.soon-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: .95rem;\n  margin-bottom: 2rem;\n}\n\n.soon-card {\n  display: flex;\n  min-height: 152px;\n  flex-direction: column;\n  padding: 1rem 1.05rem .9rem;\n  border: 1px solid rgba(255, 255, 255, .55);\n  border-radius: 12px 30px 12px 12px;\n  background: linear-gradient(145deg, #fffaf9 0%, #f6eef7 100%);\n  color: #2f2032;\n  box-shadow: 0 6px 15px rgba(21, 10, 24, .12);\n  transition: transform .16s ease, box-shadow .16s ease;\n}\n\n.soon-card:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 9px 18px rgba(21, 10, 24, .16);\n}\n\n.card-category {\n  color: #7d687f;\n  font-size: .62rem;\n  font-weight: 600;\n}\n\n.soon-card strong {\n  max-width: 95%;\n  margin-top: .52rem;\n  font-size: .9rem;\n  line-height: 1.18;\n}\n\n.card-deadline {\n  align-self: flex-start;\n  margin-top: auto;\n  padding: .27rem .48rem;\n  border-radius: 4px;\n  background: #ffd08b;\n  color: #65401e;\n  font-size: .6rem;\n  font-weight: 800;\n}\n\n.browser {\n  margin-top: .4rem;\n}\n\n.category-filter {\n  display: flex;\n  align-items: center;\n  gap: .55rem;\n}\n\n.category-filter span {\n  color: #d5c8d7;\n  font-size: .64rem;\n  font-weight: 700;\n}\n\n.category-filter select {\n  min-width: 155px;\n  border: 1px solid #735f77;\n  border-radius: 4px;\n  padding: .38rem .5rem;\n  background: #3b2940;\n  color: #fffaf4;\n  font-size: .64rem;\n}\n\n.tabs {\n  display: flex;\n  gap: .35rem;\n  margin: 0 0 .65rem;\n}\n\n.tabs button {\n  border: 1px solid #6c576f;\n  border-radius: 4px;\n  padding: .35rem .58rem;\n  background: #3d2a42;\n  color: #d9cddb;\n  font-size: .62rem;\n  font-weight: 700;\n}\n\n.tabs button.active {\n  border-color: #e49b4d;\n  background: #ffc06b;\n  color: #2f2032;\n}\n\n.status {\n  min-height: 1.2rem;\n  color: #d8cbd9;\n  font-size: .7rem;\n}\n\n.error { color: #ffb7bd; }\n\n.survey-list {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: .55rem;\n}\n\n.survey-row {\n  display: flex;\n  min-height: 66px;\n  align-items: center;\n  justify-content: space-between;\n  gap: .8rem;\n  padding: .72rem .78rem;\n  border: 1px solid #503b55;\n  border-radius: 7px;\n  background: #3a2840;\n  color: #fffaf4;\n  transition: border-color .15s ease, transform .15s ease;\n}\n\n.survey-row:hover {\n  border-color: #d98d43;\n  transform: translateY(-1px);\n}\n\n.survey-row.past {\n  opacity: .8;\n}\n\n.survey-row-copy {\n  display: grid;\n  gap: .25rem;\n  min-width: 0;\n}\n\n.survey-row-copy span {\n  color: #c9b7cc;\n  font-size: .58rem;\n}\n\n.survey-row-copy strong {\n  overflow-wrap: anywhere;\n  font-size: .72rem;\n  font-weight: 600;\n}\n\n.survey-row-badge {\n  flex: 0 0 auto;\n  padding: .25rem .42rem;\n  border-radius: 3px;\n  background: #ffc978;\n  color: #55351d;\n  font-size: .56rem;\n  font-weight: 800;\n}\n\n.empty {\n  display: grid;\n  gap: .25rem;\n  padding: 2rem 1rem;\n  border: 1px dashed rgba(255,255,255,.2);\n  text-align: center;\n}\n\n.empty strong { color: #ffc06b; }\n\n@media (max-width: 760px) {\n  .hero {\n    grid-template-columns: 1fr;\n    gap: 0;\n    min-height: auto;\n    padding-top: 2rem;\n  }\n\n  h1 {\n    font-size: clamp(2.45rem, 12vw, 4rem);\n  }\n\n  .hero-art {\n    min-height: 245px;\n  }\n\n  .hero-art img {\n    width: min(76%, 280px);\n  }\n\n  .soon-grid,\n  .survey-list {\n    grid-template-columns: 1fr;\n  }\n\n  .ending-soon > header,\n  .browser-head {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .category-filter {\n    justify-content: space-between;\n  }\n\n  .category-filter select {\n    flex: 1;\n  }\n}\n\n@media (max-width: 480px) {\n  .hero,\n  .content {\n    width: min(100% - 2rem, 980px);\n  }\n\n  .soon-card {\n    min-height: 135px;\n  }\n\n  .survey-row {\n    align-items: flex-start;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .hero-art img {\n    animation: none;\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OverviewPage, { className: "OverviewPage", filePath: "app/pages/overview/overview.page.ts", lineNumber: 32 }); })();
//# sourceMappingURL=overview.page.js.map