(function (global) {
  'use strict';
  var config = JSON.parse(document.getElementById('site-route').textContent);
  var language = config.lang;
  var normalize = function (value) { return config.routedLocales.indexOf(value) >= 0 ? value : null; };
  function pagePath(page, lang) {
    var prefix = lang === 'zh' ? 'zh' : lang === 'pt-BR' ? 'pt-BR' : '';
    if (page === 'index') return prefix ? prefix + (config.cloudflare ? '' : '.html') : './';
    return (prefix ? prefix + '/' : '') + page + (config.cloudflare ? '' : '.html');
  }
  function destination(lang) {
    var current = new URL(global.location.href);
    var next = new URL(pagePath(config.page, lang), document.baseURI);
    current.searchParams.delete('lang');
    next.search = current.search;
    next.hash = current.hash;
    return next;
  }
  // An explicit legacy query requests a route. Stored preferences never override a URL.
  var current = new URL(global.location.href);
  if (current.searchParams.has('lang')) {
    var requested = normalize(current.searchParams.get('lang'));
    current.searchParams.delete('lang');
    if (requested && requested !== language) {
      global.location.replace(destination(requested).href);
    } else {
      try { global.history.replaceState(global.history.state, '', current.href); } catch (_) {}
    }
  }
  function localizeLinks() {
    document.querySelectorAll('a[href]').forEach(function (link) {
      if (link.hasAttribute('data-language-switch')) return;
      var match = link.getAttribute('href').match(/^(index|guide|start|gallery|community|agent-diagrams|cases\/mco-runtime)\.html([?#].*)?$/);
      if (match) link.setAttribute('href', pagePath(match[1], language) + (match[2] || ''));
    });
  }
  global.ArchifySiteLanguage = Object.freeze({
    key: 'archify-lang',
    read: function () { return language; },
    content: function () { return config.contentLang; },
    resolve: function (translations) { return translations && (translations[language] || translations[config.contentLang] || translations.en); },
    value: function (translations, key) { return translations && (translations[language]?.[key] ?? translations[config.contentLang]?.[key] ?? translations.en?.[key]); },
    dictionary: function (translations) {
      if (!translations) return {};
      return Object.assign({}, translations[config.contentLang] || translations.en || {}, translations[language] || {});
    },
    text: function (node) {
      if (language === 'zh') return node.getAttribute('data-zh');
      if (language === 'pt-BR') return node.getAttribute('data-pt-br') || node.getAttribute('data-en');
      return node.getAttribute('data-en');
    },
    write: function () {
      try { global.localStorage.setItem('archify-lang', language); } catch (_) {}
      return language;
    },
    page: function (page, suffix) { return pagePath(page, language) + (suffix || ''); },
    localizeLinks: localizeLinks,
  });
  document.addEventListener('DOMContentLoaded', function () {
    localizeLinks();
    document.querySelectorAll('[data-language-switch]').forEach(function (link) {
      function sync() { link.href = destination(language === 'zh' ? 'en' : 'zh').href; }
      sync();
      link.addEventListener('pointerdown', sync);
      link.addEventListener('focus', sync);
      link.addEventListener('click', sync);
    });
  });
}(window));
