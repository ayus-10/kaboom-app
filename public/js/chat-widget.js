;(function () {
  if (window.__CHAT_WIDGET_LOADED__) return
  window.__CHAT_WIDGET_LOADED__ = true

  const widgetId = document.currentScript.dataset.widgetId
  const embedUrl = `https://kaboom-app.vercel.app/chat?id=${widgetId}`

  const button = document.createElement('button')
  button.innerText = '💬'
  Object.assign(button.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    border: 'none',
    background: '#111',
    color: '#fff',
    cursor: 'pointer',
    zIndex: 999999,
  })

  const iframe = document.createElement('iframe')
  iframe.src = embedUrl

  iframe.setAttribute(
    'sandbox',
    'allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-popups-to-escape-sandbox'
  )

  Object.assign(iframe.style, {
    position: 'fixed',
    bottom: '90px',
    right: '20px',
    width: '360px',
    height: '600px',
    border: 'none',
    borderRadius: '12px',
    boxShadow: '0 20px 40px rgba(0,0,0,.2)',
    display: 'none',
    zIndex: 999999,
  })

  button.onclick = () => {
    iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none'
  }

  document.body.appendChild(button)
  document.body.appendChild(iframe)
})()
