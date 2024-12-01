import { ICoffeeShopCard } from '../shared/types/coffeeShop/CoffeeShopCard';
import { client } from '../shared/utils/fetchClient';

export const getCoffeeShops = (params: string) => {
  return client.get<ICoffeeShopCard[]>(`api/coffeeshops/${params}`);
};
