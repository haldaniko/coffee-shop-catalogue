import { ICoffeeShopCard } from '../shared/types/coffeeShop/CoffeeShopCard';
import { client } from '../shared/utils/fetchClient';

interface IListsOfCoffeeShops {
  popular: ICoffeeShopCard[];
  recent: ICoffeeShopCard[];
}

export const getListsOfCoffeeShops = () => {
  return client.get<IListsOfCoffeeShops>('api/index-coffee-shops/');
};
