import type { Item } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { MenuButtons } from './MenuButtons';
import { MenuTable } from './MenuTable';
import { MenuCount } from './MenuCount';

interface Props {
  menu: Item;
  count: string;
  price: string;
  onBack: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddCart: (e: SyntheticEvent) => void;
}

export function ReadMenu(props: Props) {
  const menu = props.menu;

  return (
    <div className={styles.container}>
      <div
        className={clsx(styles.logo, {
          [styles.member]: menu.native === '회원',
          [styles.associate]: menu.native === '준회원',
          [styles.general]: menu.native === '일반',
        })}
      >
        {menu.divide} | {menu.native}
      </div>

      <div className={styles.contents}>
        <MenuTable menu={menu} price={props.price} onChange={props.onChange} />

        <hr />

        <MenuCount
          menu={menu}
          count={props.count}
          price={props.price}
          onChange={props.onChange}
          onAddCart={props.onAddCart}
        />
        <MenuButtons onBack={props.onBack} onAddCart={props.onAddCart} />
      </div>
    </div>
  );
}
