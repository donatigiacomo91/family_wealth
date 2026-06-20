'use client';

import { useEffect, useState } from 'react';
import { WealthHeader } from '@/components/dashboard/WealthHeader';
import { TransactionTable } from '@/components/dashboard/TransactionTable';
import { TransactionForm } from '@/components/dashboard/TransactionForm';
import { ConfirmDeleteDialog } from '@/components/dashboard/ConfirmDeleteDialog';
import { SetInitialWealthDialog } from '@/components/dashboard/SetInitialWealthDialog';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import * as data from '@/lib/data';
import type { FamilyMember, Transaction, TransactionInput, WealthSnapshot } from '@/types/finance';

// Placeholder statico, come deciso: verrà calcolato realmente nella
// sezione "Projections".
const STATIC_WEALTH_CHANGE = { month: -0.7, quarter: 2.5, year: 5.3 };

export function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [wealthSnapshot, setWealthSnapshot] = useState<WealthSnapshot | null>(null);
  const [currentWealth, setCurrentWealth] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingTransaction, setDeletingTransaction] = useState<Transaction | null>(null);
  const [isWealthDialogOpen, setIsWealthDialogOpen] = useState(false);

  async function refreshAll() {
    const [txs, mems, snapshot, wealth] = await Promise.all([
      data.getTransactions(),
      data.getMembers(),
      data.getWealthSnapshot(),
      data.getCurrentWealth(),
    ]);
    setTransactions(txs);
    setMembers(mems);
    setWealthSnapshot(snapshot);
    setCurrentWealth(wealth);
  }

  useEffect(() => {
    refreshAll().finally(() => setIsLoading(false));
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
    await refreshAll();
  }

  async function handleConfirmDelete() {
    if (!deletingTransaction) return;
    await data.deleteTransaction(deletingTransaction.id);
    setDeletingTransaction(null);
    await refreshAll();
  }

  async function handleSetInitialWealth(amount: number, date: string) {
    await data.setInitialWealth(amount, date);
    await refreshAll();
  }

  if (isLoading || !wealthSnapshot) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-ink-400">
        Caricamento...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <WealthHeader currentWealth={currentWealth} change={STATIC_WEALTH_CHANGE} />

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
      </section>

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
    </div>
  );
}
