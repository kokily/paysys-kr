import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';
import { getSessionUser } from '@/helpers/server/utils';

export async function PATCH(_: NextRequest, { params: { id } }: any) {
  try {
    const user = await getSessionUser();
    const bill = await db.bill.findUnique({ where: { id } });

    if (!bill) {
      return NextResponse.json({ error: '해당 빌지가 없습니다.' }, { status: 404 });
    }

    if (bill.userId === user.id) {
      const cart = await db.cart.update({
        where: { id: bill.cartId },
        data: {
          completed: false,
          updatedAt: new Date(),
        },
      });

      await db.bill.delete({ where: { id } });

      return NextResponse.json(cart);
    } else {
      return NextResponse.json({ error: '사용 권한이 없습니다.' }, { status: 403 });
    }

    return NextResponse.json({ message: 'ok' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
