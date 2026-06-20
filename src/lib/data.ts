import { v4 as uuidv4 } from 'uuid';
import type {
  FamilyMember,
  Transaction,
  TransactionInput,
  WealthSnapshot,
} from '@/types/finance';

// ---------------------------------------------------------------------------
// STORE IN MEMORIA
// ---------------------------------------------------------------------------
// Questo file simula un database. Ogni funzione è async e ritorna Promise,
// esattamente come farebbe una chiamata a Supabase. Quando collegheremo
// il database vero, sostituiremo solo il CORPO di queste funzioni:
// i componenti che le chiamano (dashboard, form, ecc.) non cambiano.
//
// I dati vivono in variabili module-level: si resettano ad ogni reload
// del server (es. ogni hot-reload in sviluppo). È previsto: è solo
// uno stadio intermedio prima di Supabase.
// ---------------------------------------------------------------------------

let members: FamilyMember[] = [
  { id: 'm-giacomo', name: 'Giacomo', color: '#4F7733' },
  { id: 'm-family', name: 'Family', color: '#736B58' },
];

let transactions: Transaction[] = [
  {
    id: uuidv4(),
    amount: 2400,
    type: 'income',
    description: 'Salary',
    date: '2026-03-28',
    memberId: 'm-giacomo',
    isRecurring: true,
    frequency: 'monthly',
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    amount: 400,
    type: 'expense',
    description: 'Car Loan',
    date: '2026-03-03',
    memberId: 'm-giacomo',
    isRecurring: true,
    frequency: 'monthly',
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    amount: 92,
    type: 'expense',
    description: 'Restaurant',
    date: '2026-03-01',
    memberId: 'm-family',
    isRecurring: false,
    frequency: null,
    createdAt: new Date().toISOString(),
  },
];

let wealthSnapshot: WealthSnapshot = {
  initialAmount: 10992,
  initialDate: '2026-01-01',
};

// Piccola latenza artificiale per ricordarci che in futuro queste chiamate
// saranno chiamate di rete reali — aiuta a non scrivere codice che assume
// risposte sincrone istantanee.
const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

// ---------------------------------------------------------------------------
// MEMBRI FAMIGLIA
// ---------------------------------------------------------------------------

export async function getMembers(): Promise<FamilyMember[]> {
  await delay();
  return [...members];
}

export async function addMember(name: string, color: string): Promise<FamilyMember> {
  await delay();
  const newMember: FamilyMember = { id: uuidv4(), name, color };
  members = [...members, newMember];
  return newMember;
}

export async function deleteMember(id: string): Promise<void> {
  await delay();
  members = members.filter((m) => m.id !== id);
}

// ---------------------------------------------------------------------------
// TRANSAZIONI (spese / entrate)
// ---------------------------------------------------------------------------

export async function getTransactions(): Promise<Transaction[]> {
  await delay();
  // Ordine: più recenti prima
  return [...transactions].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function addTransaction(input: TransactionInput): Promise<Transaction> {
  await delay();
  const newTransaction: Transaction = {
    id: uuidv4(),
    ...input,
    createdAt: new Date().toISOString(),
  };
  transactions = [...transactions, newTransaction];
  return newTransaction;
}

export async function updateTransaction(
  id: string,
  input: TransactionInput
): Promise<Transaction> {
  await delay();
  let updated: Transaction | undefined;
  transactions = transactions.map((t) => {
    if (t.id === id) {
      updated = { ...t, ...input };
      return updated;
    }
    return t;
  });
  if (!updated) {
    throw new Error(`Transazione con id ${id} non trovata`);
  }
  return updated;
}

export async function deleteTransaction(id: string): Promise<void> {
  await delay();
  transactions = transactions.filter((t) => t.id !== id);
}

// ---------------------------------------------------------------------------
// PATRIMONIO
// ---------------------------------------------------------------------------

export async function getWealthSnapshot(): Promise<WealthSnapshot> {
  await delay();
  return { ...wealthSnapshot };
}

export async function setInitialWealth(amount: number, date: string): Promise<WealthSnapshot> {
  await delay();
  wealthSnapshot = { initialAmount: amount, initialDate: date };
  return { ...wealthSnapshot };
}

/**
 * Calcola il patrimonio attuale: patrimonio iniziale + somma di tutte le
 * entrate - somma di tutte le spese registrate dopo (o nella) data iniziale.
 */
export async function getCurrentWealth(): Promise<number> {
  const [snapshot, txs] = await Promise.all([getWealthSnapshot(), getTransactions()]);
  const delta = txs.reduce((acc, t) => {
    if (t.date < snapshot.initialDate) return acc;
    return acc + (t.type === 'income' ? t.amount : -t.amount);
  }, 0);
  return snapshot.initialAmount + delta;
}
