import { PermissionElement } from '../models/element';

export function doorlock(elementKey: string | number): PermissionElement {
  return new PermissionElement(String(elementKey));
}
