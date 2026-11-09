"use strict";

const APP_VERSION = 2;
document.getElementById("version").textContent = `Versjon ${APP_VERSION}`;

const LOGIN_HASH = "e32d1e62415b741653302e1c35bf365c82a131ac76ff4466fa41e1c044c801b5";
const LOGIN_STORAGE_KEY = "homepage-login";
const loginPanel = document.getElementById("login");
const homepage = document.getElementById("homepage");
const loginError = document.getElementById("login-error");
let homepageLoaded = false;

function showHomepage() {
  loginPanel.hidden = true;
  homepage.hidden = false;
  if (!homepageLoaded) {
    homepageLoaded = true;
    homepage.querySelectorAll("[data-src]").forEach(element => {
      element.src = element.dataset.src;
      element.removeAttribute("data-src");
    });
    loadLinks();
  }
}

document.getElementById("login-form").addEventListener("submit", async event => {
  event.preventDefault();
  const submit = document.getElementById("login-submit");
  submit.disabled = true;
  loginError.textContent = "";
  try {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${username}\n${password}`));
    const hash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
    if (hash !== LOGIN_HASH) {
      loginError.textContent = "Feil brukernavn eller passord.";
      document.getElementById("password").focus();
      return;
    }
    try {
      localStorage.setItem(LOGIN_STORAGE_KEY, LOGIN_HASH);
    } catch {
      // Innlogging fungerer også når nettleseren blokkerer lagring.
    }
    document.getElementById("login-form").reset();
    showHomepage();
    document.getElementById("logout").focus();
  } catch {
    loginError.textContent = "Kunne ikke kontrollere innloggingen. Åpne siden via HTTPS eller localhost.";
  } finally {
    submit.disabled = false;
  }
});

document.getElementById("logout").addEventListener("click", () => {
  try {
    localStorage.removeItem(LOGIN_STORAGE_KEY);
  } catch {
    // Vis login selv om lagring er blokkert.
  }
  homepage.hidden = true;
  loginPanel.hidden = false;
  loginError.textContent = "";
  document.getElementById("username").focus();
});

function createLink(item) {
  const url = new URL(item.url, document.baseURI);
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error(`Ugyldig adresse: ${item.url}`);
  }
  const link = document.createElement("a");
  link.href = item.url;
  link.textContent = item.text;
  return link;
}

function renderSections(data) {
  const fragment = document.createDocumentFragment();
  for (const section of data.sections) {
    const container = document.createElement("section");
    if (section.title) {
      const heading = document.createElement("h2");
      const content = section.url
        ? createLink({ text: section.title, url: section.url })
        : document.createElement("span");
      if (section.image) {
        const image = document.createElement("img");
        image.src = section.image;
        image.alt = section.title;
        image.className = "section-image";
        content.replaceChildren(image);
      } else {
        content.textContent = section.title;
      }
      heading.append(content);
      container.append(heading);
    }
    const rows = document.createElement("div");
    rows.className = "link-rows";
    for (const row of section.rows) {
      const line = document.createElement("div");
      line.className = "link-row";
      row.forEach((item, index) => {
        if (index) line.append(item.separator ?? " - ");
        line.append(createLink(item));
      });
      rows.append(line);
    }
    container.append(rows);
    fragment.append(container);
  }
  return fragment;
}

async function loadLinks() {
  const container = document.getElementById("links");
  try {
    const response = await fetch("links.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    container.replaceChildren(renderSections(await response.json()));
  } catch (error) {
    const message = document.createElement("p");
    message.textContent = "Kunne ikke laste linksamlingen. Last siden på nytt. Lokal forhåndsvisning må åpnes via en webserver.";
    const retry = document.createElement("button");
    retry.type = "button";
    retry.textContent = "Prøv igjen";
    retry.addEventListener("click", loadLinks);
    container.replaceChildren(message, retry);
    console.error("Kunne ikke laste linksamlingen:", error);
  }
}

try {
  if (localStorage.getItem(LOGIN_STORAGE_KEY) === LOGIN_HASH) showHomepage();
} catch {
  // Behold login når nettleseren blokkerer lagring.
}
