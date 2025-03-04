export interface User {
  username: string;
  password: string;
}

export interface UserProfile {
  _id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}
