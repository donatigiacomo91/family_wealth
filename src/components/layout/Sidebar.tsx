'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  /** se false, la sezione esiste solo come placeholder per il futuro */
  enabled: boolean;
}

const navItems: NavItem[] = [
  { label: 'Expenses', href: '/', enabled: true },
  { label: 'Projections', href: '/projections', enabled: false },
  { label: 'Targets', href: '/targets', enabled: false },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Sezioni principali"
      className="flex w-full flex-row gap-1 overflow-x-auto rounded-xl border border-ink-200 bg-white p-2 shadow-panel md:w-44 md:flex-col md:gap-2 md:overflow-visible md:p-3"
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        if (!item.enabled) {
          return (
            <div
              key={item.label}
              aria-disabled="true"
              className="flex shrink-0 flex-col items-start gap-1 rounded-lg px-3 py-2 text-ink-400"
              title="In arrivo"
            >
              <span className="whitespace-nowrap text-sm">{item.label}</span>
              <span className="hidden h-px w-full bg-ink-200 md:block" />
            </div>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex shrink-0 flex-col items-start gap-1 rounded-lg px-3 py-2 text-sm transition-colors ${
              isActive
                ? 'bg-sage-100 text-sage-700'
                : 'text-ink-700 hover:bg-ink-50'
            }`}
          >
            <span className="whitespace-nowrap">{item.label}</span>
            {isActive && <span className="hidden h-px w-full bg-sage-300 md:block" />}
          </Link>
        );
      })}
    </nav>
  );
}
