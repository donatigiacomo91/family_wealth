import { Sidebar } from '@/components/layout/Sidebar';

export default function ProjectionsPage() {
  return (
    <div className="min-h-screen bg-ink-50 p-4 md:p-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:gap-6">
        <Sidebar />
        <main className="flex-1">
          <div className="flex h-64 flex-col items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white text-center shadow-panel">
            <p className="font-serif text-lg text-ink-700">Projections</p>
            <p className="text-sm text-ink-400">Questa sezione arriverà in un prossimo aggiornamento.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
