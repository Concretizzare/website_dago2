# D'Agostino - Catalogo Stufe e Caldaie

Sito web per D'Agostino Giovanni e Marco - Assistenza tecnica caldaie e stufe dal 1994.

## Indice

- [Struttura del progetto](#struttura-del-progetto)
- [Pagine](#pagine)
- [Funzionalità](#funzionalità)
- [Stile e Design](#stile-e-design)
- [Prodotti](#prodotti)
- [Configurazione WhatsApp](#configurazione-whatsapp)
- [Come aggiungere un nuovo prodotto](#come-aggiungere-un-nuovo-prodotto)
- [Deployment](#deployment)
- [Contatti azienda](#contatti-azienda)

---

## Struttura del progetto

```
Website_dago-main/
├── css/
│   ├── catalogo.css      # Stili pagina catalogo e componenti comuni
│   ├── prodotto.css      # Stili pagina dettaglio prodotto
│   └── style.css         # Stili homepage originale (non utilizzato)
├── js/
│   ├── catalogo.js       # Script catalogo: filtri, menu mobile, animazioni
│   └── script.js         # Script homepage originale (non utilizzato)
├── media/                # Immagini e PDF prodotti
│   ├── Larissa HR 1.webp
│   ├── 004301605-001 BC LARISSA.16.pdf (Scheda tecnica)
│   ├── 004301731-001 EB LARISSA.16.pdf (Etichetta energetica)
│   └── hero-cover.jpg
├── foto/                 # Logo e immagini brand
│   ├── logo.png
│   ├── noridca.png
│   ├── dielle.png
│   ├── nobis.png
│   ├── moretti.png
│   ├── ter.jpeg
│   └── dale.jpeg
├── index.html            # Homepage (redirect a catalogo)
├── prodotti.html         # Pagina catalogo prodotti
├── prodotto-larissa.html # Pagina dettaglio prodotto Larissa
├── README.md             # Questa documentazione
└── CHANGELOG.md          # Storico modifiche
```

---

## Pagine

### 1. Catalogo (`index.html` / `prodotti.html`)
- Griglia prodotti con card
- Sistema filtri laterale (categoria, marchio, potenza, classe energetica)
- Filtri responsive con sidebar mobile
- Conteggio prodotti dinamico
- Prodotti "In arrivo" come placeholder

### 2. Dettaglio Prodotto (`prodotto-larissa.html`)
- Galleria immagini con zoom in-place
- Specifiche tecniche in tab
- Caratteristiche prodotto
- Documenti scaricabili (PDF)
- CTA WhatsApp con messaggio preimpostato
- Selezione colore

---

## Funzionalità

### Sistema Filtri
- **Categoria**: Stufe a Legna, Pellet, Termostufe, Caldaie
- **Marchio**: La Nordica, Dielle, Nobis, Thermital, Moretti Design, D'Alessandro
- **Potenza**: Fino a 6kW, 6-10kW, 10-15kW, Oltre 15kW
- **Classe Energetica**: A++, A+, A

I filtri funzionano con logica AND tra categorie diverse e OR dentro la stessa categoria.

### Zoom Immagine
- **Desktop**: click per attivare, muovi mouse per spostare punto di zoom, click per disattivare
- **Mobile/Tablet**: tap per attivare zoom sul punto toccato, tap per disattivare

### Menu Mobile
- Hamburger menu per navigazione
- Sidebar filtri con overlay

---

## Stile e Design

### Palette Colori
```css
/* Primary - Deep Navy */
--primary-900: #0a1628;
--primary-800: #0f2744;
--primary-700: #153660;
--primary-600: #1a4480;
--primary-500: #1e5299;

/* Accent - Warm Bronze */
--accent-500: #b45309;
--accent-400: #d97706;

/* WhatsApp */
--whatsapp: #25d366;
```

### Font
- **Display**: Playfair Display (titoli)
- **Body**: Inter (testo)

### Breakpoints Responsive
- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px
- Small Mobile: < 480px

---

## Prodotti

### Larissa (La Nordica Extraflame)
- **Categoria**: Stufa a Legna
- **Potenza**: 5,1 - 9,3 kW
- **Rendimento**: 86,9%
- **Classe Energetica**: A+
- **Certificazione**: 5 Stelle DM 186
- **Dimensioni**: 628 x 1226 x 483 mm
- **Peso**: 202 kg
- **Colori disponibili**: Antracite, Bordeaux

---

## Configurazione WhatsApp

### Numero aziendale
`+39 346 808 8624` (Marco)

### Messaggi preimpostati
Solo i pulsanti CTA nella pagina prodotto hanno messaggio preimpostato:

```
Salve, scrivo per informazioni riguardo [Brand] [Prodotto], dal sito assistenzadagostino.it
```

Esempio per Larissa:
```
Salve, scrivo per informazioni riguardo La Nordica Extraflame Larissa, dal sito assistenzadagostino.it
```

I pulsanti nell'header, menu mobile e floating NON hanno messaggio preimpostato.

---

## Come aggiungere un nuovo prodotto

### 1. Preparare i file
- Immagine prodotto (formato .webp consigliato) → `media/`
- Scheda tecnica PDF → `media/`
- Etichetta energetica PDF → `media/`

### 2. Creare pagina prodotto
Duplicare `prodotto-larissa.html` e modificare:
- Titolo pagina e meta description
- Dati prodotto (nome, brand, specifiche)
- Immagini e documenti
- Link WhatsApp con messaggio corretto

### 3. Aggiungere card nel catalogo
In `prodotti.html` e `index.html`, aggiungere nella sezione `products-grid`:

```html
<article class="product-card" data-category="[categoria]" data-brand="[brand]" data-power="[potenza]" data-energy="[classe]">
    <a href="prodotto-[nome].html" class="product-link">
        <div class="product-image">
            <span class="product-badge available">Disponibile</span>
            <img src="media/[immagine].webp" alt="[descrizione]" loading="lazy">
        </div>
        <div class="product-info">
            <span class="product-brand">[Brand]</span>
            <h3 class="product-name">[Nome]</h3>
            <p class="product-category">[Tipo prodotto]</p>
            <div class="product-specs">
                <div class="spec">
                    <i class="fas fa-fire"></i>
                    <span>[potenza] kW</span>
                </div>
                <div class="spec">
                    <i class="fas fa-chart-line"></i>
                    <span>[rendimento]%</span>
                </div>
                <div class="spec energy-class">
                    <span>[classe]</span>
                </div>
            </div>
            <div class="product-footer">
                <span class="view-details">Scopri di più <i class="fas fa-arrow-right"></i></span>
            </div>
        </div>
    </a>
</article>
```

### Valori data-attributes
- `data-category`: legna, pellet, termostufe, caldaie
- `data-brand`: nordica, dielle, nobis, thermital, moretti, dalessandro
- `data-power`: 0-6, 6-10, 10-15, 15+
- `data-energy`: a++, a+, a

### 4. Aggiornare conteggi filtri
Aggiornare i numeri in `<span class="option-count">` nella sidebar filtri.

---

## Deployment

### GitHub Pages
- **Repository**: https://github.com/Concretizzare/website_dago2
- **URL Live**: https://concretizzare.github.io/website_dago2/

### Server locale (sviluppo)
```bash
cd Website_dago-main
python -m http.server 8080
```
Apri http://localhost:8080

---

## Contatti azienda

**D'Agostino Giovanni e Marco**
- Giovanni: 328 339 4184
- Marco: 346 808 8624
- Indirizzo: Via Valle Vignale, 64024 Notaresco (TE)
- P.IVA: 01979250675
