# Hjemmeside

Statisk startside, appversjon 1. Nettsidefilene ligger i `site/`.

## Endre en link

Rediger `text` eller `url` i `site/links.json`, lagre og commit/push til `main` i VSCode. GitHub Actions publiserer endringen automatisk når Pages er aktivert. Du kan også redigere filen direkte på GitHub og velge "Commit changes".

## Aktivere GitHub Pages

Etter synkronisering: åpne repositoryets Settings > Pages og sett Source til "GitHub Actions". Start eventuelt "Publish GitHub Pages" manuelt under Actions dersom første kjøring skjedde før Pages ble aktivert.

Standardadresse: https://bamsen61.github.io/hjemmeside/

## Lokal forhåndsvisning

```powershell
Set-Location 'D:\GIT\hjemmeside'
python -m http.server 8080 --bind 127.0.0.1 --directory .\site
```

Åpne http://127.0.0.1:8080/ og stopp serveren med Ctrl+C. Siden må åpnes via en webserver for å laste `links.json`.

Prosjektdokumentasjon: [Hjemmeside Prosjekt.md](<Hjemmeside Prosjekt.md>).
