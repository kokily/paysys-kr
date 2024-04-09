import { atom } from 'jotai';

export const billsQuery = atom<ListBillsState>({
  title: '',
  hall: '',
  userId: '',
});
