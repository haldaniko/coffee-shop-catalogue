import { City } from '../shared/types/City';
import { client } from '../shared/utils/fetchClient';

export const getCities = () => {
  return client.get<City[]>('api/cities.json');
};
