import { SERVER, javaAddress } from "./config.js";
import { initStatus } from "./status.js";

document.querySelectorAll("[data-java-address]").forEach(n => (n.textContent = javaAddress));
document.querySelectorAll("[data-java-host]").forEach(n => (n.textContent = SERVER.javaHost));
document.querySelectorAll("[data-version]").forEach(n => (n.textContent = SERVER.version));
document.querySelectorAll("[data-link]").forEach(n => (n.href = SERVER[n.dataset.link]));
document.querySelectorAll("[data-bedrock-port]").forEach(n => {
  n.textContent = SERVER.bedrockPort ?? "Not confirmed yet. Ask in Discord.";
});

const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("menu");
toggle?.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  menu.classList.toggle("open", !open);
});

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch {
    const t = Object.assign(document.createElement("textarea"), { value: text });
    t.style.position = "fixed"; t.style.opacity = "0"; document.body.append(t); t.select();
    const ok = document.execCommand("copy"); t.remove(); return ok;
  }
}
document.querySelectorAll("[data-copy]").forEach(btn => {
  const label = btn.textContent;
  btn.addEventListener("click", async () => {
    const ok = await copyText(javaAddress);
    btn.textContent = ok ? "Copied!" : "Copy failed";
    setTimeout(() => (btn.textContent = label), 2000);
  });
});

initStatus();
