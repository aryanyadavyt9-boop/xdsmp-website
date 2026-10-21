# xDSMP website (Phase 1)
Static site: plain HTML, CSS and JavaScript (ES modules). No build step, no dependencies.
- `index.html`, `join.html` – pages
- `css/styles.css` – all styling
- `js/config.js` – **edit server details here** (set `bedrockPort` once confirmed)
- `js/status.js` – live status via mcstatus.io; `js/main.js` – copy buttons, menu
Preview: `python3 -m http.server 8000` in this folder, then open http://localhost:8000
(ES modules do not work when double-clicking the file; use the local server.)
