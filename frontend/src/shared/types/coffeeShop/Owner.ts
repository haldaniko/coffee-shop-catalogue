export interface Owner {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  photo: string | null;
  is_owner: boolean;
  is_staff: boolean;
}
