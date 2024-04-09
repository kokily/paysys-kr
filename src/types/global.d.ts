import type { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
      admin: boolean;
      token: string;
    };
  }
}

declare global {
  interface SignOptions {
    expiresIn?: string | number;
  }

  interface AuthPayload {
    username: string;
    password: string;
  }

  interface SerializedUser {
    id: string;
    username: string;
    admin: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

  type TargetType = Dispatch<SetStateAction<HTMLElement> | null | undefined>;

  interface ModalType {
    modal: boolean;
    onModalClick: () => void;
    onConfirm: (e: SyntheticEvent) => void;
    onCancel: () => void;
  }
}
