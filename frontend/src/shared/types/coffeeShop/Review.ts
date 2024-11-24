import { Author } from './Author';

export interface Review {
  author: Author;
  created_at: string;
  dislikes: number;
  likes: number;
  stars: number;
  text: string;
  title: string;
  user_reaction: string;
}
