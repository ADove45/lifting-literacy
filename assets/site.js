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
    });
    document.getElementById('form-partner').addEventListener('submit', function () {
      var who = document.getElementById('p-name'), org = document.getElementById('p-org').value.trim();
      if (org && who.value.indexOf('(' + org + ')') === -1) { who.value = who.value.trim() + ' (' + org + ')'; }
    });
    route();
    var notes = {
      'joined=member': 'Welcome to #LiftingLiteracy! Watch your inbox for a welcome email.',
      'joined=partner': 'Thank you for applying to partner with #LiftingLiteracy. We will be in touch by email.',
      'confirmed=member': 'You are confirmed. Welcome to #LiftingLiteracy! Your first update is on its way.',
      'confirmed=partner': 'You are confirmed. Thank you for partnering with #LiftingLiteracy. We will be in touch soon about next steps.'
    };
    var hit = location.search.match(/[?&]((?:joined|confirmed)=(?:member|partner))/);
    if (hit) {
      if (/partner$/.test(hit[1])) { pick('partner'); }
      msg.textContent = notes[hit[1]];
      msg.hidden = false;
      document.getElementById('join').scrollIntoView();
    }
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
