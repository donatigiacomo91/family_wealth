import type { RecurrenceFrequency } from '@/types/finance';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencySigned(amount: number, type: 'income' | 'expense'): string {
  const sign = type === 'income' ? '+' : '−';
  const formatted = new Intl.NumberFormat('it-IT', {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${sign}${formatted} €`;
}

export function formatDate(isoDate: string): string {
  const d = new Date(isoDate);
  return new Intl.DateTimeFormat('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(d);
}

export function formatFrequency(frequency: RecurrenceFrequency | null): string {
  if (!frequency) return 'una tantum';
  const labels: Record<RecurrenceFrequency, string> = {
    weekly: 'settimanale',
    monthly: 'mensile',
    quarterly: 'trimestrale',
    yearly: 'annuale',
  };
  return labels[frequency];
}

export function formatPercent(value: number): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}
