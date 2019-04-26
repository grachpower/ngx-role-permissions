import { LockTypes } from '../enums/locktypes.enum';

export interface PermissionElementDTO {
  name: string;
  keys: string[];
  lockType: LockTypes;
}
