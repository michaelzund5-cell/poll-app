/**
 * @file src/app/infrastructure/supabase/supabase.connector.ts
 * @description Creates the shared browser-side Supabase client.
 */

import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseConnector {
  readonly client: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabasePublishableKey,
    { auth: { persistSession: false } },
  );
}
