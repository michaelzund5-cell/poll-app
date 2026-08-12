/**
 * @file src/app/app.ts
 * @description Root application shell.
 */
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CreatePollDialogComponent } from './presentation/create-poll-dialog/create-poll-dialog.component';
import { CreatePollDialogService } from './presentation/create-poll-dialog/create-poll-dialog.service';
import * as i0 from "@angular/core";
const _c0 = () => ({ exact: true });
export class App {
    createDialog = inject(CreatePollDialogService);
    static ɵfac = function App_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || App)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: App, selectors: [["app-root"]], decls: 13, vars: 2, consts: [[1, "app-shell"], [1, "topbar"], ["routerLink", "/", "aria-label", "Poll App home", 1, "brand"], ["src", "/images/pollapp_orange.png", "alt", "Poll App", 1, "brand-logo", "brand-logo-orange"], ["src", "/images/pollapp_dark.png", "alt", "Poll App", 1, "brand-logo", "brand-logo-dark"], ["aria-label", "Primary navigation"], ["routerLink", "/", "routerLinkActive", "active", 1, "home-link", 3, "routerLinkActiveOptions"], ["type", "button", 1, "new-survey-button", 3, "click"]], template: function App_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "a", 2);
            i0.ɵɵelement(3, "img", 3)(4, "img", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "nav", 5)(6, "a", 6);
            i0.ɵɵtext(7, " Home ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "button", 7);
            i0.ɵɵlistener("click", function App_Template_button_click_8_listener() { return ctx.createDialog.open(); });
            i0.ɵɵtext(9, " New Survey ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(10, "main");
            i0.ɵɵelement(11, "router-outlet");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(12, "app-create-poll-dialog");
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("routerLinkActiveOptions", i0.ɵɵpureFunction0(1, _c0));
        } }, dependencies: [RouterOutlet,
            RouterLink,
            RouterLinkActive,
            CreatePollDialogComponent], styles: ["[_nghost-%COMP%] {\n  display: block;\n  min-height: 100vh;\n  background: #302136;\n}\n\n.app-shell[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 100vh;\n  overflow-x: hidden;\n  background: #302136;\n}\n\n.topbar[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 50;\n  display: flex;\n  min-height: 64px;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1rem clamp(1.25rem, 8vw, 7rem) 0;\n  background: #302136;\n}\n\n.brand[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n}\n\n.brand-logo[_ngcontent-%COMP%] {\n  display: block;\n  width: 84px;\n  height: auto;\n}\n\n.brand-logo-dark[_ngcontent-%COMP%] {\n  display: none;\n}\n\nnav[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: .8rem;\n}\n\n.home-link[_ngcontent-%COMP%] {\n  color: #fff8ef;\n  font-size: .72rem;\n  font-weight: 700;\n}\n\n.home-link.active[_ngcontent-%COMP%], \n.home-link[_ngcontent-%COMP%]:hover {\n  color: #ffc06b;\n}\n\n.new-survey-button[_ngcontent-%COMP%] {\n  min-height: 30px;\n  border: 1px solid #e09a51;\n  border-radius: 5px;\n  padding: .4rem .72rem;\n  background: linear-gradient(180deg, #ffd08a 0%, #ffbd65 100%);\n  color: #2f2032;\n  font-size: .68rem;\n  font-weight: 900;\n  box-shadow: 0 1px 0 #d6843c;\n}\n\n\n.app-shell[_ngcontent-%COMP%]:has(app-poll-detail-page) {\n  background: #ffffff;\n}\n\n.app-shell[_ngcontent-%COMP%]:has(app-poll-detail-page)   .topbar[_ngcontent-%COMP%] {\n  min-height: 58px;\n  padding-top: .65rem;\n  border-bottom: 1px solid #eee8ef;\n  background: #ffffff;\n}\n\n.app-shell[_ngcontent-%COMP%]:has(app-poll-detail-page)   .brand-logo-orange[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.app-shell[_ngcontent-%COMP%]:has(app-poll-detail-page)   .brand-logo-dark[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.app-shell[_ngcontent-%COMP%]:has(app-poll-detail-page)   .home-link[_ngcontent-%COMP%] {\n  color: #443748;\n}\n\n.app-shell[_ngcontent-%COMP%]:has(app-poll-detail-page)   .new-survey-button[_ngcontent-%COMP%]::first-letter {\n  text-transform: uppercase;\n}\n\n@media (max-width: 520px) {\n  .topbar[_ngcontent-%COMP%] {\n    min-height: 58px;\n    padding: .75rem 1rem 0;\n  }\n\n  .brand-logo[_ngcontent-%COMP%] {\n    width: 72px;\n  }\n\n  .home-link[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .new-survey-button[_ngcontent-%COMP%] {\n    padding: .38rem .58rem;\n    font-size: .65rem;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(App, [{
        type: Component,
        args: [{ selector: 'app-root', standalone: true, imports: [
                    RouterOutlet,
                    RouterLink,
                    RouterLinkActive,
                    CreatePollDialogComponent,
                ], template: "<div class=\"app-shell\">\n  <header class=\"topbar\">\n    <a class=\"brand\" routerLink=\"/\" aria-label=\"Poll App home\">\n      <img class=\"brand-logo brand-logo-orange\" src=\"/images/pollapp_orange.png\" alt=\"Poll App\">\n      <img class=\"brand-logo brand-logo-dark\" src=\"/images/pollapp_dark.png\" alt=\"Poll App\">\n    </a>\n\n    <nav aria-label=\"Primary navigation\">\n      <a\n        class=\"home-link\"\n        routerLink=\"/\"\n        routerLinkActive=\"active\"\n        [routerLinkActiveOptions]=\"{ exact: true }\"\n      >\n        Home\n      </a>\n\n      <button type=\"button\" class=\"new-survey-button\" (click)=\"createDialog.open()\">\n        New Survey\n      </button>\n    </nav>\n  </header>\n\n  <main>\n    <router-outlet />\n  </main>\n</div>\n\n<app-create-poll-dialog />\n", styles: [":host {\n  display: block;\n  min-height: 100vh;\n  background: #302136;\n}\n\n.app-shell {\n  width: 100%;\n  min-height: 100vh;\n  overflow-x: hidden;\n  background: #302136;\n}\n\n.topbar {\n  position: relative;\n  z-index: 50;\n  display: flex;\n  min-height: 64px;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1rem clamp(1.25rem, 8vw, 7rem) 0;\n  background: #302136;\n}\n\n.brand {\n  display: inline-flex;\n  align-items: center;\n}\n\n.brand-logo {\n  display: block;\n  width: 84px;\n  height: auto;\n}\n\n.brand-logo-dark {\n  display: none;\n}\n\nnav {\n  display: flex;\n  align-items: center;\n  gap: .8rem;\n}\n\n.home-link {\n  color: #fff8ef;\n  font-size: .72rem;\n  font-weight: 700;\n}\n\n.home-link.active,\n.home-link:hover {\n  color: #ffc06b;\n}\n\n.new-survey-button {\n  min-height: 30px;\n  border: 1px solid #e09a51;\n  border-radius: 5px;\n  padding: .4rem .72rem;\n  background: linear-gradient(180deg, #ffd08a 0%, #ffbd65 100%);\n  color: #2f2032;\n  font-size: .68rem;\n  font-weight: 900;\n  box-shadow: 0 1px 0 #d6843c;\n}\n\n/* The Figma detail page switches to a light header. */\n.app-shell:has(app-poll-detail-page) {\n  background: #ffffff;\n}\n\n.app-shell:has(app-poll-detail-page) .topbar {\n  min-height: 58px;\n  padding-top: .65rem;\n  border-bottom: 1px solid #eee8ef;\n  background: #ffffff;\n}\n\n.app-shell:has(app-poll-detail-page) .brand-logo-orange {\n  display: none;\n}\n\n.app-shell:has(app-poll-detail-page) .brand-logo-dark {\n  display: block;\n}\n\n.app-shell:has(app-poll-detail-page) .home-link {\n  color: #443748;\n}\n\n.app-shell:has(app-poll-detail-page) .new-survey-button::first-letter {\n  text-transform: uppercase;\n}\n\n@media (max-width: 520px) {\n  .topbar {\n    min-height: 58px;\n    padding: .75rem 1rem 0;\n  }\n\n  .brand-logo {\n    width: 72px;\n  }\n\n  .home-link {\n    display: none;\n  }\n\n  .new-survey-button {\n    padding: .38rem .58rem;\n    font-size: .65rem;\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(App, { className: "App", filePath: "app/app.ts", lineNumber: 23 }); })();
//# sourceMappingURL=app.js.map