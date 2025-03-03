import { UserProfile } from '../auth/auth.type';

export interface IComment {
  _id: string;
  text: string;
  author: UserProfile;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentEditable extends IComment {
  editing: boolean;
  openMenu: boolean;
}
