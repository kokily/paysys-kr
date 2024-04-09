import type { Item } from '@prisma/client';
import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import { unitOfAccount } from '@/helpers/client/utils/conversion';

interface Props {
  menu: Item;
  count: string;
  price: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddCart: (e: SyntheticEvent) => void;
}

export function MenuCount({ menu, count, price, onChange, onAddCart }: Props) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAddCart(e);
    }
  };

  const total =
    menu.price === 0
      ? parseInt(price) * parseInt(count)
      : menu.price * parseInt(count);

  return (
    <>
      <div className={styles.container}>
        <label htmlFor="count">수 량</label>
        <input
          type="text"
          name="count"
          value={count}
          onChange={onChange}
          onKeyDown={onKeyDown}
          autoFocus
          required
        />
      </div>

      <div className={styles.total}>
        <h3>합계 금액: {isNaN(total) ? '' : unitOfAccount(total, '원')}</h3>
      </div>
    </>
  );
}
