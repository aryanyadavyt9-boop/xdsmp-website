import { SERVER, javaAddress } from "./config.js";

const TIMEOUT_MS = 8000;
const REFRESH_MS = 60000;

/** Returns {state:'online'|'offline', players, max, version} or throws on failure. */
async function fetchStatus() {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(SERVER.statusApi + encodeURIComponent(javaAddress), { signal: ctrl.signal });
    if (!res.ok) throw new Error(`Status API returned ${res.status}`);
    const d = await res.json();
    if (typeof d.online !== "boolean") throw new Error("Unexpected API response");
    return d.online
      ? { state: "online", players: d.players?.online ?? null, max: d.players?.max ?? null, version: d.version?.name_clean ?? null }
      : { state: "offline" };
  } finally { clearTimeout(timer); }
}

function render(el, s) {
  const set = (k, v) => { const n = el.querySelector(`[data-status-${k}]`); if (n) n.textContent = v; };
  el.dataset.state = s.state;
  if (s.state === "online") {
    set("label", "Online");
    set("players", s.players != null ? `${s.players}${s.max != null ? " / " + s.max : ""} players` : "Player count unavailable");
    set("version", s.version ?? "");
  } else if (s.state === "offline") {
    set("label", "Offline"); set("players", "The server is not responding right now."); set("version", "");
  } else if (s.state === "error") {
    set("label", "Status unavailable"); set("players", "Could not reach the status service. Try again shortly."); set("version", "");
  } else { set("label", "Checking…"); set("players", ""); set("version", ""); }
}

export function initStatus() {
  const els = document.querySelectorAll("[data-status]");
  if (!els.length) return;
  const run = async () => {
    els.forEach(e => render(e, { state: "loading" }));
    try { const s = await fetchStatus(); els.forEach(e => render(e, s)); }
    catch { els.forEach(e => render(e, { state: "error" })); }
  };
  run();
  setInterval(() => { if (!document.hidden) run(); }, REFRESH_MS);
}
