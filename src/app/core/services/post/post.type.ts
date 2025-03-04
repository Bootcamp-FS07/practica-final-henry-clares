import { UserProfile } from '../auth/auth.type';

export interface IPost {
  _id: string;
  text: string;
  author: UserProfile;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostEditable extends IPost {
  editing: boolean;
  openMenu: boolean;
}
