'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useAtom } from 'jotai';
import styles from './styles.module.scss';
import { headerMenuOpen } from '@/helpers/client/atoms/common';
import { Logo } from './Logo';
import { Apeach } from './Apeach';
import { ListNavigation } from './ListNavigation';

export function Header() {
  const { data } = useSession();
  const apeachRef = useRef<HTMLDivElement>(null);

  // Menu Toggle
  const [menuOpen, setMenuOpen] = useAtom(headerMenuOpen);

  const onMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const onOutsideClick = useCallback((e: any) => {
    if (apeachRef.current && !apeachRef.current.contains(e.target as any)) {
      setMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', onOutsideClick, true);

    return () => window.removeEventListener('click', onOutsideClick, true);
  }, [apeachRef]);

  console.log(data);

  return (
    <header className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.contents}>
          <Logo />

          <div className={styles.spacer} />

          <>
            <div ref={apeachRef}>
              <Apeach onMenuToggle={onMenuToggle} />
            </div>

            {data?.user && <ListNavigation isAdmin={data.user.admin} />}
          </>
        </div>
      </div>
    </header>
  );
}
