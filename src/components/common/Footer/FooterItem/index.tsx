import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { IconType } from 'react-icons/lib';
import styles from './styles.module.scss';
import { ActiveLink } from '../../ActiveLink';

interface Props {
  href: string;
  IconOn: IconType;
  IconOff: IconType;
  name: string;
}

export function FooterItem({ href, IconOn, IconOff, name }: Props) {
  const active = usePathname().substring(1) === href.substring(1);

  return (
    <ActiveLink href={href} activeClassName="active">
      <div
        className={clsx(styles.anchor, {
          [styles.active]: active,
        })}
      >
        {active ? <IconOn size={24} /> : <IconOff size={24} />}
        {name}
      </div>
    </ActiveLink>
  );
}
