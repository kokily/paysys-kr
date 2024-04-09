import type { Item } from '@prisma/client';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { unitOfAccount } from '@/helpers/client/utils/conversion';

interface Props {
  menu: Item;
  onReadMenu: (id: string) => void;
}

export function MenuItem({ menu, onReadMenu }: Props) {
  return (
    <div
      className={clsx(
        clsx(styles.container, {
          [styles.member]: menu.native === '회원',
          [styles.associate]: menu.native === '준회원',
          [styles.general]: menu.native === '일반',
        }),
      )}
      onClick={() => onReadMenu(menu.id)}
    >
      {menu.name} | {unitOfAccount(menu.price, '원')}
    </div>
  );
}
