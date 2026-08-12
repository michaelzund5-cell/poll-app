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
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: App, selectors: [["app-root"]], decls: 12, vars: 2, consts: [[1, "app-shell"], [1, "topbar"], ["routerLink", "/", "aria-label", "Poll App home", 1, "brand"], ["src", "/images/pollapp_orange.png", "alt", "Poll App"], ["aria-label", "Primary navigation"], ["routerLink", "/", "routerLinkActive", "active", 3, "routerLinkActiveOptions"], ["type", "button", 3, "click"]], template: function App_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "a", 2);
            i0.ɵɵelement(3, "img", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "nav", 4)(5, "a", 5);
            i0.ɵɵtext(6, " Home ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "button", 6);
            i0.ɵɵlistener("click", function App_Template_button_click_7_listener() { return ctx.createDialog.open(); });
            i0.ɵɵtext(8, " New Survey ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(9, "main");
            i0.ɵɵelement(10, "router-outlet");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(11, "app-create-poll-dialog");
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("routerLinkActiveOptions", i0.ɵɵpureFunction0(1, _c0));
        } }, dependencies: [RouterOutlet,
            RouterLink,
            RouterLinkActive,
            CreatePollDialogComponent], styles: ["[_nghost-%COMP%] {\n  display: block;\n  min-height: 100vh;\n  background: #343434;\n}\n\n.app-shell[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 100vh;\n  overflow-x: hidden;\n  background: #343434;\n}\n\n.topbar[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 50;\n  display: flex;\n  min-height: 72px;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.85rem clamp(1rem, 5vw, 4.5rem);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n  background: rgba(52, 52, 52, 0.96);\n  backdrop-filter: blur(12px);\n}\n\n.brand[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  display: block;\n  width: clamp(78px, 9vw, 112px);\n  height: auto;\n}\n\nnav[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n\nnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #e8e8e8;\n  font-size: 0.85rem;\n  font-weight: 800;\n}\n\nnav[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%], \nnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #fff;\n}\n\nnav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  border-radius: 0.5rem;\n  padding: 0.62rem 0.9rem;\n  background: #ffc473;\n  color: #343434;\n  font-weight: 900;\n  box-shadow: 0 2px 0 #d38a42;\n}\n\n@media (max-width: 520px) {\n  .topbar[_ngcontent-%COMP%] {\n    min-height: 62px;\n  }\n\n  nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 0.52rem 0.72rem;\n    font-size: 0.78rem;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(App, [{
        type: Component,
        args: [{ selector: 'app-root', standalone: true, imports: [
                    RouterOutlet,
                    RouterLink,
                    RouterLinkActive,
                    CreatePollDialogComponent,
                ], template: "<div class=\"app-shell\">\n  <header class=\"topbar\">\n    <a class=\"brand\" routerLink=\"/\" aria-label=\"Poll App home\">\n      <img src=\"/images/pollapp_orange.png\" alt=\"Poll App\">\n    </a>\n\n    <nav aria-label=\"Primary navigation\">\n      <a\n        routerLink=\"/\"\n        routerLinkActive=\"active\"\n        [routerLinkActiveOptions]=\"{ exact: true }\"\n      >\n        Home\n      </a>\n\n      <button type=\"button\" (click)=\"createDialog.open()\">\n        New Survey\n      </button>\n    </nav>\n  </header>\n\n  <main>\n    <router-outlet />\n  </main>\n</div>\n\n<app-create-poll-dialog />\n", styles: [":host {\n  display: block;\n  min-height: 100vh;\n  background: #343434;\n}\n\n.app-shell {\n  width: 100%;\n  min-height: 100vh;\n  overflow-x: hidden;\n  background: #343434;\n}\n\n.topbar {\n  position: sticky;\n  top: 0;\n  z-index: 50;\n  display: flex;\n  min-height: 72px;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.85rem clamp(1rem, 5vw, 4.5rem);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n  background: rgba(52, 52, 52, 0.96);\n  backdrop-filter: blur(12px);\n}\n\n.brand img {\n  display: block;\n  width: clamp(78px, 9vw, 112px);\n  height: auto;\n}\n\nnav {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n\nnav a {\n  color: #e8e8e8;\n  font-size: 0.85rem;\n  font-weight: 800;\n}\n\nnav a.active,\nnav a:hover {\n  color: #fff;\n}\n\nnav button {\n  border: 0;\n  border-radius: 0.5rem;\n  padding: 0.62rem 0.9rem;\n  background: #ffc473;\n  color: #343434;\n  font-weight: 900;\n  box-shadow: 0 2px 0 #d38a42;\n}\n\n@media (max-width: 520px) {\n  .topbar {\n    min-height: 62px;\n  }\n\n  nav a {\n    display: none;\n  }\n\n  nav button {\n    padding: 0.52rem 0.72rem;\n    font-size: 0.78rem;\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(App, { className: "App", filePath: "app/app.ts", lineNumber: 23 }); })();
//# sourceMappingURL=app.js.map