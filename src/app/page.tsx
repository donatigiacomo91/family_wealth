import { Sidebar } from '@/components/layout/Sidebar';
import { Dashboard } from '@/components/dashboard/Dashboard';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-ink-50 p-4 md:p-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:gap-6">
        <Sidebar />
        <main className="flex-1">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}
