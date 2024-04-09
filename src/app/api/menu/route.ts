import { NextRequest, NextResponse } from 'next/server';
import { getQuery } from '@/helpers/server/utils';
import db from '@/helpers/server/database';

export async function GET(req: NextRequest) {
  const divide = getQuery(req, 'divide');
  const native = getQuery(req, 'native');

  try {
    const menu = await db.item.findMany({
      where: { divide, native },
    });

    return NextResponse.json(menu);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
