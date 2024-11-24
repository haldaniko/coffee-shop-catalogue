// import { CoffeeShopAddress } from '../CoffeeShopAddress';
import { Address } from './Address';

// export interface CoffeeShop {
//   id: number;
//   name: string;
//   address: CoffeeShopAddress;
//   rating: number | null;
//   image: string | null;
//   price_rate: number;
//   owner: boolean;
// }

export interface ICoffeeShopCard {
  id: number;
  name: string;
  address: Address;
  rating: number | null;
  image: string | null;
  price_rate: number;
  owner: boolean;
  is_network: boolean;
  total_reviews: number;
  favorite: boolean;
}
