import type { Cart, Bill } from '@prisma/client';
import qs from 'qs';
import client from './client';

export async function listBillsAPI(queries: ListBillsQueries) {
  const queryString = qs.stringify(queries);
  const response = await client.get<Array<Bill>>(`/bills?${queryString}`);
  return response.data;
}

export async function readBillAPI(id: string) {
  const response = await client.get<Bill>(`/bills/${id}`);
  return response.data;
}

export async function addBillAPI(payload: AddBillPayload) {
  const response = await client.post<Bill>('/bills/add', payload);
  return response.data;
}

export async function removeBillAPI(id: string) {
  const response = await client.delete(`/bills/remove/${id}`);
  return response.data;
  7;
}

export async function restoreBillAPI(id: string) {
  const response = await client.patch<Cart>(`/bills/restore/${id}`);
  return response.data;
}
