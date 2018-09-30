export interface PermissionConfigInterface {
  [name: string]: string[] | PermissionConfigInterface;
}
