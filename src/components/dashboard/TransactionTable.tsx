'use client';

import { formatCurrencySigned, formatDate, formatFrequency } from '@/lib/format';
import type { FamilyMember, Transaction } from '@/types/finance';

interface TransactionTableProps {
  transactions: Transaction[];
  members: FamilyMember[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

function memberName(members: FamilyMember[], memberId: string): string {
  return members.find((m) => m.id === memberId)?.name ?? 'Sconosciuto';
}

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M11.3 2.3a1.4 1.4 0 0 1 2 2L5 12.6 2 13.3l.7-3L11.3 2.3Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 4.5h10M6.5 4.5V3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1.5M4.5 4.5l.5 8a1 1 0 0 0 1 .9h4a1 1 0 0 0 1-.9l.5-8"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TransactionTable({
  transactions,
  members,
  onEdit,
  onDelete,
}: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
        <p className="text-base font-medium text-ink-700">Nessuna transazione</p>
        <p className="text-sm text-ink-400">
          Aggiungi la prima spesa o entrata per iniziare a tracciare il patrimonio.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {/* Header — visibile solo da tablet in su */}
      <div className="hidden grid-cols-[100px_1fr_120px_90px_110px_70px] gap-3 border-b border-ink-100 px-2 pb-3 text-sm text-ink-400 md:grid">
        <span>Amount</span>
        <span>Description</span>
        <span>Originator</span>
        <span>Date</span>
        <span>Frequency</span>
        <span className="text-right">Azioni</span>
      </div>

      <ul className="divide-y divide-ink-100">
        {transactions.map((t) => (
          <li
            key={t.id}
            className="grid grid-cols-2 gap-2 px-2 py-3 md:grid-cols-[100px_1fr_120px_90px_110px_70px] md:items-center md:gap-3"
          >
            <span
              className={`font-mono text-sm font-medium ${
                t.type === 'income' ? 'text-sage-600' : 'text-terracotta-500'
              }`}
            >
              {formatCurrencySigned(t.amount, t.type)}
            </span>

            <span className="order-3 text-sm text-ink-800 md:order-none">{t.description}</span>

            <span className="order-4 text-sm text-ink-600 md:order-none">
              {memberName(members, t.memberId)}
            </span>

            <span className="order-5 font-mono text-sm text-ink-500 md:order-none">
              {formatDate(t.date)}
            </span>

            <span className="order-6 text-sm text-ink-500 md:order-none">
              {t.isRecurring ? formatFrequency(t.frequency) : 'una tantum'}
            </span>

            <span className="order-2 flex justify-end gap-1 md:order-none">
              <button
                onClick={() => onEdit(t)}
                aria-label={`Modifica ${t.description}`}
                className="rounded-md p-1.5 text-ink-400 hover:bg-ink-50 hover:text-ink-700"
              >
                <EditIcon />
              </button>
              <button
                onClick={() => onDelete(t)}
                aria-label={`Elimina ${t.description}`}
                className="rounded-md p-1.5 text-ink-400 hover:bg-terracotta-50 hover:text-terracotta-500"
              >
                <TrashIcon />
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
