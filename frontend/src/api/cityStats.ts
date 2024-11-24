import { City } from '../shared/types/City';
import { client } from '../shared/utils/fetchClient';

export const getCityStats = () => {
  return client.get<City[]>('api/city-stats/');
};
