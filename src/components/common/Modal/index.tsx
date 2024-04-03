import type { SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import { Button } from '../Button';

interface Props {
  visible: boolean;
  title: string;
  body: string;
  onConfirm: (e: SyntheticEvent) => void;
  onCancel: () => void;
}

export function Modal({ visible, title, body, onConfirm, onCancel }: Props) {
  if (!visible) return null;

  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <h2>{title}</h2>
        <p>{body}</p>

        <div className={styles.buttons_box}>
          <Button $cancel onClick={onCancel}>
            취소
          </Button>
          <Button $submit onClick={onConfirm}>
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
