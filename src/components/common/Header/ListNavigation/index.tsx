'use client';

import { signOut } from 'next-auth/react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { useAtomValue } from 'jotai';
import { headerMenuOpen } from '@/helpers/client/atoms/common';
import { NavItem } from './NavItem';

interface Props {
  isAdmin: boolean;
}

export function ListNavigation({ isAdmin }: Props) {
  // State
  const menuOpen = useAtomValue(headerMenuOpen);

  const onLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  const Split = () => <div className={styles.split} />;

  return (
    <nav
      className={clsx(styles.container, {
        [styles.visible]: menuOpen,
        [styles.unvisible]: !menuOpen,
      })}
    >
      <div className={styles.contents}>
        <NavItem href="/password">비밀번호 변경</NavItem>

        {isAdmin && (
          <>
            <Split />

            <NavItem href="/weddings">웨딩빌지</NavItem>
            <NavItem href="/items">품목 리스트</NavItem>

            <Split />

            <NavItem href="/users">사용자 리스트</NavItem>
          </>
        )}

        <Split />

        <NavItem onClick={onLogout}>로그아웃</NavItem>
      </div>
    </nav>
  );
}
