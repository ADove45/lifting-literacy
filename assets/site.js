(function () {
  var kinds = ['member', 'partner'];
  var msg = document.getElementById('su-msg');
  function pick(kind) {
    kinds.forEach(function (k) {
      document.getElementById('form-' + k).hidden = k !== kind;
      document.getElementById('tab-' + k).setAttribute('aria-selected', String(k === kind));
    });
    if (msg) { msg.hidden = true; }
  }
  if (document.getElementById('form-member')) {
    var route = function () {
      var h = (location.hash || '').replace('#', '');
      if (h === 'join-partner') { pick('partner'); document.getElementById('join').scrollIntoView(); }
      else if (h === 'join') { pick('member'); }
    };
    window.addEventListener('hashchange', route);
    kinds.forEach(function (k) {
      document.getElementById('tab-' + k).addEventListener('click', function () { pick(k); });
      document.getElementById('form-' + k).addEventListener('submit', function (e) { e.preventDefault(); msg.hidden = false; });
    });
    route();
  }
  Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function (btn) {
    var label = btn.textContent;
    btn.addEventListener('click', function () {
      var box = document.getElementById(btn.getAttribute('data-copy'));
      function done() { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = label; }, 2000); }
      function fallback() { box.focus(); box.select(); btn.textContent = 'Selected. Press Ctrl+C or Cmd+C'; setTimeout(function () { btn.textContent = label; }, 4000); }
      try { navigator.clipboard.writeText(box.value).then(done, fallback); } catch (e) { fallback(); }
    });
  });
})();
