import { LockTypes } from '../enums/locktypes.enum';
import { PermissionElementDTO } from '../models/element';

export function doorlock(elementName: string) {
    return {
        name: elementName,
        keys: [],
        lockType: LockTypes,
        lockWith(keys: string[]): PermissionElementDTO {
            return {
                name: this.name,
                keys,
                lockType: LockTypes.LOCKABLE,
            };
        },
        unlockWith(keys: string[]): PermissionElementDTO {
            return {
                name: this.name,
                keys,
                lockType: LockTypes.UNLOCKABLE,
            };
        },
    };
}