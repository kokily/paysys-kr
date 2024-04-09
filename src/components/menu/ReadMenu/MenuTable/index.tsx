import type { Item } from '@prisma/client';
import type { ChangeEvent } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { unitOfAccount } from '@/helpers/client/utils/conversion';

interface Props {
  menu: Item;
  price: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function MenuTable({ menu, price, onChange }: Props) {
  const TableHead = ({ children }: { children: string }) => (
    <th
      className={clsx({
        [styles.member]: menu.native === '회원',
        [styles.associate]: menu.native === '준회원',
        [styles.general]: menu.native === '일반',
      })}
    >
      {children}
    </th>
  );

  return (
    <table className={styles.container}>
      <tbody>
        <tr>
          <TableHead>구 분</TableHead>
          <td>{menu.name}</td>
        </tr>

        <tr>
          <TableHead>단 가</TableHead>
          <td>
            {menu.price === 0 ? (
              <input type="text" name="price" value={price} onChange={onChange} />
            ) : (
              <>{unitOfAccount(menu.price, '원')}</>
            )}
          </td>
        </tr>

        <tr>
          <TableHead>단 위</TableHead>
          <td>{menu.unit}</td>
        </tr>
      </tbody>
    </table>
  );
}
