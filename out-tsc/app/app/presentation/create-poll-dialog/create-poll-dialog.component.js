/**
 * @file src/app/presentation/create-poll-dialog/create-poll-dialog.component.ts
 * @description Reactive survey creation modal.
 *
 * User Story 3 requires an overlay instead of a dedicated route. This component
 * owns only form/presentation state; database persistence stays in PollFacade.
 */
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PollFacade } from '../../application/polls/poll.facade';
import { POLL_CATEGORIES, } from '../../domain/polls/poll.contracts';
import { meaningfulText, normalizeText, POLL_LIMITS, } from '../../domain/polls/poll.rules';
import { CreatePollDialogService } from './create-poll-dialog.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function CreatePollDialogComponent_Conditional_0_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Enter at least 5 non-space characters. ");
} }
function CreatePollDialogComponent_Conditional_0_For_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const category_r3 = ctx.$implicit;
    i0.ɵɵproperty("value", category_r3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(category_r3);
} }
function CreatePollDialogComponent_Conditional_0_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Choose a category. ");
} }
function CreatePollDialogComponent_Conditional_0_For_56_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Enter at least 5 non-space characters. ");
} }
function CreatePollDialogComponent_Conditional_0_For_56_For_20_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Answer cannot be blank. ");
} }
function CreatePollDialogComponent_Conditional_0_For_56_For_20_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 29)(1, "span", 31);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "label");
    i0.ɵɵelement(4, "input", 32);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(5, "small");
    i0.ɵɵconditionalCreate(6, CreatePollDialogComponent_Conditional_0_For_56_For_20_Conditional_6_Template, 1, 0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "button", 33);
    i0.ɵɵlistener("click", function CreatePollDialogComponent_Conditional_0_For_56_For_20_Template_button_click_7_listener() { const ɵ$index_131_r7 = i0.ɵɵrestoreView(_r6).$index; const ɵ$index_97_r5 = i0.ɵɵnextContext().$index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.removeAnswer(ɵ$index_97_r5, ɵ$index_131_r7)); });
    i0.ɵɵtext(8, " Remove ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const choice_r8 = ctx.$implicit;
    const ɵ$index_131_r7 = ctx.$index;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("formGroupName", ɵ$index_131_r7);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.answerLabel(ɵ$index_131_r7), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("placeholder", "Answer " + ctx_r1.answerLabel(ɵ$index_131_r7));
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.controlInvalid(choice_r8.get("text")) ? 6 : -1);
} }
function CreatePollDialogComponent_Conditional_0_For_56_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 19)(1, "header")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 24);
    i0.ɵɵlistener("click", function CreatePollDialogComponent_Conditional_0_For_56_Template_button_click_4_listener() { const ɵ$index_97_r5 = i0.ɵɵrestoreView(_r4).$index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.removeQuestion(ɵ$index_97_r5)); });
    i0.ɵɵtext(5, " Remove ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "label")(7, "span");
    i0.ɵɵtext(8, "Question ");
    i0.ɵɵelementStart(9, "strong");
    i0.ɵɵtext(10, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(11, "input", 25);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(12, "small");
    i0.ɵɵconditionalCreate(13, CreatePollDialogComponent_Conditional_0_For_56_Conditional_13_Template, 1, 0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "label", 26);
    i0.ɵɵelement(15, "input", 27);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(16, "span");
    i0.ɵɵtext(17, "Allow multiple answers");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 28);
    i0.ɵɵrepeaterCreate(19, CreatePollDialogComponent_Conditional_0_For_56_For_20_Template, 9, 4, "div", 29, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "button", 30);
    i0.ɵɵlistener("click", function CreatePollDialogComponent_Conditional_0_For_56_Template_button_click_21_listener() { const ɵ$index_97_r5 = i0.ɵɵrestoreView(_r4).$index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.addAnswer(ɵ$index_97_r5)); });
    i0.ɵɵtext(22, " + Add answer ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prompt_r9 = ctx.$implicit;
    const ɵ$index_97_r5 = ctx.$index;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("formGroupName", ɵ$index_97_r5);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Question ", ɵ$index_97_r5 + 1);
    i0.ɵɵadvance(8);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.controlInvalid(prompt_r9.get("text")) ? 13 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r1.choicesAt(ɵ$index_97_r5).controls);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.choicesAt(ɵ$index_97_r5).length >= ctx_r1.limits.maximumChoices);
} }
function CreatePollDialogComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵlistener("click", function CreatePollDialogComponent_Conditional_0_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeFromBackdrop($event)); });
    i0.ɵɵelementStart(1, "section", 2)(2, "header", 3)(3, "div")(4, "p", 4);
    i0.ɵɵtext(5, "Poll App");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h2", 5);
    i0.ɵɵtext(7, "Create new survey");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 6);
    i0.ɵɵlistener("click", function CreatePollDialogComponent_Conditional_0_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵtext(9, " \u00D7 ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "form", 7);
    i0.ɵɵlistener("ngSubmit", function CreatePollDialogComponent_Conditional_0_Template_form_ngSubmit_10_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submit()); });
    i0.ɵɵelementStart(11, "section", 8)(12, "label")(13, "span");
    i0.ɵɵtext(14, "Survey title ");
    i0.ɵɵelementStart(15, "strong");
    i0.ɵɵtext(16, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(17, "input", 9);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(18, "small");
    i0.ɵɵconditionalCreate(19, CreatePollDialogComponent_Conditional_0_Conditional_19_Template, 1, 0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "label")(21, "span");
    i0.ɵɵtext(22, "Category ");
    i0.ɵɵelementStart(23, "strong");
    i0.ɵɵtext(24, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "select", 10)(26, "option", 11);
    i0.ɵɵtext(27, "Select category");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(28, CreatePollDialogComponent_Conditional_0_For_29_Template, 2, 2, "option", 12, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(30, "small");
    i0.ɵɵconditionalCreate(31, CreatePollDialogComponent_Conditional_0_Conditional_31_Template, 1, 0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "label", 13)(33, "span");
    i0.ɵɵtext(34, "Description ");
    i0.ɵɵelementStart(35, "em");
    i0.ɵɵtext(36, "optional");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(37, "textarea", 14);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelement(38, "small");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "label")(40, "span");
    i0.ɵɵtext(41, "Deadline ");
    i0.ɵɵelementStart(42, "em");
    i0.ɵɵtext(43, "optional");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(44, "input", 15);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelement(45, "small");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(46, "section", 16)(47, "div", 17)(48, "div")(49, "p", 4);
    i0.ɵɵtext(50, "Questions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "h3");
    i0.ɵɵtext(52, "Survey questions");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(53, "button", 18);
    i0.ɵɵlistener("click", function CreatePollDialogComponent_Conditional_0_Template_button_click_53_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.addQuestion()); });
    i0.ɵɵtext(54, " + Add question ");
    i0.ɵɵelementEnd()();
    i0.ɵɵrepeaterCreate(55, CreatePollDialogComponent_Conditional_0_For_56_Template, 23, 4, "article", 19, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "footer", 20)(58, "p", 21);
    i0.ɵɵtext(59);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "div")(61, "button", 22);
    i0.ɵɵlistener("click", function CreatePollDialogComponent_Conditional_0_Template_button_click_61_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵtext(62, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "button", 23);
    i0.ɵɵtext(64);
    i0.ɵɵelementEnd()()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("formGroup", ctx_r1.form);
    i0.ɵɵadvance(7);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.controlInvalid(ctx_r1.form.controls.title) ? 19 : -1);
    i0.ɵɵadvance(6);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.categories);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.form.controls.category.touched && !ctx_r1.form.controls.category.value ? 31 : -1);
    i0.ɵɵadvance(6);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(7);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("disabled", ctx_r1.prompts.length >= ctx_r1.limits.maximumPrompts);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.prompts.controls);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.submitMessage());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Publishing\u2026" : "Publish survey", " ");
} }
export class CreatePollDialogComponent {
    formBuilder = inject(FormBuilder).nonNullable;
    polls = inject(PollFacade);
    router = inject(Router);
    dialog = inject(CreatePollDialogService);
    categories = POLL_CATEGORIES;
    limits = POLL_LIMITS;
    saving = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "saving" }] : /* istanbul ignore next */ []));
    submitMessage = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "submitMessage" }] : /* istanbul ignore next */ []));
    form = this.formBuilder.group({
        title: ['', [meaningfulText(5)]],
        category: [''],
        closesAt: [''],
        description: [''],
        prompts: this.formBuilder.array([this.createQuestionGroup()]),
    });
    get prompts() {
        return this.form.controls.prompts;
    }
    choicesAt(questionIndex) {
        return this.prompts.at(questionIndex).get('choices');
    }
    addQuestion() {
        if (this.prompts.length < POLL_LIMITS.maximumPrompts) {
            this.prompts.push(this.createQuestionGroup());
        }
    }
    removeQuestion(index) {
        if (this.prompts.length === 1) {
            this.prompts.at(0).reset({ text: '', multiple: false });
            return;
        }
        this.prompts.removeAt(index);
    }
    addAnswer(questionIndex) {
        const choices = this.choicesAt(questionIndex);
        if (choices.length < POLL_LIMITS.maximumChoices) {
            choices.push(this.createAnswerGroup());
        }
    }
    removeAnswer(questionIndex, answerIndex) {
        const choices = this.choicesAt(questionIndex);
        if (choices.length <= POLL_LIMITS.minimumChoices) {
            choices.at(answerIndex).reset({ text: '' });
            return;
        }
        choices.removeAt(answerIndex);
    }
    answerLabel(index) {
        return String.fromCharCode(65 + index);
    }
    controlInvalid(control) {
        return control.invalid && control.touched;
    }
    close() {
        if (!this.saving()) {
            this.dialog.close();
        }
    }
    closeFromBackdrop(event) {
        if (event.target === event.currentTarget) {
            this.close();
        }
    }
    async submit() {
        this.form.markAllAsTouched();
        this.submitMessage.set(null);
        if (this.form.invalid ||
            !this.form.controls.category.value ||
            this.saving()) {
            return;
        }
        this.saving.set(true);
        try {
            const id = await this.polls.create(this.toDraft());
            this.dialog.close();
            this.resetForm();
            await this.router.navigate(['/poll', id], {
                queryParams: { created: '1' },
            });
        }
        catch (error) {
            console.error('Survey creation failed', error);
            this.submitMessage.set('The survey could not be published.');
        }
        finally {
            this.saving.set(false);
        }
    }
    createAnswerGroup() {
        return this.formBuilder.group({
            text: ['', [meaningfulText(1)]],
        });
    }
    createQuestionGroup() {
        return this.formBuilder.group({
            text: ['', [meaningfulText(5)]],
            multiple: [false],
            choices: this.formBuilder.array([
                this.createAnswerGroup(),
                this.createAnswerGroup(),
            ]),
        });
    }
    toDraft() {
        const raw = this.form.getRawValue();
        return {
            title: normalizeText(raw.title),
            category: raw.category,
            description: normalizeText(raw.description) || undefined,
            closesAt: raw.closesAt || undefined,
            prompts: raw.prompts.map((prompt) => ({
                text: normalizeText(prompt.text),
                multiple: prompt.multiple,
                choices: prompt.choices.map((choice) => ({
                    text: normalizeText(choice.text),
                })),
            })),
        };
    }
    resetForm() {
        while (this.prompts.length > 1) {
            this.prompts.removeAt(this.prompts.length - 1);
        }
        this.form.reset();
        this.prompts.at(0).reset({ text: '', multiple: false });
        const choices = this.choicesAt(0);
        while (choices.length > POLL_LIMITS.minimumChoices) {
            choices.removeAt(choices.length - 1);
        }
        for (const choice of choices.controls) {
            choice.reset({ text: '' });
        }
    }
    static ɵfac = function CreatePollDialogComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CreatePollDialogComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CreatePollDialogComponent, selectors: [["app-create-poll-dialog"]], decls: 1, vars: 1, consts: [[1, "backdrop"], [1, "backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "new-survey-title", 1, "dialog"], [1, "dialog-header"], [1, "eyebrow"], ["id", "new-survey-title"], ["type", "button", "aria-label", "Close new survey dialog", 1, "close-button", 3, "click"], ["novalidate", "", 3, "ngSubmit", "formGroup"], [1, "survey-fields"], ["formControlName", "title", "placeholder", "Enter survey title", "autocomplete", "off"], ["formControlName", "category"], ["value", "", "disabled", ""], [3, "value"], [1, "full-width"], ["rows", "3", "formControlName", "description", "placeholder", "Describe the survey"], ["type", "date", "formControlName", "closesAt"], ["formArrayName", "prompts", 1, "questions"], [1, "section-header"], ["type", "button", 1, "secondary", 3, "click", "disabled"], [1, "question-card", 3, "formGroupName"], [1, "dialog-footer"], ["aria-live", "polite"], ["type", "button", 1, "cancel", 3, "click"], ["type", "submit", 1, "primary", 3, "disabled"], ["type", "button", 1, "text-button", "danger", 3, "click"], ["formControlName", "text", "placeholder", "Enter question"], [1, "multiple"], ["type", "checkbox", "formControlName", "multiple"], ["formArrayName", "choices", 1, "answers"], [1, "answer-row", 3, "formGroupName"], ["type", "button", 1, "text-button", "add-answer", 3, "click", "disabled"], [1, "answer-label"], ["formControlName", "text", 3, "placeholder"], ["type", "button", 1, "text-button", 3, "click"]], template: function CreatePollDialogComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, CreatePollDialogComponent_Conditional_0_Template, 65, 7, "div", 0);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.dialog.visible() ? 0 : -1);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.CheckboxControlValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, i1.FormGroupName, i1.FormArrayName], styles: ["[_nghost-%COMP%] {\n  position: relative;\n  z-index: 1000;\n}\n\n.backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1000;\n  display: grid;\n  place-items: center;\n  overflow-y: auto;\n  padding: 1rem;\n  background: rgba(29, 19, 31, .56);\n  backdrop-filter: blur(2px);\n}\n\n.dialog[_ngcontent-%COMP%] {\n  width: min(850px, 100%);\n  max-height: calc(100vh - 2rem);\n  overflow-y: auto;\n  border: 1px solid #533d58;\n  border-radius: 8px;\n  background: #302136;\n  color: #fffaf4;\n  box-shadow: 0 18px 50px rgba(0,0,0,.3);\n}\n\n.dialog-header[_ngcontent-%COMP%], \n.dialog-footer[_ngcontent-%COMP%] {\n  position: sticky;\n  z-index: 2;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: .85rem 1rem;\n  background: #302136;\n}\n\n.dialog-header[_ngcontent-%COMP%] {\n  top: 0;\n  border-bottom: 1px solid #4f3a54;\n}\n\n.dialog-footer[_ngcontent-%COMP%] {\n  bottom: 0;\n  border-top: 1px solid #4f3a54;\n}\n\n.dialog-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.section-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.dialog-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #ffc06b;\n  font-family: \"Arial Rounded MT Bold\", \"Trebuchet MS\", sans-serif;\n  font-size: 1.2rem;\n}\n\n.eyebrow[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.close-button[_ngcontent-%COMP%] {\n  display: grid;\n  width: 1.8rem;\n  height: 1.8rem;\n  place-items: center;\n  border: 0;\n  border-radius: 50%;\n  background: transparent;\n  color: #fff;\n  font-size: 1.25rem;\n}\n\nform[_ngcontent-%COMP%] {\n  padding: .9rem 1rem 0;\n}\n\n.survey-fields[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.1fr .9fr;\n  gap: 0 .85rem;\n}\n\n.full-width[_ngcontent-%COMP%] {\n  grid-column: 1 / 2;\n}\n\nlabel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: .28rem;\n}\n\nlabel[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: .64rem;\n  font-weight: 700;\n}\n\nlabel[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: #ffc06b; }\n\nlabel[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  color: #c2b2c4;\n  font-size: .58rem;\n  font-style: normal;\n  font-weight: 500;\n}\n\ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #6a536d;\n  border-radius: 4px;\n  padding: .55rem .6rem;\n  background: #4a3450;\n  color: #fff;\n  font-size: .66rem;\n}\n\ninput[_ngcontent-%COMP%]:focus, \ntextarea[_ngcontent-%COMP%]:focus, \nselect[_ngcontent-%COMP%]:focus {\n  border-color: #f4a453;\n  outline: none;\n}\n\ninput[_ngcontent-%COMP%]::placeholder, \ntextarea[_ngcontent-%COMP%]::placeholder {\n  color: #c6b8c8;\n}\n\ntextarea[_ngcontent-%COMP%] { min-height: 68px; }\n\nsmall[_ngcontent-%COMP%] {\n  min-height: .82rem;\n  color: #ffb9bd;\n  font-size: .55rem;\n}\n\n.questions[_ngcontent-%COMP%] {\n  margin-top: .5rem;\n}\n\n.section-header[_ngcontent-%COMP%], \n.question-card[_ngcontent-%COMP%]   header[_ngcontent-%COMP%], \n.dialog-footer[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: .65rem;\n}\n\n.section-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #fff;\n  font-size: .7rem;\n}\n\n.question-card[_ngcontent-%COMP%] {\n  margin-top: .55rem;\n  padding: .7rem;\n  border: 1px solid #5b435f;\n  border-radius: 5px;\n  background: #3b2940;\n}\n\n.question-card[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  margin-bottom: .55rem;\n  font-size: .65rem;\n}\n\n.multiple[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: .4rem;\n  margin: .08rem 0 .55rem;\n}\n\n.multiple[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: .85rem;\n  height: .85rem;\n  margin: 0;\n  accent-color: #ffad50;\n}\n\n.answers[_ngcontent-%COMP%] {\n  display: grid;\n  gap: .38rem;\n}\n\n.answer-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.5rem minmax(0, 1fr) auto;\n  gap: .4rem;\n  align-items: start;\n}\n\n.answer-label[_ngcontent-%COMP%] {\n  display: grid;\n  width: 1.35rem;\n  height: 1.35rem;\n  place-items: center;\n  margin-top: .38rem;\n  border-radius: 50%;\n  background: #ffc06b;\n  color: #332136;\n  font-size: .58rem;\n  font-weight: 900;\n}\n\n.secondary[_ngcontent-%COMP%], \n.primary[_ngcontent-%COMP%], \n.cancel[_ngcontent-%COMP%] {\n  border-radius: 4px;\n  padding: .45rem .68rem;\n  font-size: .62rem;\n  font-weight: 900;\n}\n\n.secondary[_ngcontent-%COMP%], \n.primary[_ngcontent-%COMP%] {\n  border: 1px solid #dd9249;\n  background: #ffc06b;\n  color: #332136;\n}\n\n.cancel[_ngcontent-%COMP%] {\n  border: 1px solid #8f7692;\n  background: transparent;\n  color: #fff;\n}\n\n.text-button[_ngcontent-%COMP%] {\n  border: 0;\n  padding: .32rem;\n  background: transparent;\n  color: #d9c9da;\n  font-size: .58rem;\n  font-weight: 700;\n}\n\n.text-button.danger[_ngcontent-%COMP%] { color: #ffb9bd; }\n.add-answer[_ngcontent-%COMP%] { margin-top: .35rem; color: #ffc06b; }\n\n.dialog-footer[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  min-height: .8rem;\n  margin: 0;\n  color: #ffb9bd;\n  font-size: .58rem;\n}\n\nbutton[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: .5;\n}\n\n@media (max-width: 700px) {\n  .backdrop[_ngcontent-%COMP%] { align-items: end; padding: 0; }\n  .dialog[_ngcontent-%COMP%] { width: 100%; max-height: 94vh; border-radius: 9px 9px 0 0; }\n  .survey-fields[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .full-width[_ngcontent-%COMP%] { grid-column: auto; }\n  .answer-row[_ngcontent-%COMP%] { grid-template-columns: 1.5rem minmax(0,1fr); }\n  .answer-row[_ngcontent-%COMP%]    > .text-button[_ngcontent-%COMP%] { grid-column: 2; justify-self: start; padding-top: 0; }\n  .dialog-footer[_ngcontent-%COMP%] { align-items: stretch; flex-direction: column; }\n  .dialog-footer[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] { width: 100%; }\n  .dialog-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { flex: 1; }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CreatePollDialogComponent, [{
        type: Component,
        args: [{ selector: 'app-create-poll-dialog', standalone: true, imports: [ReactiveFormsModule], template: "@if (dialog.visible()) {\n  <div class=\"backdrop\" (click)=\"closeFromBackdrop($event)\">\n    <section\n      class=\"dialog\"\n      role=\"dialog\"\n      aria-modal=\"true\"\n      aria-labelledby=\"new-survey-title\"\n    >\n      <header class=\"dialog-header\">\n        <div>\n          <p class=\"eyebrow\">Poll App</p>\n          <h2 id=\"new-survey-title\">Create new survey</h2>\n        </div>\n\n        <button\n          type=\"button\"\n          class=\"close-button\"\n          aria-label=\"Close new survey dialog\"\n          (click)=\"close()\"\n        >\n          \u00D7\n        </button>\n      </header>\n\n      <form [formGroup]=\"form\" (ngSubmit)=\"submit()\" novalidate>\n        <section class=\"survey-fields\">\n          <label>\n            <span>Survey title <strong>*</strong></span>\n            <input\n              formControlName=\"title\"\n              placeholder=\"Enter survey title\"\n              autocomplete=\"off\"\n            >\n            <small>\n              @if (controlInvalid(form.controls.title)) {\n                Enter at least 5 non-space characters.\n              }\n            </small>\n          </label>\n\n          <label>\n            <span>Category <strong>*</strong></span>\n            <select formControlName=\"category\">\n              <option value=\"\" disabled>Select category</option>\n              @for (category of categories; track category) {\n                <option [value]=\"category\">{{ category }}</option>\n              }\n            </select>\n            <small>\n              @if (\n                form.controls.category.touched &&\n                !form.controls.category.value\n              ) {\n                Choose a category.\n              }\n            </small>\n          </label>\n\n          <label class=\"full-width\">\n            <span>Description <em>optional</em></span>\n            <textarea\n              rows=\"3\"\n              formControlName=\"description\"\n              placeholder=\"Describe the survey\"\n            ></textarea>\n            <small></small>\n          </label>\n\n          <label>\n            <span>Deadline <em>optional</em></span>\n            <input type=\"date\" formControlName=\"closesAt\">\n            <small></small>\n          </label>\n        </section>\n\n        <section class=\"questions\" formArrayName=\"prompts\">\n          <div class=\"section-header\">\n            <div>\n              <p class=\"eyebrow\">Questions</p>\n              <h3>Survey questions</h3>\n            </div>\n\n            <button\n              type=\"button\"\n              class=\"secondary\"\n              (click)=\"addQuestion()\"\n              [disabled]=\"prompts.length >= limits.maximumPrompts\"\n            >\n              + Add question\n            </button>\n          </div>\n\n          @for (\n            prompt of prompts.controls;\n            track prompt;\n            let questionIndex = $index\n          ) {\n            <article class=\"question-card\" [formGroupName]=\"questionIndex\">\n              <header>\n                <strong>Question {{ questionIndex + 1 }}</strong>\n                <button\n                  type=\"button\"\n                  class=\"text-button danger\"\n                  (click)=\"removeQuestion(questionIndex)\"\n                >\n                  Remove\n                </button>\n              </header>\n\n              <label>\n                <span>Question <strong>*</strong></span>\n                <input\n                  formControlName=\"text\"\n                  placeholder=\"Enter question\"\n                >\n                <small>\n                  @if (controlInvalid($any(prompt.get('text')))) {\n                    Enter at least 5 non-space characters.\n                  }\n                </small>\n              </label>\n\n              <label class=\"multiple\">\n                <input type=\"checkbox\" formControlName=\"multiple\">\n                <span>Allow multiple answers</span>\n              </label>\n\n              <div class=\"answers\" formArrayName=\"choices\">\n                @for (\n                  choice of choicesAt(questionIndex).controls;\n                  track choice;\n                  let answerIndex = $index\n                ) {\n                  <div class=\"answer-row\" [formGroupName]=\"answerIndex\">\n                    <span class=\"answer-label\">\n                      {{ answerLabel(answerIndex) }}\n                    </span>\n\n                    <label>\n                      <input\n                        formControlName=\"text\"\n                        [placeholder]=\"'Answer ' + answerLabel(answerIndex)\"\n                      >\n                      <small>\n                        @if (controlInvalid($any(choice.get('text')))) {\n                          Answer cannot be blank.\n                        }\n                      </small>\n                    </label>\n\n                    <button\n                      type=\"button\"\n                      class=\"text-button\"\n                      (click)=\"removeAnswer(questionIndex, answerIndex)\"\n                    >\n                      Remove\n                    </button>\n                  </div>\n                }\n              </div>\n\n              <button\n                type=\"button\"\n                class=\"text-button add-answer\"\n                (click)=\"addAnswer(questionIndex)\"\n                [disabled]=\"\n                  choicesAt(questionIndex).length >= limits.maximumChoices\n                \"\n              >\n                + Add answer\n              </button>\n            </article>\n          }\n        </section>\n\n        <footer class=\"dialog-footer\">\n          <p aria-live=\"polite\">{{ submitMessage() }}</p>\n\n          <div>\n            <button type=\"button\" class=\"cancel\" (click)=\"close()\">\n              Cancel\n            </button>\n            <button type=\"submit\" class=\"primary\" [disabled]=\"saving()\">\n              {{ saving() ? 'Publishing\u2026' : 'Publish survey' }}\n            </button>\n          </div>\n        </footer>\n      </form>\n    </section>\n  </div>\n}\n", styles: [":host {\n  position: relative;\n  z-index: 1000;\n}\n\n.backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: 1000;\n  display: grid;\n  place-items: center;\n  overflow-y: auto;\n  padding: 1rem;\n  background: rgba(29, 19, 31, .56);\n  backdrop-filter: blur(2px);\n}\n\n.dialog {\n  width: min(850px, 100%);\n  max-height: calc(100vh - 2rem);\n  overflow-y: auto;\n  border: 1px solid #533d58;\n  border-radius: 8px;\n  background: #302136;\n  color: #fffaf4;\n  box-shadow: 0 18px 50px rgba(0,0,0,.3);\n}\n\n.dialog-header,\n.dialog-footer {\n  position: sticky;\n  z-index: 2;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: .85rem 1rem;\n  background: #302136;\n}\n\n.dialog-header {\n  top: 0;\n  border-bottom: 1px solid #4f3a54;\n}\n\n.dialog-footer {\n  bottom: 0;\n  border-top: 1px solid #4f3a54;\n}\n\n.dialog-header h2,\n.section-header h3 {\n  margin: 0;\n}\n\n.dialog-header h2 {\n  color: #ffc06b;\n  font-family: \"Arial Rounded MT Bold\", \"Trebuchet MS\", sans-serif;\n  font-size: 1.2rem;\n}\n\n.eyebrow {\n  display: none;\n}\n\n.close-button {\n  display: grid;\n  width: 1.8rem;\n  height: 1.8rem;\n  place-items: center;\n  border: 0;\n  border-radius: 50%;\n  background: transparent;\n  color: #fff;\n  font-size: 1.25rem;\n}\n\nform {\n  padding: .9rem 1rem 0;\n}\n\n.survey-fields {\n  display: grid;\n  grid-template-columns: 1.1fr .9fr;\n  gap: 0 .85rem;\n}\n\n.full-width {\n  grid-column: 1 / 2;\n}\n\nlabel {\n  display: grid;\n  gap: .28rem;\n}\n\nlabel > span {\n  font-size: .64rem;\n  font-weight: 700;\n}\n\nlabel strong { color: #ffc06b; }\n\nlabel em {\n  color: #c2b2c4;\n  font-size: .58rem;\n  font-style: normal;\n  font-weight: 500;\n}\n\ninput,\ntextarea,\nselect {\n  width: 100%;\n  border: 1px solid #6a536d;\n  border-radius: 4px;\n  padding: .55rem .6rem;\n  background: #4a3450;\n  color: #fff;\n  font-size: .66rem;\n}\n\ninput:focus,\ntextarea:focus,\nselect:focus {\n  border-color: #f4a453;\n  outline: none;\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  color: #c6b8c8;\n}\n\ntextarea { min-height: 68px; }\n\nsmall {\n  min-height: .82rem;\n  color: #ffb9bd;\n  font-size: .55rem;\n}\n\n.questions {\n  margin-top: .5rem;\n}\n\n.section-header,\n.question-card header,\n.dialog-footer > div {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: .65rem;\n}\n\n.section-header h3 {\n  color: #fff;\n  font-size: .7rem;\n}\n\n.question-card {\n  margin-top: .55rem;\n  padding: .7rem;\n  border: 1px solid #5b435f;\n  border-radius: 5px;\n  background: #3b2940;\n}\n\n.question-card header {\n  margin-bottom: .55rem;\n  font-size: .65rem;\n}\n\n.multiple {\n  display: flex;\n  align-items: center;\n  gap: .4rem;\n  margin: .08rem 0 .55rem;\n}\n\n.multiple input {\n  width: .85rem;\n  height: .85rem;\n  margin: 0;\n  accent-color: #ffad50;\n}\n\n.answers {\n  display: grid;\n  gap: .38rem;\n}\n\n.answer-row {\n  display: grid;\n  grid-template-columns: 1.5rem minmax(0, 1fr) auto;\n  gap: .4rem;\n  align-items: start;\n}\n\n.answer-label {\n  display: grid;\n  width: 1.35rem;\n  height: 1.35rem;\n  place-items: center;\n  margin-top: .38rem;\n  border-radius: 50%;\n  background: #ffc06b;\n  color: #332136;\n  font-size: .58rem;\n  font-weight: 900;\n}\n\n.secondary,\n.primary,\n.cancel {\n  border-radius: 4px;\n  padding: .45rem .68rem;\n  font-size: .62rem;\n  font-weight: 900;\n}\n\n.secondary,\n.primary {\n  border: 1px solid #dd9249;\n  background: #ffc06b;\n  color: #332136;\n}\n\n.cancel {\n  border: 1px solid #8f7692;\n  background: transparent;\n  color: #fff;\n}\n\n.text-button {\n  border: 0;\n  padding: .32rem;\n  background: transparent;\n  color: #d9c9da;\n  font-size: .58rem;\n  font-weight: 700;\n}\n\n.text-button.danger { color: #ffb9bd; }\n.add-answer { margin-top: .35rem; color: #ffc06b; }\n\n.dialog-footer > p {\n  min-height: .8rem;\n  margin: 0;\n  color: #ffb9bd;\n  font-size: .58rem;\n}\n\nbutton:disabled {\n  cursor: not-allowed;\n  opacity: .5;\n}\n\n@media (max-width: 700px) {\n  .backdrop { align-items: end; padding: 0; }\n  .dialog { width: 100%; max-height: 94vh; border-radius: 9px 9px 0 0; }\n  .survey-fields { grid-template-columns: 1fr; }\n  .full-width { grid-column: auto; }\n  .answer-row { grid-template-columns: 1.5rem minmax(0,1fr); }\n  .answer-row > .text-button { grid-column: 2; justify-self: start; padding-top: 0; }\n  .dialog-footer { align-items: stretch; flex-direction: column; }\n  .dialog-footer > div { width: 100%; }\n  .dialog-footer button { flex: 1; }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CreatePollDialogComponent, { className: "CreatePollDialogComponent", filePath: "app/presentation/create-poll-dialog/create-poll-dialog.component.ts", lineNumber: 32 }); })();
//# sourceMappingURL=create-poll-dialog.component.js.map