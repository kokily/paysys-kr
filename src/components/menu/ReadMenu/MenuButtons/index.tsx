import type { SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import { Button } from '@/components/common/Button';

interface Props {
  onBack: () => void;
  onAddCart: (e: SyntheticEvent) => void;
}

export function MenuButtons({ onBack, onAddCart }: Props) {
  return (
    <div className={styles.container}>
      <Button $cancel onClick={onBack}>
        취소하기
      </Button>
      <Button $submit onClick={onAddCart}>
        전송하기
      </Button>
    </div>
  );
}
