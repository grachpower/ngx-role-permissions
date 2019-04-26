/*
 * Public API Surface of ngx-role-permission
 */

export * from './lib/ngx-role-permission.module';

/**
 * Directives
 */
export * from './lib/directives/can-permit.directive';
export * from './lib/directives/can-not-permit.directive';

/**
 * Models
 */
export * from './lib/models/element';

/**
 * Helpers
 *
 * @Deprecated
 */
// export * from './lib/helpers/element-factory';

/**
 * Enums and types
 */
export * from './lib/enums/locktypes.enum';

/**
 * Guards
 */
export * from './lib/guards/permission.guard';

/**
 * Services
 */
export * from './lib/services/permission.service';

/**
 * Tokens
 */
export * from './lib/tokens/permission-config.token';
export * from './lib/tokens/initial-roles.token';

/**
 * Interfaces
 */
export * from './lib/interface/permissionConfig.interface';
