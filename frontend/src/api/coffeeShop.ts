import { ICoffeeShop } from '../shared/types/coffeeShop/CoffeeShop';
import { client } from '../shared/utils/fetchClient';

export const getCoffeeShop = (id: number) => {
  return client.get<ICoffeeShop>(`api/coffeeshops/${id}/`);
};
