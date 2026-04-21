'use client';
import { useState } from 'react';

export default function Home() {
  const [texto, setTexto] = useState('');
  const [resposta, setResposta] = useState('');

  async function gerarApp() {
    const resp = await fetch('/api/gerar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: texto }),
    });
    const data = await resp.json();
    setResposta(data.resultado);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-800 text-white flex flex-col items-center justify-center p-20">
      <h1 className="text-6xl font-bold mb-8">Crie Apps com IA</h1>

      <p className="text-2xl text-zinc-300 mb-10 text-center max-w-3xl">
        Digite o aplicativo que você deseja e nossa IA cria para iPhone, Android
        e Web.
      </p>

      <input
        className="w-full max-w-2xl p-6 rounded-xl text-black text-lg bg-white border-2 border-green-500 shadow-lg"
        placeholder="Ex: Quero um app de delivery"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      <button
        className="mt-6 bg-green-500 px-10 py-5 rounded-xl text-2xl font-bold hover:bg-green-600 shadow-lg"
        onClick={gerarApp}
      >
        Gerar Aplicativo
      </button>

      {resposta && (
        <pre className="mt-6 text-lg bg-zinc-900 p-6 rounded-xl max-w-2xl whitespace-pre-wrap">
          {resposta}
        </pre>
      )}
    </main>
  );
}
