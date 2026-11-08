# Hjemmeside – prosjektbeskrivelse og driftsgrunnlag

Dokumentversjon: 1

Sist kontrollert mot lokal kode: 2026-11-08

## Instruksjoner Codex ChatGPT skal følge

* Svar på norsk som standard. 
* Hvis noe er uklart og påvirker endringen, spør før endringer gjøres.
* Alle prosjektendringer skal gjøres direkte i filene under `D:\GIT\hjemmeside\`.
* Ikke sync prosjektet mot GitHub. Dette gjør jeg selv i VSCode.
* GitHub adressen er `https://github.com/Bamsen61/hjemmeside`
* Oppgaver og fremtidige planer skal ikke ligge i `Hjemmeside Prosjekt.md`. Der skal kun dokumentasjon ligge.
* Oppgaver og fremtidige planer skal sendes til chat.
* Ved hver endringsrunde i prosjektfilen økes dokumentversjonen med 1. Oppdater kontrolldatoen når dokumentet kontrolleres mot koden.
* Ved applikasjonsendringer skal appversjonen økes med 1 og relevante versjonsreferanser i dokumentasjon og tester oppdateres. Appen skal ha et versjonsnummer i koden. Versjonen vises høyrejustert i på toppen av forsiden.
* Ikke list lange endringer i chat.
* Når endringer er gjort skal `D:\GIT\hjemmeside\Hjemmeside Prosjekt.md` oppdateres så den alltid er konsistent med koden.
* Hvis noe må testes av brukeren, be om kun én test av gangen og vent på svar.
* Når jeg bruker "Du", "Deg" eller lignende, refererer dette til Codex ChatGPT.

## Implementert løsning

Appversjon: 1. Versjonen er definert som `APP_VERSION` i `site/app.js` og vises høyrejustert øverst på forsiden.

Nettsiden er en statisk HTML/CSS/JavaScript-side basert på `C:\Dropbox\startup\index.htm`. Originalfilene i Dropbox er ikke endret. Bakgrunn, bilder, seksjoner, linkrekkefølge og radinndeling er beholdt. Bilder og værgraf skaleres på smale skjermer.

## Filstruktur

* `site/index.html`: sidestruktur, klokker, værgraf og tidslinje.
* `site/style.css`: utseende og tilpasning til smale skjermer.
* `site/app.js`: appversjon og visning av linkene fra JSON. Linktekst settes som tekst, ikke HTML.
* `site/links.json`: seks seksjoner med 79 vanlige linker og tre heading-linker.
* `site/images/`: de fire bildene nettsiden bruker, kopiert fra Dropbox.
* `.github/workflows/pages.yml`: publisering til GitHub Pages fra `main`.

## Innhold og avgrensning

ICE bruker `https://minside.ice.no/`. Messenger, Feedly og MyHeritage beholder sine opprinnelige ID-er. "Privat" er en heading uten link. `privat.htm` og kommentert, inaktivt innhold fra originalen er ikke inkludert. Andre aktive linkadresser er beholdt, inkludert HTTP-adresser og lokal routeradresse.

Begge timeanddate-klokkene bruker HTTPS. Yr-grafen og Knight Lab-tidslinjen bruker de opprinnelige HTTPS-adressene. Disse eksterne tjenestene krever nettverk og kan endres uavhengig av nettsiden. Linker åpnes i samme fane som i originalen.

## Endre linker

Rediger `site/links.json` i Sublime Text eller GitHubs file editor. Hvert element i `sections` har `rows`, der hver indre liste er en rad. En link har `text` og `url`. Standard separator mellom linker er " - ". Det valgfrie feltet `separator` overstyrer separatoren foran den aktuelle linken. `title` angir heading; `url` på seksjonen gjør headingen klikkbar, og `image` angir et heading-bilde.

Lagre JSON som UTF-8. Etter commit og push til `main` publiseres endringer under `site/` automatisk. En ren linkendring kan gjøres uten endring i HTML, CSS eller JavaScript. Ved en appendring økes `APP_VERSION` med 1 og dokumentasjonen oppdateres i samme endringsrunde.

## Publisering

Repository: `https://github.com/Bamsen61/hjemmeside`.

Workflowen kan startes ved push til `main` med endringer i `site/` eller workflowfilen, og manuelt med `workflow_dispatch`. Bare `site/` lastes opp som publiseringsartefakt. Prosjektdokumentasjon og andre repository-filer inngår ikke i artefaktet. Workflowen bruker GitHubs innebygde token, Pages-rettigheter og environment `github-pages`.

GitHub Pages må være konfigurert med "GitHub Actions" som Source under repositoryets Settings > Pages. Forventet standardadresse er `https://bamsen61.github.io/hjemmeside/`. Workflowfilen er opprettet lokalt; ingen commit, push eller endringer i GitHub-innstillinger er utført av Codex.

## Lokal forhåndsvisning og kontroll

Kjør fra prosjektmappen:

```powershell
python -m http.server 8080 --bind 127.0.0.1 --directory .\site
```

Åpne `http://127.0.0.1:8080/`. Direkte åpning som `file://` støttes ikke fordi linkene lastes med `fetch`. Stopp serveren med Ctrl+C.

JavaScript-syntaks, JSON, samsvar med originalens aktive linkadresser og lokale bildefiler er kontrollert. HTTP- og nettleserkontroll mot lokal webserver fikk timeout i kjøremiljøet; lokal servertilgang og visuell nettleserkontroll er derfor ikke bekreftet. Publisering på GitHub kan først kontrolleres etter brukerens synkronisering og aktivering av Pages. Tilgang og funksjon på eksterne målsider er ikke verifisert.

