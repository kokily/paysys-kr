import { MdArrowDropDown } from 'react-icons/md';
import styles from './styles.module.scss';

interface Props {
  onMenuToggle: () => void;
}

export function Apeach({ onMenuToggle }: Props) {
  return (
    <div className={styles.container} onClick={onMenuToggle}>
      <div className={styles.apeach} />
      <MdArrowDropDown />
    </div>
  );
}
