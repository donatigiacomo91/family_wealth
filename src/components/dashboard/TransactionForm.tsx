'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/Button';
import type {
  FamilyMember,
  RecurrenceFrequency,
  Transaction,
  TransactionInput,
  TransactionType,
} from '@/types/finance';

interface TransactionFormProps {
  members: FamilyMember[];
  initialValue?: Transaction;
  onSubmit: (input: TransactionInput) => Promise<void>;
  onCancel: () => void;
}

const frequencyOptions: { value: RecurrenceFrequency; label: string }[] = [
  { value: 'weekly', label: 'Settimanale' },
  { value: 'monthly', label: 'Mensile' },
  { value: 'quarterly', label: 'Trimestrale' },
  { value: 'yearly', label: 'Annuale' },
];

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function TransactionForm({
  members,
  initialValue,
  onSubmit,
  onCancel,
}: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>(initialValue?.type ?? 'expense');
  const [amount, setAmount] = useState(initialValue ? String(initialValue.amount) : '');
  const [description, setDescription] = useState(initialValue?.description ?? '');
  const [date, setDate] = useState(initialValue?.date ?? todayIso());
  const [memberId, setMemberId] = useState(initialValue?.memberId ?? members[0]?.id ?? '');
  const [isRecurring, setIsRecurring] = useState(initialValue?.isRecurring ?? false);
  const [frequency, setFrequency] = useState<RecurrenceFrequency>(
    initialValue?.frequency ?? 'monthly'
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const parsedAmount = Number(amount.replace(',', '.'));
    if (!parsedAmount || parsedAmount <= 0) {
      setError("Inserisci un importo valido, maggiore di zero.");
      return;
    }
    if (!description.trim()) {
      setError('Inserisci una descrizione.');
      return;
    }
    if (!memberId) {
      setError('Seleziona chi ha effettuato questa operazione.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        amount: parsedAmount,
        type,
        description: description.trim(),
        date,
        memberId,
        isRecurring,
        frequency: isRecurring ? frequency : null,
      });
    } catch {
      setError('Si è verificato un errore. Riprova.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Tipo: spesa o entrata */}
      <div className="grid grid-cols-2 gap-2 rounded-lg bg-ink-50 p-1">
        <button
          type="button"
          onClick={() => setType('expense')}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            type === 'expense' ? 'bg-white text-terracotta-500 shadow-sm' : 'text-ink-500'
          }`}
        >
          Spesa
        </button>
        <button
          type="button"
          onClick={() => setType('income')}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            type === 'income' ? 'bg-white text-sage-600 shadow-sm' : 'text-ink-500'
          }`}
        >
          Entrata
        </button>
      </div>

      {/* Importo */}
      <div>
        <label htmlFor="amount" className="mb-1 block text-sm font-medium text-ink-700">
          Importo (€)
        </label>
        <input
          id="amount"
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          className="w-full rounded-lg border border-ink-200 px-3 py-2 font-mono text-base focus:border-sage-400 focus:outline-none"
        />
      </div>

      {/* Descrizione */}
      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-ink-700">
          Descrizione
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="es. Spesa al supermercato"
          className="w-full rounded-lg border border-ink-200 px-3 py-2 text-base focus:border-sage-400 focus:outline-none"
        />
      </div>

      {/* Data + Persona */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="date" className="mb-1 block text-sm font-medium text-ink-700">
            Data
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-ink-200 px-3 py-2 text-base focus:border-sage-400 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="member" className="mb-1 block text-sm font-medium text-ink-700">
            Effettuata da
          </label>
          <select
            id="member"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-base focus:border-sage-400 focus:outline-none"
          >
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ricorrenza */}
      <div className="rounded-lg border border-ink-200 p-3">
        <label className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-ink-700">Operazione ripetitiva</span>
          <input
            type="checkbox"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
            className="h-5 w-5 accent-sage-600"
          />
        </label>

        {isRecurring && (
          <div className="mt-3">
            <label htmlFor="frequency" className="mb-1 block text-sm font-medium text-ink-700">
              Frequenza
            </label>
            <select
              id="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as RecurrenceFrequency)}
              className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-base focus:border-sage-400 focus:outline-none"
            >
              {frequencyOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-terracotta-500">{error}</p>}

      <div className="mt-2 flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Annulla
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Salvataggio...' : initialValue ? 'Salva modifiche' : 'Aggiungi'}
        </Button>
      </div>
    </form>
  );
}
