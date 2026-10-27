const CACHE_NAME = 'taka-khata-offline-v1'
const APP_SHELL = '/'

const cacheResponse = async (request, response) => {
  if (!response.ok) return response
  try {
    const cache = await caches.open(CACHE_NAME)
    await cache.put(request, response.clone())
  } catch (error) {
    console.error('Unable to cache an app resource for offline use:', error)
  }
  return response
}

self.addEventListener('install', event => {
  event.waitUntil(
    fetch(APP_SHELL)
      .then(async response => {
        if (!response.ok) throw new Error(`Could not cache the app shell: HTTP ${response.status}`)
        const html = await response.clone().text()
        const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((match) => match[1])
        const cache = await caches.open(CACHE_NAME)
        await cache.put(APP_SHELL, response)
        await cache.addAll(assets)
      })
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith('taka-khata-offline-') && key !== CACHE_NAME)
          .map(key => caches.delete(key)),
      ))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', event => {
  const request = event.request
  const url = new URL(request.url)
  if (request.method !== 'GET' || url.origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => cacheResponse(APP_SHELL, response))
        .catch(async () => (await caches.match(APP_SHELL)) || Response.error()),
    )
    return
  }

  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(response => {
      return cacheResponse(request, response)
    })),
  )
})
