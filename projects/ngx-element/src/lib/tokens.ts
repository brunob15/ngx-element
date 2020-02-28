import { InjectionToken } from '@angular/core';
import { LoadChildrenCallback } from '@angular/router';

/* Injection token to provide the element path modules. */
export const LAZY_CMPS_PATH_TOKEN = new InjectionToken('ngx-lazy-cmp-registry');

export interface LazyComponentDef {
  selector: string;
  loadChildren: LoadChildrenCallback; // prop needs to be named like this
}
