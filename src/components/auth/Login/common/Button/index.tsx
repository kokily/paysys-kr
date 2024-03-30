import type { PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface Props extends PropsWithChildren {
  $cancel?: boolean;
  $submit?: boolean;
  $update?: boolean;
  $menu?: boolean;
  $fullSize?: boolean;
  $thin?: boolean;
  onClick?: (e: any) => void;
}

export function Button(props: Props) {
  return (
    <button
      className={clsx(styles.button, {
        [styles.submit]: props.$submit,
        [styles.cancel]: props.$cancel,
        [styles.update]: props.$update,
        [styles.menu]: props.$menu,
        [styles.thin]: props.$thin,
        [styles.fullSize]: props.$fullSize,
      })}
      {...props}
      onClick={(e) => {
        if (props.onClick) {
          props.onClick(e);
        }
        (e.target as HTMLButtonElement).blur;
      }}
    >
      {props.children}
    </button>
  );
}
