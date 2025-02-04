import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    console.log(req)
    const response = NextResponse.json({ success: true });

    response.cookies.delete('session', {
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true
    })

    return response;

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}