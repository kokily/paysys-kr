import { atom } from 'jotai';

export const authState = atom<AuthPayload>({
  username: '',
  password: '',
});
