'use client';

import {
  RiVipCrown2Fill,
  RiVipCrown2Line,
  RiVipCrownFill,
  RiVipCrownLine,
  RiVipDiamondFill,
  RiVipDiamondLine,
} from 'react-icons/ri';
import { HiMiniShoppingCart, HiOutlineShoppingCart } from 'react-icons/hi2';
import { FaRegMoneyBill1 } from 'react-icons/fa6';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { FooterItem } from './FooterItem';
import styles from './styles.module.scss';

export function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.contents}>
        <FooterItem
          href="/member"
          IconOn={RiVipCrown2Fill}
          IconOff={RiVipCrown2Line}
          name="회원"
        />
        <FooterItem
          href="/associate"
          IconOn={RiVipCrownFill}
          IconOff={RiVipCrownLine}
          name="준회원"
        />
        <FooterItem
          href="/general"
          IconOn={RiVipDiamondFill}
          IconOff={RiVipDiamondLine}
          name="일반"
        />
        <FooterItem
          href="/cart"
          IconOn={HiMiniShoppingCart}
          IconOff={HiOutlineShoppingCart}
          name="전표확인"
        />
        <FooterItem
          href="/bills"
          IconOn={FaMoneyBillAlt}
          IconOff={FaRegMoneyBill1}
          name="전표목록"
        />
      </div>
    </footer>
  );
}
