import { ICoffeeShop } from '../../../shared/types/coffeeShop/CoffeeShop';

export const INITIAL_STATE: ICoffeeShop = {
  address: {
    city: 'TBD',
    postal_code: 0,
    district: 'TBD',
    street: 'TBD',
  },
  name: 'TBD',
  rating: 0,
  evaluations: 0,
  id: 0,
  image: null,
  is_network: false,
  owner: {
    id: 0,
    email: 'TBD',
    username: 'TBD',
    first_name: 'TBD',
    last_name: 'TBD',
    photo: null,
    is_owner: false,
    is_staff: false,
  },
  phone: 'TBD',
  price_rate: 0,
  reviews: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  socials: {
    id: 0,
  },
  tags: [],
  website: 'TBD',
  email: 'TBD',
  work_time: {
    id: 0,
    mon_open: 'TBD',
    mon_close: 'TBD',
    tue_open: 'TBD',
    tue_close: 'TBD',
    wed_open: 'TBD',
    wed_close: 'TBD',
    thu_open: 'TBD',
    thu_close: 'TBD',
    fri_open: 'TBD',
    fri_close: 'TBD',
    sat_open: 'TBD',
    sat_close: 'TBD',
    sun_open: 'TBD',
    sun_close: 'TBD',
  },
};

export const PRICING_POLICY = ['Budgetary', 'Middle class', 'Premium'];

export const getCurrentHour = (): string => {
  const now = new Date();
  const hours = now.getHours();

  return hours.toString().padStart(2, '0') + ':00';
};

export const getCurrentDay = (): string => {
  const now = new Date();
  const day = String(now.getDay());

  switch (day) {
    case '0':
      return 'sun';
    case '1':
      return 'mon';
    case '2':
      return 'tue';
    case '3':
      return 'wed';
    case '4':
      return 'thu';
    case '5':
      return 'fri';
    case '6':
      return 'sat';
    default:
      break;
  }

  return 'asd';
};
