import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '@/helpers/server/database';
import { serializeUser } from '@/helpers/server/utils';
import { signJwtAccessToken } from '@/helpers/client/tokens';

export async function POST(req: NextRequest) {
  const { username, password } = (await req.json()) as AuthPayload;

  try {
    const user = await db.user.findUnique({
      where: { username: username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const serializedUser = serializeUser(user);
      const result = {
        ...serializedUser,
        token: signJwtAccessToken(serializedUser),
      };

      return NextResponse.json(result);
    } else {
      throw new Error('사용자가 없거나 비밀번호가 틀렸습니다.');
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
