import { isNullOrUndefined } from "util";

interface IListValueStore<TValue, TKey> {
    readonly items: TValue[];
    readonly selectedKeys: TKey[];
}

export abstract class Helpers {

    public static isSelected = <T, U>(selectedKeys: U[], getKey: (item: T) => U) => (item: T): boolean => {
        return selectedKeys.includes(getKey(item));
    }

    public static findSelectedItems<T, U>(store: IListValueStore<T, U>, getKey: (item: T) => U): T[] {
        return store.items.filter(this.isSelected(store.selectedKeys, getKey));
    }

    public static findOneSelectedItem<T, U>(store: IListValueStore<T, U>, getKey: (item: T) => U): T | undefined {
        return store.items.find(this.isSelected(store.selectedKeys, getKey));
    }

    public static uniq<T, U>(data: T[], replace: boolean, getKey: (x: T) => U): T[] {

        return data.reduce<T[]>(
            (result, item) => {

                const currentKey = getKey(item);
                const index = result.findIndex(x => getKey(x) === currentKey);

                if (index === -1) {
                    return result.concat(item);
                }
                if (replace) {
                    result.splice(index, 1);
                    return result.concat(item);
                }
                return result;
            },
            []
        );
    }

    public static flatten<T>(array: T[][]): T[] {
        return array.reduce<T[]>((result, arr) => result.concat(arr), []);
    }

    public static range(min: number, max?: number): number[] {

        if (isNullOrUndefined(max) || min > max) {
            return Array.from({ length: min }).map((_, i) => i);
        }
        return Array.from({ length: max + 1 - min }).map((_, i) => i + min);
    }

    public static createPromise<T>(callback: () => T): Promise<T> {
        return new Promise(resolve => {
            setTimeout(() => resolve(callback()), 0);
        });
    }
}
