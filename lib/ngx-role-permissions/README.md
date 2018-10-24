# ngx-role-permissions

Permission and roles based access control for your angular(angular 6,7+) applications


## Documentation and examples


## Demo
[Demo ngx-role-permissions] (https://stackblitz.com/edit/ngx-role-permissions)

## Installation

To install this library, run:

```bash
$ npm install ngx-role-permissions --save
```

## Consuming library

You can import library in any Angular application by running:

```bash
$ npm install ngx-role-permissions  --save
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { NgxPermissionModule } from 'ngx-role-permissions';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
     NgxPermissionModule.forRoot({
            yourElement1: ['user', 'admin'],
            yourElement2: ['user'],
        })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

SharedModule

If you use a SharedModule that you import in multiple other feature modules, you can export the NgxPermissionModule to make sure you don't have to import it in every module.
```typescript
@NgModule({
    exports: [
        CommonModule,
        NgxPermissionModule
    ]
})
export class SharedModule { }
```
> Note: Never call a forRoot static method in the SharedModule. You might end up with different instances of the service in your injector tree. But you can use forChild if necessary.

##### Lazy loaded modules

When you lazy load a module, you should use the `forChild` static method to import the `NgxPermissionModule`.

```typescript
@NgModule({
    imports: [
        NgxPermissionModule.forChild('featureModuleName', {
            yourFeatureElement1: ['user', 'admin'],
            yourFeatureElement2: ['user', 'admin'],
        })
    ]
})
export class LazyLoadedModule { }
```


Once your library is imported, you can use its components, directives and pipes in your Angular application:

Import service to the main application and load permissions

```typescript
import { Component } from '@angular/core';
import { PermissionService } from 'ngx-role-permissions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-role-permissions';

  constructor(
    private permissionService: PermissionService,
  ) {
    permissionService.setRoles([
      'user',
    ]);
  }
}
```

Usage in templates 

```html
<div class="element-two" *canPermit="'yourFeatureElement1'">
    Feature element one directive example
</div>
```
### Managing permissions


Usage in routing guards
```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'ngx-role-permissions';

const routes: Routes = [
  {
    path: 'one',
    component: ChildComponent1,
    canActivate: [PermissionGuard],
    data: {
      permissionElement: 'yourFeatureElement1',
    }
  },
  {
    path: 'two',
    component: ChildComponent2,
    canActivate: [PermissionGuard],
    data: {
      permissionElement: 'yourFeatureElement2',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildTwoRoutingModule { }
```

Usage in custom directives/guards/components etc.
```typescript
@Directive({
  selector: '[canAccess]',
})
export class CanPermitDirective {
  constructor(
    private permissionService: PermissionService,
    private _viewContainer: ViewContainerRef,
    private _templateRef: TemplateRef<any>,
  ) {}

  @Input()
  set canAccess(elementName: string) {
    if (!!this.featureName) {
      this.permissionService.canAccessFeature(this.featureName, elementName) //get feature permission element
      .pipe(first())
      .subscribe((res: boolean) => {
        if (!!res && !!this._templateRef) {
          this._viewContainer.clear();
          this._viewContainer.createEmbeddedView(this._templateRef, {});
        } else {
          this._viewContainer.clear();
        }
      });
    } else {
      this.permissionService.canAccess(elementName) //get root permission element
      .pipe(first())
      .subscribe((res: boolean) => {
        if (!!res && !!this._templateRef) {
          this._viewContainer.clear();
          this._viewContainer.createEmbeddedView(this._templateRef, {});
        } else {
          this._viewContainer.clear();
        }
      });
    }
  }
}
```


## For google
angular permissions, angular 4 permissions, angular permissions, angular 5 permissions ng2 permissions ng permissions
ng-permissions ng2-permissions angular2 permissions  angular4 permissions angular 5 permissions

