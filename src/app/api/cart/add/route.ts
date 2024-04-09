import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';

export async function POST(req: NextRequest) {
  const payload = (await req.json()) as AddCartPayload;

  try {
    const item = await db.item.findUnique({
      where: { id: payload.itemId },
    });

    if (!item) {
      return NextResponse.json({ error: '해당 품목은 없습니다.' }, { status: 404 });
    }

    // 현 세션 접속자 카트
    const currentCart = await db.cart.findFirst({
      where: {
        userId: payload.userId,
        completed: false,
        deleted: false,
      },
    });

    // 카트 추가용 모델
    const addItem: AddItemModel = {
      id: item.id,
      name: item.name,
      divide: item.divide,
      native: item.native,
      unit: item.unit,
      price: payload.price,
      count: payload.count,
      amount: payload.count * payload.price,
    };

    // 카트 내역 분기점
    if (!currentCart) {
      // 기존 카트 내역이 없으면 신규 생성
      const cart = await db.cart.create({
        data: {
          items: [addItem] as any,
          userId: payload.userId,
        },
      });

      return NextResponse.json(cart);
    } else {
      // 기존 카트 내역이 있으면 품목만 추가
      const updateCartItem = [...currentCart.items, addItem];
      const cart = await db.cart.update({
        where: { id: currentCart.id },
        data: {
          ...currentCart,
          items: updateCartItem as any,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(cart);
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
