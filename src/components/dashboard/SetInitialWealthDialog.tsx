'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import type { WealthSnapshot } from '@/types/finance';

interface SetInitialWealthDialogProps {
  isOpen: boolean;
  currentSnapshot: WealthSnapshot;
  onSubmit: (amount: number, date: string) => Promise<void>;
  onClose: () => void;
}

export function SetInitialWealthDialog({
  isOpen,
  currentSnapshot,
  onSubmit,
  onClose,
}: SetInitialWealthDialogProps) {
  const [amount, setAmount] = useState(String(currentSnapshot.initialAmount));
  const [date, setDate] = useState(currentSnapshot.initialDate);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = Number(amount.replace(',', '.'));
    if (Number.isNaN(parsed)) {
      setError('Inserisci un importo valido.');
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit(parsed, date);
      onClose();
    } catch {
      setError('Si è verificato un errore. Riprova.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Patrimonio iniziale">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <p className="text-sm text-ink-500">
          Il patrimonio attuale viene calcolato a partire da questo valore, aggiungendo le
          entrate e sottraendo le spese registrate da questa data in avanti.
        </p>

        <div>
          <label htmlFor="initial-amount" className="mb-1 block text-sm font-medium text-ink-700">
            Importo (€)
          </label>
          <input
            id="initial-amount"
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-ink-200 px-3 py-2 font-mono text-base focus:border-sage-400 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="initial-date" className="mb-1 block text-sm font-medium text-ink-700">
            A partire dal
          </label>
          <input
            id="initial-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-ink-200 px-3 py-2 text-base focus:border-sage-400 focus:outline-none"
          />
        </div>

        {error && <p className="text-sm text-terracotta-500">{error}</p>}

        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Annulla
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Salvataggio...' : 'Salva'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
