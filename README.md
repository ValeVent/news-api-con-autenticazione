# App di News con Autenticazione e Proxy API

Questo progetto è un'applicazione web completa sviluppata in Angular (Standalone Components), progettata per la visualizzazione di notizie. Si integra con un'API esterna (NewsAPI) per il recupero delle news e include un sistema di autenticazione utente. Il progetto affronta e risolve diverse sfide comuni nel deployment di applicazioni full-stack su piattaforme di hosting statico come GitHub Pages.

## Descrizione Approfondita del Progetto
L'App di News è una Single Page Application (SPA) che permette agli utenti di cercare e visualizzare articoli di notizie da diverse fonti. Per accedere alla sezione delle notizie, gli utenti devono prima effettuare il login.

Il backend per l'autenticazione è stato implementato utilizzando json-server con l'estensione json-server-auth, deployato su Render.com. Questo consente una gestione realistica del processo di login/registrazione con generazione di token, superando le limitazioni dei server statici.

Una delle sfide principali affrontate è stata la limitazione delle API gratuite di NewsAPI, che spesso non consentono l'uso da domini pubblici (come GitHub Pages) o richiedono l'esposizione della chiave API nel frontend. Questo problema è stato risolto implementando un "Proxy Backend" sul servizio Render.com esistente, che agisce da intermediario sicuro per le richieste a NewsAPI.

Infine, per garantire il corretto funzionamento del routing su GitHub Pages e risolvere i problemi di refresh della pagina (che altrimenti porterebbero a errori 404), è stata adottata la HashLocationStrategy in Angular. La chiave API di NewsAPI è gestita in modo sicuro come variabile d'ambiente su Render.com.

## Credenziali di Accesso per Test
Per accedere e testare le funzionalità di login:

- Email: test@test.it

- Password: adminadmin

## Tecnologie Utilizzate
### Frontend (Angular - Standalone Components)
- Angular: Framework principale per lo sviluppo dell'applicazione (utilizzando la configurazione Standalone).

- TypeScript: Linguaggio di programmazione per lo sviluppo di Angular.

- HTML: Struttura dei componenti e dei template.

- CSS: Styling dei componenti.

- Angular Router: Per la gestione della navigazione tra le diverse pagine/viste dell'applicazione (home, login, news).

- Angular Forms (Reactive Forms): Per la gestione del form di login e del form di ricerca notizie.

- Angular HttpClient: Per effettuare richieste HTTP all'API esterna (sia al backend di autenticazione che al proxy per NewsAPI).

- RxJS: Per la gestione dei flussi di dati asincroni (es. chiamate API, autenticazione).

- Bootstrap 5: Framework CSS utilizzato per il layout responsivo e lo stile dei componenti (es. navbar, card, table, btn, form-control).

- HashLocationStrategy: Strategia di routing di Angular per la compatibilità con server statici.

- CleanContentPipe: Una pipe custom per troncare e pulire il contenuto degli articoli.

### Backend (json-server su Render.com)
- Node.js: Ambiente di runtime per eseguire il server.

- json-server: Libreria Node.js per creare rapidamente API RESTful da un file JSON.

- json-server-auth: Estensione per json-server che aggiunge funzionalità di autenticazione (login/registrazione con JWT).

- cors: Middleware Node.js per abilitare il Cross-Origin Resource Sharing.

- node-fetch: Per effettuare richieste HTTP dal backend al NewsAPI.

- Render.com: Piattaforma cloud utilizzata per il deployment del backend, fornendo un URL pubblico e persistente.

- NewsAPI: API esterna per il recupero di notizie.

## Funzionalità Principali
- Autenticazione Utente: Gli utenti devono effettuare il login con credenziali valide per accedere alla sezione delle notizie. Il token di autenticazione viene memorizzato in localStorage.

- Protezione delle Rotte: Un AuthGuard impedisce l'accesso alla pagina delle notizie senza un token di autenticazione valido, reindirizzando l'utente alla pagina di login.

- Ricerca Notizie: Un form permette agli utenti di cercare articoli di notizie tramite una parola chiave.

- Visualizzazione Notizie: I risultati della ricerca vengono visualizzati in una tabella con dettagli come immagine, fonte, autore, titolo, descrizione, URL, data di pubblicazione e contenuto troncato.

- Ordinamento Notizie: Le notizie vengono ordinate per data di pubblicazione (dalla più recente).

- Home Page Accattivante: Una pagina di benvenuto con un'immagine di sfondo e testo introduttivo.

- Gestione Dati con Servizi: La logica di autenticazione e il recupero delle notizie sono incapsulati in servizi Angular dedicati.

## Sfide e Soluzioni Implementate
Questo progetto ha affrontato e risolto diverse problematiche comuni nello sviluppo e deployment di applicazioni web:

1. Deployment del Backend su Hosting Statico (GitHub Pages)

- Problema: GitHub Pages ospita solo file statici e non supporta un backend dinamico come json-server.

- Soluzione: Il backend json-server è stato deployato su Render.com, ottenendo un URL pubblico e persistente. L'applicazione Angular si connette a questo URL.

2. Problemi di CORS (Cross-Origin Resource Sharing)

- Problema: Quando il frontend (su GitHub Pages) tenta di comunicare con il backend (su Render.com), i browser bloccano le richieste per motivi di sicurezza (Same-Origin Policy).

- Soluzione: Il middleware cors è stato configurato esplicitamente nel server.js del backend, permettendo le richieste dal dominio di GitHub Pages.

3. Autenticazione Reale con JSON Server

- Problema: json-server di base non gestisce un processo di login/registrazione che restituisca un token e verifichi le credenziali.

- Soluzione: È stata integrata la libreria json-server-auth nel backend, che aggiunge endpoint /login e /register e gestisce l'autenticazione basata su token JWT.

4. Limitazioni delle API Esterne (NewsAPI - Uso da Domini Pubblici)

- Problema: Le API gratuite come NewsAPI spesso limitano le richieste da domini pubblici (es. GitHub Pages) o richiedono che la chiave API sia esposta nel codice frontend.

- Soluzione: È stato implementato un "Proxy Backend" sul servizio Render.com esistente. L'applicazione Angular effettua richieste al proxy sul backend di Render, il quale a sua volta inoltra la richiesta a NewsAPI con la chiave API. Questo nasconde la chiave e aggira le restrizioni di dominio.

5. Gestione Sicura della Chiave API

- Problema: Esporre la chiave API direttamente nel codice frontend o backend è una vulnerabilità di sicurezza.

- Soluzione: La chiave API di NewsAPI è stata configurata come variabile d'ambiente (NEWS_API_KEY) su Render.com. Il backend (server.js) recupera la chiave da questa variabile, mantenendola al sicuro e non hardcodata.

6. Problema della Pagina 404 su GitHub Pages con Routing di Angular

- Problema: I server statici come GitHub Pages non sanno come gestire le rotte interne delle SPA. Un refresh della pagina su una rotta diversa dalla root (/) risulterebbe in un errore 404.

- Soluzione: È stata adottata la HashLocationStrategy in Angular (app.config.ts). Questo modifica gli URL aggiungendo un # (es. yourdomain.com/#/news), rendendo il routing compatibile con qualsiasi server statico e risolvendo i problemi di refresh.

## Contenuto del Repository Backend (news-api-backend)
Il repository del backend contiene i seguenti file essenziali per il funzionamento del json-server con autenticazione e proxy:

### db.json
Questo file funge da database per il json-server, definendo la struttura e i dati iniziali degli utenti. Le password sono hashate.

{
  "users": [
    {
      "email": "test@test.it",
      "password": "$2a$10$X7aJE4WS71vr98XtZ4Y5JuuFNFH0bdjE7iv3XHETFMLhSg0SWq7/u",
      "id": 1
    },
    {
      "email": "valentinaventuro@libero.it",
      "password": "$2a$10$TX3oyTNzUoY1SjoeO7M6ROyjS9LNz2bY3hp1jIqnNyMQ/HMFAB.W2",
      "id": 2
    },
    {
      "email": "mariorossi@test.it",
      "password": "$2a$10$0IMsiciEfMEZ.0j3VXstKe3PD44fwIyRQ3.Qxkb65LM6SoDvsdukW",
      "id": 3
    }
  ]
}

### package.json
Definisce le dipendenze del progetto backend e lo script di avvio.

{
  "name": "news-api-backend",
  "version": "1.0.0",
  "description": "JSON Server for News App",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "bcryptjs": "^3.0.2",
    "cors": "^2.8.5",
    "json-server": "^0.17.0",
    "json-server-auth": "^2.1.0",
    "node-fetch": "^2.7.0"
  }
}

### server.js
Questo script configura e avvia il json-server. Include l'autenticazione (json-server-auth), il middleware cors e l'endpoint proxy per NewsAPI, recuperando la chiave API da una variabile d'ambiente.

const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');
const fetch = require('node-fetch');

// Configurazione CORS esplicita per permettere richieste dal dominio di GitHub Pages
const corsOptions = {
  origin: ['https://valevent.github.io'], // Sostituisci con il tuo dominio GitHub Pages
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

server.use(cors(corsOptions));
server.use(middlewares);

// Abilita json-server-auth
server.db = router.db;
server.use(auth);

// =========================================================
// NUOVO: Endpoint Proxy per le News API
// =========================================================
const NEWS_API_URL = 'https://newsapi.org/v2/everything';
const NEWS_API_KEY = process.env.NEWS_API_KEY; // Recupera la chiave API da una variabile d'ambiente

server.get('/proxy-news', async (req, res) => {
  try {
    const keyword = req.query.q;
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword parameter (q) is required.' });
    }

    // Costruisci l'URL per l'API di notizie esterna
    const params = new URLSearchParams({
      q: keyword,
      sortBy: 'popularity',
      apiKey: NEWS_API_KEY
    });

    const response = await fetch(`${NEWS_API_URL}?${params.toString()}`);
    if (!response.ok) {
      const errorData = await response.json();
      console.error('External News API Error:', response.status, errorData);
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).json({ error: 'Internal server error during news fetch.' });
  }
});
// =========================================================

server.use(router); // Utilizza il router di json-server per le altre risorse (es. /users)

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});

## Come Avviare il Progetto
Questo progetto richiede l'esecuzione sia del frontend (applicazione Angular) che del backend (JSON Server deployato).

### Prerequisiti
- Node.js (versione LTS raccomandata)

- npm (Node Package Manager) o Yarn

- Angular CLI: Installa globalmente Angular CLI se non lo hai già fatto:

npm install -g @angular/cli

### Installazione e Deployment del Backend (JSON Server su Render.com)
Il backend è già deployato su Render.com all'indirizzo: https://news-api-backend-xj9y.onrender.com.
L'endpoint per l'autenticazione è https://news-api-backend-xj9y.onrender.com/login.
L'endpoint proxy per le news è https://news-api-backend-xj9y.onrender.com/proxy-news.

Se desideri replicare il deployment o modificare il backend:

1. Clona il repository del backend:

git clone https://github.com/ValeVent/news-api-backend.git
cd news-api-backend

(Sostituisci ValeVent/news-api-backend.git con il tuo repository se lo hai forkato).

2. Installa le dipendenze del backend:

npm install

3. Configura la Chiave API (Cruciale per il Proxy NewsAPI):
Quando deploy su Render.com (o servizi simili), devi impostare la tua chiave NewsAPI come variabile d'ambiente.

- Ottieni la tua chiave API da NewsAPI.org.

- Su Render.com, vai alle impostazioni del tuo servizio web (o "Environment" settings) e aggiungi una nuova variabile d'ambiente:

   - Key: NEWS_API_KEY

   - Value: TUA_CHIAVE_API_DI_NEWSAPI (sostituisci con la tua chiave reale)

4. Deploy su Render.com:

- Crea un account su Render.com.

- Crea un nuovo "Web Service".

- Connetti il tuo repository GitHub del backend (news-api-backend).

- Configura il "Build Command" (es. npm install) e lo "Start Command" (es. node server.js).

- Render.com assegnerà un URL pubblico al tuo backend. Assicurati che l'URL del tuo frontend Angular (src/app/services/auth.service.ts e src/app/services/news.service.ts) punti a questo URL base di Render. Nel codice fornito, è già impostato a https://news-api-backend-xj9y.onrender.com.

### Installazione e Avvio del Frontend (Applicazione Angular)
1. Clona il repository del frontend:

git clone https://github.com/ValeVent/news-api-con-autenticazione.git
cd news-api-con-autenticazione

(Sostituisci ValeVent/news-api-con-autenticazione.git con il tuo repository se lo hai forkato).

2. Installa le dipendenze del frontend:

npm install

3. Verifica URL del Backend: Assicurati che i file dei servizi (src/app/services/auth.service.ts e src/app/services/news.service.ts) contengano l'URL corretto del tuo backend deployato su Render.com:

- auth.service.ts: https://news-api-backend-xj9y.onrender.com/login

- news.service.ts: https://news-api-backend-xj9y.onrender.com/proxy-news

4. Avvia il server di sviluppo Angular:

ng serve

5. Apri il tuo browser web e naviga su http://localhost:4200/.

## Stato del Progetto
Questo progetto è un'applicazione Angular completa e funzionale che dimostra l'integrazione con API esterne complesse, l'implementazione di un sistema di autenticazione robusto, la gestione di proxy backend e la risoluzione di sfide comuni di deployment. È un ottimo esempio di come costruire applicazioni web dinamiche e sicure.

## Contatti
- GitHub (Frontend): https://github.com/ValeVent/news-api-con-autenticazione

- GitHub (Backend): https://github.com/ValeVent/news-api-backend

- LinkedIn: https://www.linkedin.com/in/valentina-venturo

- Sito Web: http://www.valentinaventuro.it

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.12.

