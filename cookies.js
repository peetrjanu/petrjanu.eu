/* ============================================
   PETRJANU.EU — Cookie lišta + Google Analytics
   GA4 se načte AŽ PO souhlasu návštěvníka.
   ============================================ */
(function () {
  var KEY = 'pj-cookie-consent';
  var GA_ID = 'G-3505CZ2F2P';

  /* ---- Načtení Google Analytics (jen po souhlasu) ---- */
  function loadGA() {
    if (window.__pjGaLoaded) return;
    window.__pjGaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  /* ---- Vzhled lišty ---- */
  function injectStyles() {
    if (document.getElementById('pj-cookie-style')) return;
    var css = ''
      + '#pj-cookie-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;'
      + 'background:#1a1a18;color:#fff;border-radius:14px;padding:20px 22px;'
      + 'box-shadow:0 12px 40px rgba(0,0,0,.35);max-width:520px;margin:0 auto;'
      + 'font-family:"DM Sans",sans-serif;font-size:14px;line-height:1.6;}'
      + '#pj-cookie-banner p{margin:0 0 14px;color:rgba(255,255,255,.85);}'
      + '#pj-cookie-banner p strong{color:#fff;}'
      + '#pj-cookie-banner .pj-ck-btns{display:flex;gap:10px;flex-wrap:wrap;}'
      + '#pj-cookie-banner button{font-family:"DM Sans",sans-serif;font-size:14px;'
      + 'font-weight:600;padding:10px 20px;border-radius:8px;cursor:pointer;border:none;}'
      + '#pj-ck-accept{background:#e84a27;color:#fff;}'
      + '#pj-ck-accept:hover{background:#c73d1e;}'
      + '#pj-ck-decline{background:transparent;color:rgba(255,255,255,.75);'
      + 'border:1.5px solid rgba(255,255,255,.25) !important;}'
      + '#pj-ck-decline:hover{color:#fff;border-color:rgba(255,255,255,.5) !important;}'
      + '.pj-ck-footer-link{cursor:pointer;}'
      + '@media (max-width:480px){#pj-cookie-banner{left:10px;right:10px;bottom:10px;padding:16px;}}';
    var style = document.createElement('style');
    style.id = 'pj-cookie-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ---- Zobrazení lišty ---- */
  function showBanner() {
    if (document.getElementById('pj-cookie-banner')) return;
    injectStyles();
    var d = document.createElement('div');
    d.id = 'pj-cookie-banner';
    d.innerHTML = ''
      + '<p><strong>🍪 Cookies a měření návštěvnosti.</strong> '
      + 'Tento web používá Google Analytics, aby zjistil, co návštěvníky zajímá. '
      + 'Měření se spustí jen s vaším souhlasem a svou volbu můžete kdykoli změnit v patičce webu.</p>'
      + '<div class="pj-ck-btns">'
      + '<button id="pj-ck-accept" type="button">Přijmout</button>'
      + '<button id="pj-ck-decline" type="button">Odmítnout</button>'
      + '</div>';
    document.body.appendChild(d);
    document.getElementById('pj-ck-accept').onclick = function () { choose('granted'); };
    document.getElementById('pj-ck-decline').onclick = function () { choose('denied'); };
  }

  function hideBanner() {
    var b = document.getElementById('pj-cookie-banner');
    if (b) b.remove();
  }

  function choose(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
    hideBanner();
    if (value === 'granted') loadGA();
  }

  /* ---- Odkaz „Nastavení cookies" v patičce ---- */
  function addFooterLink() {
    var footer = document.querySelector('footer');
    if (!footer || document.getElementById('pj-ck-footer')) return;
    var linkWrap = footer.querySelector('div[style*="flex"]') || footer;
    var a = document.createElement('a');
    a.id = 'pj-ck-footer';
    a.className = 'pj-ck-footer-link';
    a.textContent = 'Nastavení cookies';
    a.onclick = function (e) {
      e.preventDefault();
      try { localStorage.removeItem(KEY); } catch (err) {}
      showBanner();
    };
    a.href = '#';
    linkWrap.appendChild(a);
  }

  /* ---- Start ---- */
  function init() {
    addFooterLink();
    var consent = null;
    try { consent = localStorage.getItem(KEY); } catch (e) {}
    if (consent === 'granted') {
      loadGA();
    } else if (consent !== 'denied') {
      showBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
