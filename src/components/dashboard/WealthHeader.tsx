import { formatCurrency, formatPercent } from '@/lib/format';
import type { WealthChange } from '@/types/finance';

interface WealthHeaderProps {
  currentWealth: number;
  change: WealthChange;
  onEditInitialWealth?: () => void;
}

function ChangeBadge({ label, value }: { label: string; value: number }) {
  const isPositive = value > 0;
  const isNegative = value < 0;

  const colorClass = isPositive
    ? 'text-sage-600'
    : isNegative
      ? 'text-terracotta-500'
      : 'text-ink-400';

  return (
    <span className="flex items-baseline gap-1.5 whitespace-nowrap">
      <span className="text-sm text-ink-400">{label}</span>
      <span className={`font-mono text-sm font-medium ${colorClass}`}>
        {formatPercent(value)}
      </span>
    </span>
  );
}

export function WealthHeader({ currentWealth, change }: WealthHeaderProps) {
  return (
    <header className="flex flex-col gap-3 rounded-xl border border-ink-200 bg-white px-6 py-5 shadow-panel sm:flex-row sm:items-center sm:justify-between">
      <p className="font-serif text-4xl font-medium tracking-tight text-ink-900">
        {formatCurrency(currentWealth)}
      </p>

      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
        <ChangeBadge label="Month" value={change.month} />
        <ChangeBadge label="Quarter" value={change.quarter} />
        <ChangeBadge label="Year" value={change.year} />
      </div>
    </header>
  );
}
