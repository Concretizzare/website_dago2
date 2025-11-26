# Changelog

Tutte le modifiche significative al progetto sono documentate in questo file.

---

## [1.0.0] - 2024-11-25

### Aggiunto
- Pagina catalogo prodotti con griglia responsive
- Sistema filtri funzionante (categoria, marchio, potenza, classe energetica)
- Pagina dettaglio prodotto Larissa con tutte le specifiche
- Zoom immagine in-place (desktop: segue mouse, mobile: segue tap)
- Integrazione WhatsApp con messaggi preimpostati per CTA prodotto
- Menu mobile con hamburger
- Sidebar filtri responsive per mobile/tablet
- Icona WhatsApp floating
- Tab specifiche tecniche, caratteristiche e documenti
- Download PDF scheda tecnica e etichetta energetica
- Selezione colore prodotto

### Design
- Palette colori Deep Navy + Warm Bronze
- Font: Playfair Display (titoli) + Inter (body)
- Layout responsive per desktop, tablet e mobile
- Footer con sfondo blu coerente con header

### Struttura
- `index.html` - Homepage (catalogo)
- `prodotti.html` - Catalogo prodotti
- `prodotto-larissa.html` - Dettaglio Larissa
- `css/catalogo.css` - Stili catalogo
- `css/prodotto.css` - Stili pagina prodotto
- `js/catalogo.js` - Script filtri e interazioni

---

## Note di sviluppo

### Convenzioni commit
- Messaggi in inglese, concisi
- Nessun riferimento a strumenti AI

### File da mantenere sincronizzati
- `index.html` e `prodotti.html` devono essere identici
- Dopo modifiche al catalogo, copiare `prodotti.html` su `index.html`

### Testing
- Testare sempre su desktop e mobile
- Verificare filtri con diverse combinazioni
- Testare zoom immagine su touch device
