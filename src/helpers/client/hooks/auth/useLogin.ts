import type { ChangeEvent, SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';
import { authState } from '../../atoms/auth';

export function useLogin() {
  const { status } = useSession();
  const router = useRouter();

  // States
  const [payload, setPayload] = useAtom(authState);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const onLogin = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await signIn('credentials', {
        ...payload,
        redirect: false,
      });

      if (response?.status === 401) {
        toast.error('사용자가 없거나 비밀번호가 틀렸습니다.');
        return;
      } else if (response?.status === 500) {
        toast.error('500 에러');
        return;
      } else {
        router.replace('/member');
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  if (status === 'authenticated') {
    router.replace('/member');
  }

  return {
    onChange,
    onLogin,
  };
}
