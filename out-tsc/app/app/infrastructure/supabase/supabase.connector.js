/**
 * @file src/app/infrastructure/supabase/supabase.connector.ts
 * @description Supabase connector.
 *
 * Creates the single browser-side Supabase client used by the persistence layer.
 */
import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
/**
 * Owns the shared browser-side Supabase client.
 *
 * Centralizing construction prevents connection configuration from being
 * duplicated across feature code.
 */
export class SupabaseConnector {
    client = createClient(environment.supabaseUrl, environment.supabasePublishableKey, { auth: { persistSession: false } });
    static ɵfac = function SupabaseConnector_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SupabaseConnector)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: SupabaseConnector, factory: SupabaseConnector.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SupabaseConnector, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=supabase.connector.js.map