import { Review } from './Review';

export interface Reviews {
  count: number;
  next: string | null;
  previous: string | null;
  results: Review[];
}
