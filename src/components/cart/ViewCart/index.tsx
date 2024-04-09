import type { Cart } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import { Button } from '@/components/common/Button';
import { CartTop } from './CartTop';
import { CartTotal } from './CartTotal';
import { CartInput } from './CartInput';

interface Props {
  cart: Cart;
  title: string;
  hall: string;
  etc: string;
  totalAmount: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddBill: (e: SyntheticEvent) => void;
  onRemoveOneCart: (id: string, name: string) => void;
  removeCartModal: ModalType;
}

export function ViewCart(props: Props) {
  return (
    <div className={styles.container}>
      {props.cart ? (
        <>
          <CartTop cart={props.cart} onRemoveOne={props.onRemoveOneCart} />
          <CartTotal total={props.totalAmount} />

          <div className={styles.contents}>
            <div className={styles.center}>
              <CartInput
                name="title"
                value={props.title}
                onChange={props.onChange}
                label="행사제목"
                small
              />
              <CartInput
                name="hall"
                value={props.hall}
                onChange={props.onChange}
                label="행사장소"
                small
              />
              <CartInput
                name="etc"
                value={props.etc}
                onChange={props.onChange}
                label="기타사항"
              />
            </div>

            <Button $submit onClick={props.onAddBill}>
              전송하기
            </Button>
            <Button $cancel onClick={props.removeCartModal.onModalClick}>
              전체삭제
            </Button>
          </div>
        </>
      ) : (
        <>등록된 내역 없음</>
      )}
    </div>
  );
}
