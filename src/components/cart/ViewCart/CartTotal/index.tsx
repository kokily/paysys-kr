import styles from './styles.module.scss';
import { unitOfAccount } from '@/helpers/client/utils/conversion';

interface Props {
  total: number;
}

export function CartTotal({ total }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.total}>
        예상 결제금액 : <span>{unitOfAccount(total, '원')}</span>
      </div>
    </div>
  );
}
