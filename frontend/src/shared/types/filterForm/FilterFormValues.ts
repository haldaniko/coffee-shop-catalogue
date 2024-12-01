import { SelectOption } from '../SelectOption';

export interface IPrice {
  budgetary: boolean;
  middle: boolean;
  premium: boolean;
}

export interface ITagActivities {
  books: boolean;
  board_games: boolean;
  live_music: boolean;
  pets: boolean;
}

export interface ITagConveniences {
  wifi: boolean;
  restroom: boolean;
  delivery: boolean;
  booking: boolean;
  parking: boolean;
  terrace: boolean;
}

export interface IFilterFormValues {
  name: string;
  city: SelectOption;
  address: string;
  network: string;
  open: SelectOption;
  close: SelectOption;
  district: SelectOption;
  rating: number[];
  price: IPrice;
  owner: boolean;
  activities: ITagActivities;
  conveniences: ITagConveniences;
}
