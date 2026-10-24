// MyNeST — service-worker registration + offline indicator, shared by every page.
(function () {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js').catch(function () {});
    });
  }

  function pill() {
    var el = document.getElementById('mynestOfflinePill');
    if (!el) {
      el = document.createElement('div');
      el.id = 'mynestOfflinePill';
      el.className = 'mynest-offline-pill';
      el.textContent = 'Offline — all clinical tools still work';
      document.body.appendChild(el);
    }
    return el;
  }
  function update() {
    if (!document.body) return;
    var el = pill();
    if (navigator.onLine) { el.classList.remove('show'); }
    else { el.classList.add('show'); setTimeout(function () { el.classList.remove('show'); }, 4000); }
  }
  window.addEventListener('online', update);
  window.addEventListener('offline', update);
  document.addEventListener('DOMContentLoaded', function () { if (!navigator.onLine) update(); });
})();
