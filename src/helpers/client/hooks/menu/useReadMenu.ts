import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';
import { cartStates } from '../../atoms/cart';
import { readMenuAPI } from '../../api/menu';
import { addCartAPI } from '../../api/cart';

interface Props {
  id: string;
}

export function useReadMenu({ id }: Props) {
  const { data } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  // States
  const [payload, setPayload] = useAtom(cartStates);
  const { count, price } = payload;

  // Data Fetching
  const { data: menu } = useQuery({
    queryKey: ['cart'],
    queryFn: () => readMenuAPI(id),
    enabled: !!id,
  });

  // Data Mutations
  const addCartMutate = useMutation({ mutationFn: addCartAPI });

  const onBack = () => {
    router.back();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const onAddCart = async (e: SyntheticEvent) => {
    e.preventDefault();

    if ([price, count].includes('')) {
      toast.error('빈 칸 없이 입력해주세요');
      return;
    }

    await addCartMutate.mutateAsync(
      {
        userId: data?.user.id!,
        itemId: id,
        price: parseInt(price),
        count: parseInt(count),
      },
      {
        onSuccess: () => {
          toast.success('카트 품목 추가');
          queryClient.invalidateQueries({ queryKey: ['readMenu', id, 'cart'] });
          router.back();
        },
        onError: (err: any) => {
          toast.error(err.error);
        },
      },
    );
  };

  // 단가가 0원인 경우
  useEffect(() => {
    if (menu) {
      if (menu.price !== 0) {
        setPayload({ ...payload, price: menu.price.toString() });
      } else {
        setPayload({ ...payload, price: '' });
      }
    }
  }, [menu]);

  return {
    menu,
    count,
    price,
    onBack,
    onChange,
    onAddCart,
  };
}
