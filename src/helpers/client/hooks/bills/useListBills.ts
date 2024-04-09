import type { Bill } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import useLocalStorage from 'use-local-storage';
import { listBillsAPI } from '../../api/bills';
import { billsQuery } from '../../atoms/bills';
import { useObserver } from '../common/useObserver';

export function useListBills() {
  const router = useRouter();
  const [scrollY, setScrollY] = useLocalStorage('listBillsScroll', 0);

  // States
  const [payload, setPayload] = useAtom(billsQuery);
  const { title, hall, userId } = payload;

  // Data Fetching
  const { data, fetchNextPage, refetch } = useInfiniteQuery({
    initialPageParam: '',
    queryKey: ['bills'],
    queryFn: ({ pageParam }) => listBillsAPI({ cursor: pageParam }),
    getNextPageParam: (data) =>
      data && data.length === 40 ? data[data.length - 1].id : undefined,
  });

  const bills = useMemo(() => {
    if (!data) return [];

    return ([] as Array<Bill>).concat(...data.pages);
  }, [data]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const onSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
    await refetch();
  };

  const onReadBill = (id: string) => {
    setScrollY(window.scrollY);
    router.push(`/bills/${id}`);
  };

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && fetchNextPage();
  };

  const { setTarget } = useObserver({ onIntersect });

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, []);

  return {
    bills,
    title,
    hall,
    userId,
    onChange,
    onSearch,
    onReadBill,
    setTarget,
  };
}
