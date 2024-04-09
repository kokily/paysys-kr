import styles from './styles.module.scss';
import { HomeItem } from './HomeItem';

interface Props {
  menu: Array<MenuType>;
  link: string;
  onMenu: (divide: string) => void;
}

export function HomeList({ menu, link, onMenu }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        {menu.map((item) => (
          <HomeItem key={item.id} link={link} divide={item.divide} onMenu={onMenu} />
        ))}
      </div>
    </div>
  );
}
