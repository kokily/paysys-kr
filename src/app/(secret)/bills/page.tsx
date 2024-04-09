'use client';

import { useListBills } from '@/helpers/client/hooks/bills/useListBills';

export default function ListBillsPage() {
  const props = useListBills();

  return <div>ListBillsPage</div>;
}
