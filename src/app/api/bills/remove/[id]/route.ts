import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';
import { getSessionUser } from '@/helpers/server/utils';

export async function DELETE(_: NextRequest, { params: { id } }: any) {
  try {
    const user = await getSessionUser();
    const bill = await db.bill.findUnique({ where: { id } });

    if (!bill) {
      return NextResponse.json({ error: '해당 빌지는 없습니다.' }, { status: 404 });
    }

    if (user.admin) {
      await db.bill.delete({ where: { id } });

      return NextResponse.json({ message: '빌지 삭제' });
    } else {
      if (bill.userId === user.id) {
        await db.bill.delete({ where: { id } });

        return NextResponse.json({ message: '빌지 삭제' });
      } else {
        return NextResponse.json(
          { error: '본인이 작성한 빌지만 삭제가능합니다.' },
          { status: 403 },
        );
      }
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
