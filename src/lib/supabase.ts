import { createClient } from '@supabase/supabase-js';

// Questo client non è ancora usato da nessun componente: l'app oggi
// gira su dati mock (lib/data.ts). Quando collegheremo Supabase davvero,
// sposteremo la logica di lib/data.ts a usare `supabase.from(...)`
// invece degli array in memoria — l'interfaccia delle funzioni resterà
// identica, quindi nessun componente dovrà cambiare.
//
// Richiede nel file .env.local:
//   NEXT_PUBLIC_SUPABASE_URL=...
//   NEXT_PUBLIC_SUPABASE_ANON_KEY=...

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
