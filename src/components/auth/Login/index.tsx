import type { ChangeEvent, SyntheticEvent } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { LoginForm } from './LoginForm';

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onLogin: (e: SyntheticEvent) => void;
}

export function Login(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/" className={styles.link}>
          로그인
        </Link>
      </div>

      <LoginForm {...props} />
    </div>
  );
}
