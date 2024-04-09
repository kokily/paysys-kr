import { atom } from 'jotai';

export const cartStates = atom<AddCartStates>({
  count: '',
  price: '',
});

export const viewCartStates = atom<ViewCartPayload>({
  title: '',
  hall: '',
  etc: '',
  totalAmount: 0,
});
