import type { ChangeEvent } from 'react';
import styles from './styles.module.scss';

interface Props {
  name: string;
  value: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  small?: boolean;
}

export function CartInput(props: Props) {
  return (
    <div className={styles.container}>
      <input type="text" className={styles.input} {...props} required />
      <label className={styles.label} htmlFor={props.name}>
        {props.label}
        {props.small && '*'}
      </label>
    </div>
  );
}
