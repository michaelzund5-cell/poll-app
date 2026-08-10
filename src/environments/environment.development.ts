/**
 * @file src/environments/environment.development.ts
 * @description Development environment configuration.
 *
 * Keeps development infrastructure values isolated from application code so Angular file replacements or future environment-specific settings can be introduced without changing services.
 */

/**
 * Build-time infrastructure values consumed by core services.
 * Do not place privileged server secrets here: browser bundles are visible to clients.
 */
export const environment = {
  SUPABASE_URL: 'https://xtpzkrbvcgbwjhnrmakl.supabase.co',
  SUPABASE_KEY: 'sb_publishable_ndHLyKZuILE_P298Jq5y4Q_8om2b75b',
};
