import { atom } from 'jotai';

export const cartStates = atom<AddCartStates>({
  count: '',
  price: '',
});
