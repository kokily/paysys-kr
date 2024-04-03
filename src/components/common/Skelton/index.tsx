import styles from './styles.module.scss';

interface Props {
  cols: number;
}

export function Skelton({ cols }: Props) {
  return (
    <tr className={styles.container}>
      <td colSpan={cols} className={styles.skelton}></td>
    </tr>
  );
}
