import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { BibliaEntry } from './BibliaForm';

export const BibliaList: React.FC<{ refreshTrigger: number }> = ({ refreshTrigger }) => {
  const [entries, setEntries] = useState<BibliaEntry[]>([]);
  const [error, setError] = useState('');

  const loadEntries = async () => {
    setError('');
    const email = localStorage.getItem('obreiro_logged_email') || '';
    if (!email) {
      setError('Usuário não autenticado');
      return;
    }
    const { data, error: fetchError } = await supabase
      .from('biblia')
      .select('*')
      .eq('email', email)
      .order('added_at', { ascending: false });
    if (fetchError) {
      setError(fetchError.message);
    } else {
      setEntries(data as BibliaEntry[]);
    }
  };

  useEffect(() => {
    loadEntries();
  }, [refreshTrigger]);

  const handleDelete = async (id: number) => {
    const { error: delError } = await supabase.from('biblia').delete().eq('id', id);
    if (delError) {
      setError(delError.message);
    } else {
      // refresh list
      loadEntries();
    }
  };

  return (
    <div className="mt-6 space-y-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-200 px-3 py-2 rounded">
          {error}
        </div>
      )}
      {entries.length === 0 ? (
        <p className="text-slate-400 text-sm">Nenhum versículo cadastrado ainda.</p>
      ) : (
        entries.map(entry => (
          <div key={entry.id} className="bg-slate-800 p-4 rounded-xl border border-amber-500/30 shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-amber-400">
                  {entry.book} {entry.chapter}:{entry.verse}{entry.version ? ` (${entry.version})` : ''}
                </h3>
                <p className="text-slate-200 mt-1 whitespace-pre-wrap">{entry.content}</p>
                <p className="text-xs text-slate-500 mt-2">{new Date(entry.added_at).toLocaleString()}</p>
              </div>
              <button
                onClick={() => handleDelete(entry.id)}
                className="text-red-400 hover:text-red-300 transition"
                title="Excluir"
              >
                ✕
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
