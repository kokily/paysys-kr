import { type NextAuthOptions, getServerSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import db from './database';
import { User } from '@prisma/client';

/**
 * Next Auth Credential Options
 */
export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: {
          type: 'username',
          label: 'username',
        },
        password: {
          type: 'password',
          label: 'password',
        },
      },
      async authorize(credentials, _) {
        try {
          const response = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/login`,
            {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: credentials?.username,
                password: credentials?.password,
              }),
            },
          );

          const data = await response.json();

          if (data) {
            return data;
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
  secret: process.env.NEXTAUTH_SECRET!,
};

/**
 * Get Session Server User
 * @returns SessionUser
 */
export async function getSessionUser() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    throw new Error('사용자 로그인 후 사용하세요');
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    throw new Error('등록된 사용자가 아닙니다.');
  }

  return {
    id: user.id,
    username: user.username,
    admin: user.admin,
  };
}

/**
 * Get Admin User
 * @returns SerializedUser
 */
export async function checkAdmin() {
  const user = await getSessionUser();

  if (user && !user.admin) {
    throw new Error('사용 권한이 없습니다.');
  }

  return user;
}

export function serializeUser(user: User) {
  const { password, ...userWithoutPasword } = user;

  return userWithoutPasword;
}
