'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import * as data from '@/lib/data';
import type { FamilyMember, WealthSnapshot } from '@/types/finance';

interface WealthContextValue {
  members: FamilyMember[];
  wealthSnapshot: WealthSnapshot | null;
  currentWealth: number;
  isLoading: boolean;
  refreshAll: () => Promise<void>;
}

const WealthContext = createContext<WealthContextValue | null>(null);

/**
 * Provider condiviso tra tutte le pagine (Expenses, Projections, Targets).
 * Carica patrimonio e membri famiglia una sola volta, a livello di layout,
 * così l'header con il totale non deve ricaricare dati ogni volta che si
 * cambia sezione: resta montato e stabile mentre cambia solo il contenuto
 * centrale.
 */
export function WealthProvider({ children }: { children: React.ReactNode }) {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [wealthSnapshot, setWealthSnapshot] = useState<WealthSnapshot | null>(null);
  const [currentWealth, setCurrentWealth] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  async function refreshAll() {
    const [mems, snapshot, wealth] = await Promise.all([
      data.getMembers(),
      data.getWealthSnapshot(),
      data.getCurrentWealth(),
    ]);
    setMembers(mems);
    setWealthSnapshot(snapshot);
    setCurrentWealth(wealth);
  }

  useEffect(() => {
    refreshAll().finally(() => setIsLoading(false));
  }, []);

  return (
    <WealthContext.Provider value={{ members, wealthSnapshot, currentWealth, isLoading, refreshAll }}>
      {children}
    </WealthContext.Provider>
  );
}

export function useWealth() {
  const ctx = useContext(WealthContext);
  if (!ctx) {
    throw new Error('useWealth deve essere usato dentro <WealthProvider>');
  }
  return ctx;
}
