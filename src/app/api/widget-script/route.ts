import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const script = `
(function () {
  const currentScript = document.currentScript;
  const scriptUrl = new URL(currentScript && currentScript.src ? currentScript.src : window.location.href);
  const apiOrigin = scriptUrl.origin;
  const businessSlug = scriptUrl.searchParams.get('businessSlug');
  const widgetSlug = scriptUrl.searchParams.get('widgetSlug');

  if (!businessSlug) {
    console.warn('Clara widget requires a businessSlug parameter.');
    return;
  }

  const styles = document.createElement('style');
  styles.textContent = [
    '.clara-widget-root{position:fixed;right:20px;bottom:20px;z-index:2147483647;font-family:Inter,system-ui,sans-serif;}',
    '.clara-widget-launcher{width:64px;height:64px;border:none;border-radius:9999px;background:#0f766e;color:#fff;box-shadow:0 18px 40px rgba(15,118,110,.35);cursor:pointer;font-weight:700;display:flex;align-items:center;justify-content:center;}',
    '.clara-widget-panel{position:absolute;right:0;bottom:76px;width:320px;max-width:calc(100vw - 40px);border-radius:24px;background:#fff;box-shadow:0 30px 80px rgba(15,23,42,.24);overflow:hidden;border:1px solid rgba(15,23,42,.08);}',
    '.clara-widget-header{padding:18px 20px;background:linear-gradient(135deg,#0f766e,#14b8a6);color:#fff;}',
    '.clara-widget-title{margin:0;font-size:16px;font-weight:700;}',
    '.clara-widget-subtitle{margin:6px 0 0;font-size:13px;opacity:.9;}',
    '.clara-widget-body{padding:16px 20px 20px;display:grid;gap:12px;}',
    '.clara-widget-card{border:1px solid rgba(15,23,42,.08);border-radius:18px;padding:14px 16px;background:#f8fafc;cursor:pointer;text-align:left;}',
    '.clara-widget-card strong{display:block;font-size:15px;margin-bottom:4px;color:#0f172a;}',
    '.clara-widget-card span{display:block;font-size:13px;color:#64748b;}',
    '.clara-widget-chat{border:1px solid rgba(15,23,42,.08);border-radius:18px;padding:14px 16px;background:#fff;}',
    '.clara-widget-input{width:100%;box-sizing:border-box;border:1px solid rgba(15,23,42,.12);border-radius:14px;padding:10px 12px;font-size:14px;outline:none;}',
    '.clara-widget-send{margin-top:10px;width:100%;border:none;border-radius:14px;padding:10px 12px;background:#dc2626;color:#fff;font-weight:700;cursor:pointer;}',
    '.clara-widget-actions{display:grid;gap:10px;}',
  ].join('');
  document.head.appendChild(styles);

  const root = document.createElement('div');
  root.className = 'clara-widget-root';
  root.innerHTML = [
    '<button type="button" class="clara-widget-launcher" aria-label="Open Clara assistant">Clara</button>',
    '<div class="clara-widget-panel" hidden>',
    '  <div class="clara-widget-header">',
    '    <p class="clara-widget-title">Clara</p>',
    '    <p class="clara-widget-subtitle">Cargando asistente...</p>',
    '  </div>',
    '  <div class="clara-widget-body">',
    '    <div class="clara-widget-actions">',
    '      <button type="button" class="clara-widget-card" data-action="book">',
    '        <strong>Book an Appointment</strong>',
    '        <span>Choose a service, date and time</span>',
    '      </button>',
    '      <button type="button" class="clara-widget-card" data-action="chat">',
    '        <strong>Chat with AI Assistant</strong>',
    '        <span>Ask questions or get help</span>',
    '      </button>',
    '    </div>',
    '    <div class="clara-widget-chat" data-chat hidden>',
    '      <input class="clara-widget-input" type="text" placeholder="Type a message..." />',
    '      <button type="button" class="clara-widget-send">Send</button>',
    '    </div>',
    '  </div>',
    '</div>',
  ].join('');
  document.body.appendChild(root);

  const launcher = root.querySelector('.clara-widget-launcher');
  const panel = root.querySelector('.clara-widget-panel');
  const subtitle = root.querySelector('.clara-widget-subtitle');
  const bookButton = root.querySelector('[data-action="book"]');
  const chatButton = root.querySelector('[data-action="chat"]');
  const chatBox = root.querySelector('[data-chat]');
  const chatInput = root.querySelector('.clara-widget-input');
  const sendButton = root.querySelector('.clara-widget-send');

  const bookingUrl = apiOrigin + '/portal?businessSlug=' + encodeURIComponent(businessSlug);

  function setMessage(text) {
    if (subtitle) subtitle.textContent = text;
  }

  launcher && launcher.addEventListener('click', function () {
    if (panel) panel.hidden = !panel.hidden;
  });

  bookButton && bookButton.addEventListener('click', function () {
    window.open(bookingUrl, '_blank', 'noopener,noreferrer');
  });

  chatButton && chatButton.addEventListener('click', function () {
    if (chatBox) chatBox.hidden = !chatBox.hidden;
  });

  sendButton && sendButton.addEventListener('click', function () {
    const value = chatInput && chatInput.value ? chatInput.value.trim() : '';
    if (!value) return;
    window.open(bookingUrl + '#chat=' + encodeURIComponent(value), '_blank', 'noopener,noreferrer');
  });

  fetch(apiOrigin + '/api/widget/config?businessSlug=' + encodeURIComponent(businessSlug) + (widgetSlug ? '&widgetSlug=' + encodeURIComponent(widgetSlug) : ''))
    .then(function (response) {
      return response.ok ? response.json() : null;
    })
    .then(function (payload) {
      const widget = payload && (payload.widget || payload.config || payload);
      if (!widget) return;
      if (launcher) launcher.style.background = widget.primaryColor || '#0f766e';
      if (subtitle) subtitle.textContent = widget.greetingMessage || ('Welcome to ' + (widget.businessName || 'Clara'));
      setMessage(widget.greetingMessage || ('Welcome to ' + (widget.businessName || 'Clara')));
    })
    .catch(function () {
      setMessage('Welcome to Clara');
    });
})();
`
  return new NextResponse(script, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'public, max-age=60',
    },
  })
}
