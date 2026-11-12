import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parse } from 'parse5';
import vm from 'node:vm';
import fs from 'node:fs';
import { isSiteLocale, siteLocales, siteRoutedLocales, siteContentLocales, canonicalPath, canonicalUrl, localPagePath } from '../src/data/site-urls.mjs';
import { localizeHtml } from '../src/data/localize-html.mjs';
import { pageMetadata } from '../src/data/site-metadata.mjs';

test('website locale registry recognizes pt-BR as a routed website locale', () => {
  assert.deepEqual(siteLocales, ['en', 'zh', 'pt-BR']);
  assert.equal(isSiteLocale('pt-BR'), true);
  assert.equal(isSiteLocale('pt-br'), false);
  assert.deepEqual(siteRoutedLocales, ['en', 'zh', 'pt-BR']);
  assert.equal(siteContentLocales['pt-BR'], 'en');
  assert.equal(canonicalPath('index', 'en'), '/');
  assert.equal(canonicalPath('index', 'zh'), '/zh');
  assert.equal(canonicalPath('index', 'pt-BR'), '/pt-BR');
  assert.equal(canonicalPath('guide', 'pt-BR'), '/pt-BR/guide');
  assert.equal(localPagePath('index', 'pt-BR'), 'pt-BR.html');
  assert.equal(localPagePath('guide', 'pt-BR', true), 'pt-BR/guide');
});

test('pt-BR static localization falls back to English and preserves authored content for missing keys', () => {
  const html = '<p data-i18n="known">Authored</p><p data-i18n="missing">Keep this</p><p data-en="English" data-zh="中文">Original</p><p data-en="English attribute" data-pt-br="Locale-specific">Original</p><p data-zh="中文 only">Keep original</p><input data-i18n-placeholder="hint"><a data-language-option="pt-BR" href="pt-BR/">Português (Brasil)</a><a data-language-option="en" href="./">English</a>';
  const localized = localizeHtml(html, { page: 'guide', lang: 'pt-BR', cloudflare: true, copy: { en: { known: 'English copy', hint: 'English hint' }, zh: { known: '中文' } } });
  const document = parse(localized);
  const find = (node, tag) => node.tagName === tag ? node : (node.childNodes || []).map(child => find(child, tag)).find(Boolean);
  assert.equal(find(document, 'p').childNodes[0].value, 'English copy');
  const paragraphs = [];
  const walk = node => { if (node.tagName === 'p') paragraphs.push(node); for (const child of node.childNodes || []) walk(child); };
  walk(document);
  assert.deepEqual(paragraphs.map(node => node.childNodes.map(child => child.value || '').join('')), ['English copy', 'Keep this', 'English', 'Locale-specific', 'Keep original']);
  assert.equal(find(document, 'input').attrs.find(attr => attr.name === 'placeholder').value, 'English hint');
  const options = [];
  const collect = node => { if (node.tagName === 'a' && node.attrs.some(attr => attr.name === 'data-language-option')) options.push(node); for (const child of node.childNodes || []) collect(child); };
  collect(document);
  assert.equal(options[0].attrs.find(attr => attr.name === 'href').value, 'pt-BR/guide');
  assert.equal(options[0].attrs.some(attr => attr.name === 'hidden'), true);
  assert.equal(options[1].attrs.find(attr => attr.name === 'href').value, 'guide');
});

test('site language runtime recognizes pt-BR routes and reports English as the content fallback', () => {
  const source = fs.readFileSync(new URL('../src/scripts/site-language.js', import.meta.url), 'utf8');
  let ready, redirected;
  const options = ['en', 'zh', 'pt-BR'].map(locale => ({ href: '', getAttribute(name) { return name === 'data-language-option' ? locale : null; }, addEventListener() {} }));
  const window = {
    location: { href: 'https://archify.si/guide?lang=pt-BR', replace(value) { redirected = value; } },
    history: { state: null, replaceState() {} },
    localStorage: { setItem() {} },
  };
  const document = {
    baseURI: 'https://archify.si/',
    getElementById() { return { textContent: JSON.stringify({ page: 'guide', lang: 'en', contentLang: 'en', cloudflare: true, locales: siteLocales, routedLocales: siteRoutedLocales }) }; },
    addEventListener(_event, callback) { ready = callback; },
    querySelectorAll(selector) { return selector === '[data-language-option]' ? options : []; },
  };
  vm.runInNewContext(source, { window, document, URL });
  assert.equal(redirected, 'https://archify.si/pt-BR/guide');
  assert.equal(window.ArchifySiteLanguage.read(), 'en');
  assert.equal(window.ArchifySiteLanguage.content(), 'en');
  ready();
  assert.equal(window.ArchifySiteLanguage.pageFrom('zh'), 'https://archify.si/zh/guide');

  const ptWindow = { location: { href: 'https://archify.si/pt-BR/guide' }, history: { state: null, replaceState() {} }, localStorage: { setItem() {} } };
  const ptDocument = {
    baseURI: 'https://archify.si/',
    getElementById() { return { textContent: JSON.stringify({ page: 'guide', lang: 'pt-BR', contentLang: 'en', cloudflare: true, locales: siteLocales, routedLocales: siteRoutedLocales }) }; },
    addEventListener() {}, querySelectorAll() { return []; },
  };
  vm.runInNewContext(source, { window: ptWindow, document: ptDocument, URL });
  assert.equal(ptWindow.ArchifySiteLanguage.read(), 'pt-BR');
  assert.equal(ptWindow.ArchifySiteLanguage.content(), 'en');
  assert.equal(ptWindow.ArchifySiteLanguage.page('guide'), 'pt-BR/guide');
  assert.equal(ptWindow.ArchifySiteLanguage.resolve({ en: 'English value', zh: '中文' }), 'English value');
  assert.equal(ptWindow.ArchifySiteLanguage.resolve({ 'pt-BR': 'Locale-specific', en: 'English value' }), 'Locale-specific');
  assert.equal(ptWindow.ArchifySiteLanguage.resolve({ zh: '中文 only' }), undefined);
  assert.equal(ptWindow.ArchifySiteLanguage.value({ 'pt-BR': { translated: 'Locale-specific' }, en: { translated: 'English', missing: 'English fallback' } }, 'missing'), 'English fallback');
  assert.deepEqual({ ...ptWindow.ArchifySiteLanguage.dictionary({ 'pt-BR': { translated: 'Locale-specific' }, en: { translated: 'English', missing: 'English fallback' } }) }, { translated: 'Locale-specific', missing: 'English fallback' });
  assert.equal(ptWindow.ArchifySiteLanguage.text({ getAttribute(name) { return name === 'data-en' ? 'English attribute' : null; } }), 'English attribute');
  assert.equal(ptWindow.ArchifySiteLanguage.text({ getAttribute() { return null; } }), null);
});

test('pt-BR page metadata uses English content metadata and a pt-BR canonical without claiming a translation alternate', () => {
  const metadata = pageMetadata('agent-diagrams', 'pt-BR', '1.2.3');
  const english = pageMetadata('agent-diagrams', 'en', '1.2.3');
  assert.equal(metadata.canonical, canonicalUrl('agent-diagrams', 'pt-BR'));
  assert.equal(metadata.title, english.title);
  assert.equal(metadata.description, english.description);
  assert.equal(metadata.schema['@graph'][2].inLanguage, 'en');
});

test('built pt-BR routes reuse existing pages with English document language and valid navigation', () => {
  const cloudflare = process.env.ARCHIFY_SITE_TARGET === 'cloudflare';
  const output = new URL(cloudflare ? '../dist-cloudflare/' : '../dist/', import.meta.url);
  for (const page of ['index', 'guide', 'start', 'gallery', 'community', 'agent-diagrams', 'cases/mco-runtime']) {
    const file = page === 'index' ? 'pt-BR.html' : `pt-BR/${page}.html`;
    const html = fs.readFileSync(new URL(file, output), 'utf8');
    const document = parse(html);
    const all = [];
    const walk = node => { all.push(node); for (const child of node.childNodes || []) walk(child); };
    walk(document);
    const attr = (node, name) => node?.attrs?.find(item => item.name === name)?.value;
    assert.equal(attr(all.find(node => node.tagName === 'html'), 'lang'), 'en', file);
    assert.equal(attr(all.find(node => node.tagName === 'link' && attr(node, 'rel') === 'canonical'), 'href'), canonicalUrl(page, 'pt-BR'), file);
    assert.equal(all.some(node => node.tagName === 'link' && attr(node, 'hreflang') === 'pt-BR'), false, file);
    for (const locale of ['en', 'zh', 'pt-BR']) {
      const option = all.find(node => node.tagName === 'a' && attr(node, 'data-language-option') === locale);
      assert.ok(option, `${file}: ${locale} language option`);
      assert.equal(attr(option, 'href'), localPagePath(page, locale, cloudflare), file);
      assert.equal(attr(option, 'hidden') !== undefined, locale === 'pt-BR', file);
    }

    for (const lang of ['en', 'zh']) {
      const sourceFile = lang === 'zh' ? (page === 'index' ? 'zh.html' : `zh/${page}.html`) : (page === 'index' ? 'index.html' : `${page}.html`);
      const sourceDocument = parse(fs.readFileSync(new URL(sourceFile, output), 'utf8'));
      const sourceNodes = [];
      const collect = node => { sourceNodes.push(node); for (const child of node.childNodes || []) collect(child); };
      collect(sourceDocument);
      for (const locale of ['en', 'zh', 'pt-BR']) {
        const option = sourceNodes.find(node => node.tagName === 'a' && attr(node, 'data-language-option') === locale);
        assert.ok(option, `${sourceFile}: ${locale} language option`);
        assert.equal(attr(option, 'href'), localPagePath(page, locale, cloudflare), sourceFile);
        assert.equal(attr(option, 'hidden') !== undefined, locale === lang, sourceFile);
      }
    }
  }
});
