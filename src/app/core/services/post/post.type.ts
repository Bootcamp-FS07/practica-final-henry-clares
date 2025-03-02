import { UserProfile } from '../auth/auth.type';

export interface Post {
  _id: string;
  text: string;
  author: UserProfile;
  createdAt: Date;
  updatedAt: Date;
}
