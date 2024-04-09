'use client';

import { HomeList } from '@/components/home/HomeList';
import { useHome } from '@/helpers/client/hooks/home/useHome';

export default function GeneralPage() {
  const props = useHome();

  return <HomeList {...props} />;
}
