import { PermissionConfigInterface } from '../interface/permissionConfig.interface';

export function resolveFeatureConfig(featureName: string, config: PermissionConfigInterface) {
  return {
    [featureName]: config,
  };
}
