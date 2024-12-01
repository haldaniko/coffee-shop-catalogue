export interface IParams {
  city: string | undefined;
  name: string;
  address: string;
  district: string | undefined;
  with_owner: boolean;
  tags: string;
  is_network: string | true;
  pricing_rate: string;
  min_rating: number | false;
  max_rating: number | false;
  hours_from: string | undefined;
  hours_to: string | undefined;
}
