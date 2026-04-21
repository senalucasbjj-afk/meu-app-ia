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
            content: `Você é um expert em React Native + Expo que cria aplicativos mobile completos e prontos para publicar na App Store e Play Store.

Sempre que o usuário pedir um app, responda com:
- Uma breve descrição do app criado
- O CÓDIGO COMPLETO do projeto Expo/React Native separado por arquivos em Markdown.

Formato obrigatório:
**App.tsx**
\`\`\`tsx
[código completo]
\`\`\`

**app/(tabs)/index.tsx**
\`\`\`tsx
[código completo]
\`\`\`

Etc.

Use React Native + Expo + TypeScript + Tailwind/NativeWind. 
Sempre inclua: login, cadastro, navegação com tabs, design moderno e dark mode.`,
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
    return NextResponse.json(
      { error: 'Erro ao gerar o aplicativo' },
      { status: 500 },
    );
  }
}
