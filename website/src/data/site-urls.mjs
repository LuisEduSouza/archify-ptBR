export const canonicalOrigin = 'https://archify.si';
export const siteLocales = ['en', 'zh', 'pt-BR'];
export const siteRoutedLocales = siteLocales;
export const siteContentLocales = { en: 'en', zh: 'zh', 'pt-BR': 'en' };
export const contentLocaleFor = locale => siteContentLocales[locale] || 'en';
export function isSiteLocale(locale) {
  return siteLocales.includes(locale);
}
export const sitePages = ['index', 'guide', 'start', 'gallery', 'community', 'agent-diagrams', 'cases/mco-runtime'];
export function canonicalPath(page, lang = 'en') {
  const prefix = lang === 'zh' ? '/zh' : lang === 'pt-BR' ? '/pt-BR' : '';
  return page === 'index' ? (prefix || '/') : `${prefix}/${page}`;
}
export function canonicalUrl(page, lang = 'en') {
  return new URL(canonicalPath(page, lang), canonicalOrigin).href;
}
// Paths are relative to the site's root <base>, so exported files also work on file://.
export function localPagePath(page, lang = 'en', cloudflare = false) {
  const prefix = lang === 'zh' ? 'zh' : lang === 'pt-BR' ? 'pt-BR' : '';
  if (page === 'index') return prefix ? `${prefix}${cloudflare ? '' : '.html'}` : './';
  return `${prefix ? `${prefix}/` : ''}${page}${cloudflare ? '' : '.html'}`;
}
