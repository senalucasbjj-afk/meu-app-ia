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
            content: `Você é um expert em React Native + Expo que cria aplicativos mobile completos e prontos para App Store / Play Store.

Sempre que o usuário pedir um app, responda com:
- Uma breve descrição do que foi criado
- O CÓDIGO COMPLETO do projeto Expo/React Native (TypeScript + Tailwind)

Formato obrigatório:
Use Markdown e separe cada arquivo claramente:

**app/(tabs)/_layout.tsx**
\`\`\`tsx
[código completo]
\`\`\`

**app/(tabs)/index.tsx**
\`\`\`tsx
[código completo]
\`\`\`

Etc.

Inclua sempre:
- Autenticação (login, cadastro)
- Navegação com tabs ou stack
- Design moderno, clean e responsivo
- Temas dark/light
- Funcionalidades reais (não placeholders)

O app deve ser completo, bonito e funcional. Foque em React Native + Expo.`,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 12000,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao gerar app' }, { status: 500 });
  }
}
