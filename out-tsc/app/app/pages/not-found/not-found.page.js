/**
 * @file src/app/pages/not-found/not-found.page.ts
 * @description Not-found page controller.
 *
 * Minimal route component displayed when no configured application route matches the current URL.
 */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as i0 from "@angular/core";
export class NotFoundPage {
    static ɵfac = function NotFoundPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NotFoundPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NotFoundPage, selectors: [["app-not-found-page"]], decls: 9, vars: 0, consts: [["routerLink", "/"]], template: function NotFoundPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section")(1, "span");
            i0.ɵɵtext(2, "404");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "h1");
            i0.ɵɵtext(4, "That page wandered off.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "The route does not exist or the poll was moved.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "a", 0);
            i0.ɵɵtext(8, "Return to polls");
            i0.ɵɵelementEnd()();
        } }, dependencies: [RouterLink], styles: ["[_nghost-%COMP%] {\n  display: grid;\n  min-height: calc(100vh - 78px);\n  place-items: center;\n  padding: 2rem;\n  background: #343434;\n  color: #fff;\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NotFoundPage, [{
        type: Component,
        args: [{ selector: 'app-not-found-page', imports: [RouterLink], template: "<!--\n  File: src/app/pages/not-found/not-found.page.html\n  Purpose: Not-found template.\n  Provides a clear recovery path when a user opens an unknown route.\n-->\n\n<section><span>404</span><h1>That page wandered off.</h1><p>The route does not exist or the poll was moved.</p><a routerLink=\"/\">Return to polls</a></section>\n", styles: [":host {\n  display: grid;\n  min-height: calc(100vh - 78px);\n  place-items: center;\n  padding: 2rem;\n  background: #343434;\n  color: #fff;\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NotFoundPage, { className: "NotFoundPage", filePath: "app/pages/not-found/not-found.page.ts", lineNumber: 11 }); })();
//# sourceMappingURL=not-found.page.js.map