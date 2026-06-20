'use client';

import { WealthHeader } from '@/components/dashboard/WealthHeader';
import { useWealth } from '@/lib/wealth-context';

// Placeholder statico, come deciso: verrà calcolato realmente nella
// sezione "Projections".
const STATIC_WEALTH_CHANGE = { month: -0.7, quarter: 2.5, year: 5.3 };

export function AppHeader() {
  const { currentWealth, isLoading } = useWealth();

  if (isLoading) {
    return (
      <div className="flex h-[88px] items-center justify-center rounded-xl border border-ink-200 bg-white text-sm text-ink-400 shadow-panel">
        Caricamento...
      </div>
    );
  }

  return <WealthHeader currentWealth={currentWealth} change={STATIC_WEALTH_CHANGE} />;
}
