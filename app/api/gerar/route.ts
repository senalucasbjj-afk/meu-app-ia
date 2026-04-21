import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `Você é um expert full-stack developer especializado em criar aplicativos web completos e prontos para usar.

Sempre que o usuário pedir um app, responda com:
1. Uma breve descrição do que você criou.
2. O CÓDIGO COMPLETO do aplicativo em Next.js 14+ (App Router) + TypeScript + Tailwind CSS + shadcn/ui.

Formato obrigatório da resposta:
- Use Markdown
- Separe cada arquivo com um título em negrito:
  **app/page.tsx**
  \`\`\`tsx
  [código completo]
  \`\`\`

Inclua SEMPRE:
- Página de login funcional (com email/senha simulada ou localStorage)
- Dashboard ou área principal do app
- Design moderno, bonito, responsivo e dark mode
- Navegação clara

Nunca responda com planos de desenvolvimento, código nativo iOS/Android ou texto longo. Sempre entregue o app web completo e funcional.`,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 8000,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao gerar app' }, { status: 500 });
  }
}
