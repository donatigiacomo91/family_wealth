import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data, error } = await supabase
    .from('test')
    .select('*')

  if (error) {
    return <p>Errore: {error.message}</p>
  }

  return (
    <main>
      <h1>Test Supabase</h1>
      <ul>
        {data.map((riga) => (
          <li key={riga.id}>{riga.messaggio}</li>
        ))}
      </ul>
    </main>
  )
}