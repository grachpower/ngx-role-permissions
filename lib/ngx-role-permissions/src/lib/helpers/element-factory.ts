import { PermissionElement } from '../models/element';

export function doorlock(elementKey: string | number): PermissionElement {
  return {
    name: elementKey,
    keys: [],
    unlockable: true,

    unlockWith(keys: string[]): PermissionElement {
      this.unlockable = true;
      this.keys = keys;

      return this;
    },

    lockWith(keys: string[]): PermissionElement {
        this.unlockable = false;
        this.keys = keys;

        return this;
    },
  } as PermissionElement;
}
