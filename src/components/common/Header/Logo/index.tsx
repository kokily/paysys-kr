'use client';

import Link from 'next/link';
import localFont from 'next/font/local';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import styles from './styles.module.scss';

const nanumBold = localFont({
  src: '../../../../../public/fonts/NanumGothic-Bold.ttf',
  display: 'swap',
});

export function Logo() {
  const link = usePathname().split('/')[1];

  return (
    <Link href="/">
      <button
        className={clsx(nanumBold.className, styles.button, {
          [styles.member]: link === 'member',
          [styles.associate]: link === 'associate',
          [styles.general]: link === 'general',
          [styles.cart]: link === 'cart',
          [styles.bills]: link === 'bills',
        })}
      >
        행사전표시스템
      </button>
    </Link>
  );
}
