import { Item } from '@prisma/client';
import prevData from './item.json';
import db from '@/helpers/server/database';

async function seed() {
  const getData: Array<Item> = prevData.map((data) => {
    return {
      id: data.id,
      num: data.num,
      name: data.name,
      divide: data.divide,
      native: data.native,
      unit: data.unit,
      price: data.price,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  });

  await Promise.all(
    getData.map((data) => {
      return db.item.create({ data });
    }),
  );
}

seed();
