import {
  Api,
  ApiType,
  StorageObjectData,
  StorageObjectType,
} from './storage.type';

interface StorageOptions {
  api?: ApiType;
}

function getStorageApi(api: StorageOptions['api']): Storage {
  return api === Api.SessionStorage ? sessionStorage : localStorage;
}

function getItem<T extends StorageObjectType>(
  item: T,
  options?: StorageOptions
): StorageObjectData<T>['data'] | null {
  const api = getStorageApi(options?.api || Api.LocalStorage);
  const data = api.getItem(item.toString());
  return data ? (JSON.parse(data) as StorageObjectData<T>['data']) : null;
}

function setItem<T extends StorageObjectType>(
  itemName: T,
  data: StorageObjectData<T>['data'],
  options?: StorageOptions
): void {
  if (data === null || data === undefined) {
    return;
  }

  const api = getStorageApi(options?.api || Api.LocalStorage);
  api.setItem(itemName, JSON.stringify(data));
}

function removeItem<T extends StorageObjectType>(
  item: T,
  options?: StorageOptions
): void {
  const api = getStorageApi(options?.api || Api.LocalStorage);
  api.removeItem(item);
}

function clear(options?: StorageOptions): void {
  const api = getStorageApi(options?.api || Api.LocalStorage);
  api.clear();
}

export const storage = {
  getItem,
  setItem,
  removeItem,
  clear,
};
