import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('gymsmart_token')?.value;
  const refreshToken = req.cookies.get('gymsmart_refresh_token')?.value;
  if (!token) return NextResponse.json({ token: null, refreshToken: null }, { status: 401 });
  return NextResponse.json({ token, refreshToken });
}
