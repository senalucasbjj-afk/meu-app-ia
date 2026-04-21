import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`, // chave do OpenRouter no .env.local
    },
    body: JSON.stringify({
      model: 'deepseek/deepseek-chat', // modelo via OpenRouter
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const data = await resp.json();
  const resultado = data.choices?.[0]?.message?.content || 'Erro ao gerar app.';

  return NextResponse.json({ resultado });
}
