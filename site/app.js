"use strict";

const APP_VERSION = 1;
document.getElementById("version").textContent = `Versjon ${APP_VERSION}`;

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

loadLinks();
