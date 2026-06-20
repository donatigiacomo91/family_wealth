'use client';

import { useEffect, useState } from 'react';
import { TransactionTable } from '@/components/dashboard/TransactionTable';
import { TransactionForm } from '@/components/dashboard/TransactionForm';
import { ConfirmDeleteDialog } from '@/components/dashboard/ConfirmDeleteDialog';
import { SetInitialWealthDialog } from '@/components/dashboard/SetInitialWealthDialog';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useWealth } from '@/lib/wealth-context';
import * as data from '@/lib/data';
import type { Transaction, TransactionInput } from '@/types/finance';

export function ExpensesView() {
  const { members, wealthSnapshot, isLoading: isWealthLoading, refreshAll } = useWealth();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingTransaction, setDeletingTransaction] = useState<Transaction | null>(null);
  const [isWealthDialogOpen, setIsWealthDialogOpen] = useState(false);

  async function refreshTransactions() {
    const txs = await data.getTransactions();
    setTransactions(txs);
  }

  useEffect(() => {
    refreshTransactions().finally(() => setIsLoadingTransactions(false));
  }, []);

  function openCreateForm() {
    setEditingTransaction(null);
    setIsFormOpen(true);
  }

  function openEditForm(transaction: Transaction) {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  }

  async function handleFormSubmit(input: TransactionInput) {
    if (editingTransaction) {
      await data.updateTransaction(editingTransaction.id, input);
    } else {
      await data.addTransaction(input);
    }
    setIsFormOpen(false);
    setEditingTransaction(null);
    await Promise.all([refreshTransactions(), refreshAll()]);
  }

  async function handleConfirmDelete() {
    if (!deletingTransaction) return;
    await data.deleteTransaction(deletingTransaction.id);
    setDeletingTransaction(null);
    await Promise.all([refreshTransactions(), refreshAll()]);
  }

  async function handleSetInitialWealth(amount: number, date: string) {
    await data.setInitialWealth(amount, date);
    await refreshAll();
  }

  if (isLoadingTransactions || isWealthLoading || !wealthSnapshot) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-ink-400">
        Caricamento...
      </div>
    );
  }

  return (
    <section className="rounded-xl border border-ink-200 bg-white shadow-panel">
      <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
        <h1 className="font-serif text-lg font-medium text-ink-900">Spese ed entrate</h1>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => setIsWealthDialogOpen(true)}>
            Patrimonio iniziale
          </Button>
          <Button variant="primary" onClick={openCreateForm}>
            + Aggiungi
          </Button>
        </div>
      </div>

      <div className="px-5 py-2">
        <TransactionTable
          transactions={transactions}
          members={members}
          onEdit={openEditForm}
          onDelete={setDeletingTransaction}
        />
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingTransaction ? 'Modifica transazione' : 'Nuova transazione'}
      >
        <TransactionForm
          members={members}
          initialValue={editingTransaction ?? undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>

      <ConfirmDeleteDialog
        transaction={deletingTransaction}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingTransaction(null)}
      />

      <SetInitialWealthDialog
        isOpen={isWealthDialogOpen}
        currentSnapshot={wealthSnapshot}
        onSubmit={handleSetInitialWealth}
        onClose={() => setIsWealthDialogOpen(false)}
      />
    </section>
  );
}
