export interface PermissionElementDTO {
  name: string;
  keys: string[];
  unlockable: boolean;
}

export class PermissionElement {
  public name: string;
  public keys: string[] = [];
  public unlockable = true;

  constructor(name: string) {
    this.name = name;
  }

  public unlockWith(keys: string[]): PermissionElement {
    this.unlockable = true;
    this.keys = keys;

    return this;
  }

  public lockWith(keys: string[]): PermissionElement {
    this.unlockable = false;
    this.keys = keys;

    return this;
  }
}
