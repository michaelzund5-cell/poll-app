/**
 * @file src/app/presentation/create-poll-dialog/create-poll-dialog.service.ts
 * @description Shared presentation state for the New Survey modal.
 */
import { Injectable, signal } from '@angular/core';
import * as i0 from "@angular/core";
export class CreatePollDialogService {
    state = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "state" }] : /* istanbul ignore next */ []));
    visible = this.state.asReadonly();
    open() {
        this.state.set(true);
    }
    close() {
        this.state.set(false);
    }
    static ɵfac = function CreatePollDialogService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CreatePollDialogService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CreatePollDialogService, factory: CreatePollDialogService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CreatePollDialogService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=create-poll-dialog.service.js.map