'use client';

import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { formatCurrencySigned } from '@/lib/format';
import type { Transaction } from '@/types/finance';

interface ConfirmDeleteDialogProps {
  transaction: Transaction | null;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export function ConfirmDeleteDialog({
  transaction,
  onConfirm,
  onCancel,
}: ConfirmDeleteDialogProps) {
  return (
    <Modal isOpen={transaction !== null} onClose={onCancel} title="Eliminare questa voce?">
      {transaction && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-ink-600">
            <span className="font-medium text-ink-800">{transaction.description}</span> ·{' '}
            <span
              className={
                transaction.type === 'income' ? 'text-sage-600' : 'text-terracotta-500'
              }
            >
              {formatCurrencySigned(transaction.amount, transaction.type)}
            </span>
            {' '}— questa azione non può essere annullata e il patrimonio verrà ricalcolato.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onCancel}>
              Annulla
            </Button>
            <Button variant="danger" onClick={onConfirm}>
              Elimina
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
