import { AppTheme } from '../../services/theme/theme.type';

interface StorageObjectMap {
  appSession: {
    username: string;
    token: string;
  };
  appTheme: AppTheme;
  idUser: string;
}

export type StorageObjectType = 'appSession' | 'appTheme' | 'idUser';

export interface StorageObjectData<T extends StorageObjectType> {
  type: T;
  data: StorageObjectMap[T];
}

export const Api = {
  LocalStorage: 'LocalStorage',
  SessionStorage: 'SessionStorage',
} as const;

export type ApiType = keyof typeof Api;
