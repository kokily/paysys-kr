'use client';

import { Login } from '@/components/auth/Login';
import { useLogin } from '@/helpers/client/hooks/auth/useLogin';

function LoginPage() {
  const props = useLogin();

  return (
    <>
      <Login {...props} />
    </>
  );
}

export default LoginPage;
