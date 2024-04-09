import type { Item } from '@prisma/client';
import styles from './styles.module.scss';
import { Button } from '@/components/common/Button';
import { MenuItem } from './MenuItem';

interface Props {
  menu: Array<Item>;
  onBack: () => void;
  onReadMenu: (id: string) => void;
}

export function ListMenu({ menu, onBack, onReadMenu }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>{menu[0] && menu[0].divide}</h2>
        <Button $cancel onClick={onBack}>
          뒤 로
        </Button>
      </div>

      <div className={styles.list}>
        {menu.map((item) => (
          <MenuItem key={item.id} menu={item} onReadMenu={onReadMenu} />
        ))}
      </div>
    </div>
  );
}
