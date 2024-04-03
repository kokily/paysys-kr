import type { PropsWithChildren } from 'react';
import styles from './styles.module.scss';
import { Footer } from '../Footer';
import { Header } from '../Header';

export function PageTemplate({ children }: PropsWithChildren) {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>{children}</main>

      <Footer />
    </div>
  );
}
