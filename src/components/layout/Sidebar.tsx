'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

function ReceiptIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M4 1.5h10a.5.5 0 0 1 .5.5v14.2c0 .35-.4.55-.68.34l-1.32-1-1.32 1a.5.5 0 0 1-.6 0l-1.32-1-1.32 1a.5.5 0 0 1-.6 0l-1.32-1-1.32 1a.5.5 0 0 1-.68-.34V2a.5.5 0 0 1 .5-.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M6.5 6h5M6.5 9h5M6.5 12h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M2.5 13.5 7 8.5l3 2.5 5.5-6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 4.5h3.5V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="9" cy="9" r="0.8" fill="currentColor" />
    </svg>
  );
}

const navItems: NavItem[] = [
  { label: 'Expenses', href: '/', icon: <ReceiptIcon /> },
  { label: 'Projections', href: '/projections', icon: <TrendIcon /> },
  { label: 'Targets', href: '/targets', icon: <TargetIcon /> },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Sezioni principali"
      className="flex w-full shrink-0 flex-row gap-1 rounded-xl border border-ink-200 bg-white p-2 shadow-panel md:w-56 md:flex-col md:gap-1 md:p-3"
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-1 items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors md:flex-none ${
              isActive
                ? 'bg-sage-100 text-sage-700'
                : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
            }`}
          >
            <span className={isActive ? 'text-sage-600' : 'text-ink-400'}>{item.icon}</span>
            <span className="hidden sm:inline">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
