## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** per lo stile
- Dati attualmente **mock in memoria** (`lib/data.ts`) — pronti per essere
  sostituiti da **Supabase** senza toccare i componenti

## Come avviarlo

```bash
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

> Nota: con i dati mock in memoria, ogni riavvio del server (`npm run dev`)
> resetta le transazioni ai valori di esempio iniziali. È previsto — è uno
> stadio temporaneo prima di collegare Supabase.

## Struttura del progetto

```
family-finance/
│
├── app/
│   ├── layout.tsx                → layout globale: sidebar + header fissi, font
│   ├── page.tsx                  → route "/" → contenuto Expenses
│   ├── globals.css
│   ├── projections/page.tsx      → route "/projections" → placeholder
│   └── targets/page.tsx          → route "/targets" → placeholder
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx           → navigazione laterale (Expenses/Projections/Targets)
│   │   └── AppHeader.tsx         → wrapper che mostra WealthHeader, montato nel layout
│   ├── dashboard/
│   │   ├── ExpensesView.tsx      → contenuto della sezione Expenses (tabella + form)
│   │   ├── WealthHeader.tsx      → patrimonio totale + variazioni %
│   │   ├── TransactionTable.tsx  → tabella spese/entrate
│   │   ├── TransactionForm.tsx   → form aggiunta/modifica
│   │   ├── ConfirmDeleteDialog.tsx
│   │   └── SetInitialWealthDialog.tsx
│   └── ui/
│       ├── Button.tsx            → bottone generico riutilizzabile
│       └── Modal.tsx             → modale generico riutilizzabile
│
├── lib/
│   ├── data.ts                   → layer dati (oggi mock, domani Supabase)
│   ├── format.ts                 → formattazione valuta/data/frequenza
│   ├── wealth-context.tsx        → React Context: patrimonio/membri condivisi tra le pagine
│   └── supabase.ts                → client Supabase, pronto ma non ancora usato
│
├── types/
│   └── finance.ts                → tipi condivisi (Transaction, FamilyMember, ecc.)
│
└── supabase-schema.sql           → schema SQL pronto per la migrazione
```

## Funzionalità incluse

1. Dashboard con lista spese/entrate
2. Aggiunta, modifica, eliminazione di spese ed entrate
3. Ogni transazione ha: importo, data, descrizione, persona (membro famiglia)
4. Possibilità di marcare una transazione come ricorrente, con frequenza
   (settimanale / mensile / trimestrale / annuale)
5. Header con patrimonio totale calcolato in tempo reale
6. Dialog per impostare il patrimonio iniziale e la data da cui calcolarlo
7. Il patrimonio si aggiorna automaticamente ad ogni aggiunta/modifica/
   eliminazione di una transazione

Le percentuali Month/Quarter/Year nell'header sono **placeholder statici**
per ora (verranno calcolate realmente quando costruiremo la sezione
"Projections").

I membri famiglia sono gestiti in `lib/data.ts` (`getMembers`, `addMember`,
`deleteMember`) — oggi senza una UI dedicata nelle impostazioni, ma le
funzioni sono già pronte per essere collegate a una schermata "Impostazioni"
quando vorrai aggiungerla.

## Prossimo step: collegare Supabase

1. Crea un progetto su [supabase.com](https://supabase.com)
2. Esegui `supabase-schema.sql` nel SQL Editor di Supabase
3. Copia `.env.local.example` in `.env.local` e inserisci le credenziali
4. Sostituisci il corpo delle funzioni in `lib/data.ts` con chiamate a
   `supabase.from(...)` (il client è già pronto in `lib/supabase.ts`)
5. Nessun componente dovrà cambiare: chiamano tutti le stesse funzioni
   esportate da `lib/data.ts`

## Comandi utili

| Comando | Cosa fa |
|---|---|
| `npm run dev` | Avvia in locale con hot reload |
| `npm run build` | Builda per produzione |
| `npm run start` | Avvia la build di produzione in locale |
| `npm run lint` | Controlla il codice con ESLint |
