import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import { useAtomValue } from 'jotai';
import { authState } from '@/helpers/client/atoms/auth';
import { AuthInput } from './AuthInput';
import { AuthButtons } from './AuthButtons';
import { ModalLink } from '../ModalLink';

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onLogin: (e: SyntheticEvent) => void;
}

export function LoginForm({ onChange, onLogin }: Props) {
  // States
  const { username, password } = useAtomValue(authState);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onLogin(e);
    }
  };

  return (
    <div className={styles.container}>
      <AuthInput
        type="text"
        name="username"
        value={username}
        onChange={onChange}
        label="성 명"
      />

      <AuthInput
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        onKeyDown={onKeyDown}
        label="비밀번호"
      />

      <AuthButtons onLogin={onLogin} />

      <ModalLink />
    </div>
  );
}
