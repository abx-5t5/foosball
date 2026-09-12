# foosball

we are making a basic website that can show a score, we have much bigger plans after that

## Phase 1: scoreboard

A static scoreboard with Red/Blue/Reset buttons, first to 8 wins. No build step, no backend.

**Live site:** https://abx-5t5.github.io/foosball/

- **Run locally:** open `index.html` in a browser, or serve the folder (e.g. `npx serve`).
- **Deploy:** push to `main` and enable GitHub Pages (Settings → Pages → Deploy from branch → `main` / root).

## Later phases (not built yet)

1. Physical scoring buttons (likely a WiFi microcontroller like an ESP32) — will need a small backend/relay to receive network requests, since GitHub Pages only serves static files.
2. Camera/sensor setup for shot speed and other match metrics.