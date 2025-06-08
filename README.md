# Bachelor prosjekt
# Visualisering av salg i sanntid på web (Dummy-versjon)

## Viktig om miljøvariabler og simulerte data

Dette er en dummy-versjon av prosjektet som bruker simulerte data for å demonstrere funksjonaliteten. Av hensyn til Europris' sensitive data er ikke de faktiske miljøvariablene eller sanntidsdataene inkludert i koden.
Det faktiske prosjektet kjører i Azure Container Apps og Azure Static Web Apps.
Dette dummy-prosjektet er ikke deployet og må derfor testes lokalt.

For å kjøre prosjektet lokalt bruker vi `SimulatedReceiver` som genererer dummydata. Dette gir deg mulighet til å se hvordan applikasjonen fungerer uten å trenge tilgang til faktiske Azure Event Hubs miljøvariabler.

## Prosjektbeskrivelse
Dette prosjektet er en demonstrasjonsversjon av en sanntids visualisering av salgsdata. Applikasjonen viser et interaktivt kart over Norge hvor butikkers salg vises med animerte blomster som indikerer salgsstørrelse. I denne versjonen brukes simulerte data for å vise funksjonaliteten.

### Hovedfunksjoner
- Simulert sanntids visualisering av salg på et interaktivt kart
- Automatisk kategorisering av salg basert på beløp
- Animerte blomster som indikerer salgsstørrelse
- Simulert datastrøm med `SimulatedReceiver`

## Systemoversikt
- **Backend**: Java Spring Boot med simulerte data
- **Frontend**: Next.js, React, Leaflet
- **Kommunikasjon**: WebSocket (STOMP)
- **Deployment**: Azure Container Apps, Static Web Apps

## Oppsett og Installasjon for lokal kjøring

### Backend

For å kunne kjøre backend lokalt må man ha Java 21 og Maven installert.

1. Kjør applikasjonen:
   ```bash
   mvn spring-boot:run
   ```
   Dette vil automatisk bruke `SimulatedReceiver` for å generere dummydata.

### Frontend

Frontend kan kjøres lokalt uavhengig av backend, så lenge du har Node.js installert.

1. Installer avhengigheter:
   ```bash
   npm install
   ```

2. Start utviklingsserveren:
   ```bash
   npm run dev
   ```

## Docker Deployment

Deployment pipelines.yml for CI/CD er inkludert for demonstrasjon, men vil ikke fungere i dette prosjektet.   

## Merk
Dette er en dummy-versjon av prosjektet som bruker simulerte data. Den faktiske implementasjonen med Azure Event Hubs og sanntidsdata er ikke inkludert i denne versjonen av hensyn til Europris' sensitive data.

