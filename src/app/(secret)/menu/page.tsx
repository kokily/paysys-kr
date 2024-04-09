'use client';

import { useListMenu } from '@/helpers/client/hooks/menu/useListMenu';
import { Skelton } from '@/components/common/Skelton';
import { ListMenu } from '@/components/menu/ListMenu';

export default function ListMenuPage() {
  const props = useListMenu();

  return props.menu ? (
    <ListMenu {...props} />
  ) : (
    Array.from(Array(20), (_, i) => <Skelton key={i} cols={4} />)
  );
}
