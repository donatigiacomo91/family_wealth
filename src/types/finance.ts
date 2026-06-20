// Tipi di dominio condivisi da tutta l'applicazione.
// Quando in futuro collegheremo Supabase, queste interfacce restano
// le stesse: cambierà solo l'implementazione delle funzioni in lib/data.ts.

export type TransactionType = 'expense' | 'income';

export type RecurrenceFrequency = 'weekly' | 'monthly' | 'quarterly' | 'yearly';

export interface FamilyMember {
  id: string;
  name: string;
  /** colore usato per badge/avatar nelle liste, es. "#699449" */
  color: string;
}

export interface Transaction {
  id: string;
  /** sempre positivo: il segno è dato da `type`, non dal valore */
  amount: number;
  type: TransactionType;
  description: string;
  /** ISO date string, es. "2026-03-28" */
  date: string;
  /** id del FamilyMember che ha effettuato la spesa/entrata */
  memberId: string;
  isRecurring: boolean;
  frequency: RecurrenceFrequency | null;
  createdAt: string;
}

/** Payload usato dal form per creare o modificare una transazione */
export interface TransactionInput {
  amount: number;
  type: TransactionType;
  description: string;
  date: string;
  memberId: string;
  isRecurring: boolean;
  frequency: RecurrenceFrequency | null;
}

export interface WealthSnapshot {
  /** patrimonio impostato manualmente come punto di partenza */
  initialAmount: number;
  /** data da cui si conta il patrimonio iniziale */
  initialDate: string;
}

/** Variazioni percentuali mostrate in header — per ora placeholder statici */
export interface WealthChange {
  month: number;
  quarter: number;
  year: number;
}
