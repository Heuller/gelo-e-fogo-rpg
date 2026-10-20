import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    game: 'Crônicas de Sangue e Gelo',
    version: '2.1.0',
    timestamp: new Date().toISOString(),
    engine: 'TypeScript 2d6 Deterministic (BG3 Pattern)',
  });
}
