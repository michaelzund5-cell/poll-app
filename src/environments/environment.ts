/**
 * @file src/environments/environment.ts
 * @description Production/default environment configuration.
 *
 * Provides build-time infrastructure values used by the Supabase client. The publishable Supabase key is intentionally a client-side value; authorization must still be enforced by Supabase policies.
 */

/**
 * Build-time infrastructure values consumed by core services.
 * Do not place privileged server secrets here: browser bundles are visible to clients.
 */
export const environment = {
  SUPABASE_URL: 'https://xtpzkrbvcgbwjhnrmakl.supabase.co',
  SUPABASE_KEY: 'sb_publishable_ndHLyKZuILE_P298Jq5y4Q_8om2b75b',
};
