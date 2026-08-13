/**
 * @file src/app/infrastructure/supabase/supabase.connector.ts
 * @description Supabase connector.
 *
 * Creates the single browser-side Supabase client used by the persistence layer.
 */

import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
/**
 * Owns the shared browser-side Supabase client.
 *
 * Centralizing construction prevents connection configuration from being
 * duplicated across feature code.
 */
export class SupabaseConnector {
  readonly client: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabasePublishableKey,
    { auth: { persistSession: false } },
  );
}


