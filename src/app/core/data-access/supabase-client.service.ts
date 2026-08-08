/**
 * @file src/app/core/data-access/supabase-client.service.ts
 * @description Supabase infrastructure client.
 *
 * Creates the single Supabase client used by repositories. Centralizing client construction prevents feature code from knowing environment details or creating competing client instances.
 */

import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
/**
 * Infrastructure wrapper around the Supabase JavaScript client.
 *
 * Repositories inject this wrapper instead of constructing clients themselves.
 * That centralizes environment configuration and creates one stable integration point.
 */
export class SupabaseClientService {
  /** Shared client configured from the active Angular environment. */
  readonly client: SupabaseClient = createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY);
}
