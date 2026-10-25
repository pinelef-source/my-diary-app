import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();

    // n8n Webhook URL 입력 (추후 n8n 웹훅 주소로 변경하거나 환경변수 사용)
    const n8nWebhookUrl = 'http://localhost:5678/webhook/my-webhook';

    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, date: new Date().toISOString() }),
    });

    if (!response.ok) {
      throw new Error('n8n webhook 전송 실패');
    }

    return NextResponse.json({ success: true, message: '저장 완료' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: '서버 오류 발생' }, { status: 500 });
  }
}
