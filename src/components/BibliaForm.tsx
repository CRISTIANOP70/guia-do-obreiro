import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export interface BibliaEntry {
  id: number;
  email: string;
  book: string;
  chapter: number;
  verse: number;
  content: string;
  version?: string | null;
  added_at: string;
}

export const BibliaForm: React.FC<{ onInsert: () => void }> = ({ onInsert }) => {
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verse, setVerse] = useState('');
  const [content, setContent] = useState('');
  const [version, setVersion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    const email = localStorage.getItem('obreiro_logged_email') || '';
    if (!email) {
      setError('Usuário não autenticado');
      setIsSubmitting(false);
      return;
    }
    const payload = {
      email,
      book,
      chapter: Number(chapter),
      verse: Number(verse),
      content,
      version: version || null,
    };
    const { error: insertError } = await supabase.from('biblia').insert(payload);
    if (insertError) {
      setError(insertError.message);
    } else {
      // limpa campos
      setBook('');
      setChapter('');
      setVerse('');
      setContent('');
      setVersion('');
      onInsert();
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900/80 p-4 rounded-xl space-y-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-200 px-3 py-2 rounded">
          {error}
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        <input
          required
          placeholder="Livro (ex.: Gênesis)"
          value={book}
          onChange={e => setBook(e.target.value)}
          className="col-span-2 p-2 bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500"
        />
        <input
          required
          type="number"
          placeholder="Capítulo"
          value={chapter}
          onChange={e => setChapter(e.target.value)}
          className="p-2 bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500"
        />
        <input
          required
          type="number"
          placeholder="Versículo"
          value={verse}
          onChange={e => setVerse(e.target.value)}
          className="p-2 bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500"
        />
        <input
          placeholder="Versão (opcional)"
          value={version}
          onChange={e => setVersion(e.target.value)}
          className="p-2 bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500"
        />
      </div>
      <textarea
        required
        rows={3}
        placeholder="Texto / nota do versículo"
        value={content}
        onChange={e => setContent(e.target.value)}
        className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition"
      >
        {isSubmitting ? 'Salvando…' : 'Salvar versículo'}
      </button>
    </form>
  );
};
