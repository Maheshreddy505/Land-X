# Land-X — PWA package

This folder is a installable web app (PWA), not a single file — it needs `manifest.json`
and `sw.js` to sit next to `index.html` on a real https:// URL for "Install app" /
"Add to Home Screen" to appear. Opening `index.html` directly from disk (file://) will
still run the app fine, but phones won't offer the install prompt from a local file.

## Fastest way to get an installable link (free, ~1 minute, no account needed)

1. Go to https://app.netlify.com/drop
2. Drag this whole folder onto the page.
3. Netlify gives you a live https:// URL immediately.
4. Open that URL on your phone → browser menu → **Add to Home Screen** / **Install app**.
   Land-X now has its own icon and opens full-screen, no browser bar.

## Alternatives
- **GitHub Pages**: push this folder to a repo, enable Pages in Settings — free permanent URL.
- **Vercel**: `vercel deploy` from this folder if you have the CLI.
- Any static host works — the app is 100% client-side (no backend/server required).

## Files
- `index.html` — the app itself
- `manifest.json` — tells the browser it's installable (name, icon, colors)
- `sw.js` — service worker; caches the app shell so it still opens if offline
- `icons/` — app icons in the sizes Android/iOS/desktop expect
