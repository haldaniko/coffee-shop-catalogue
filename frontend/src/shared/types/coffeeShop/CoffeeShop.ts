import { Address } from './Address';
import { Owner } from './Owner';
import { Reviews } from './Reviews';
import { Socials } from './Social';
import { Tag } from './Tag';
import { WorkTime } from './WorkTime';

export interface ICoffeeShop {
  address: Address;
  name: string;
  rating: number;
  evaluations: number;
  id: number;
  image: string | null;
  is_network: boolean;
  owner: Owner;
  phone: string;
  price_rate: number;
  reviews: Reviews;
  socials: Socials;
  tags: Tag[];
  website: string;
  email: string;
  work_time: WorkTime;
  description?: string;
}
