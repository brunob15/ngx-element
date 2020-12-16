import { InjectionToken } from '@angular/core';
import { LoadChildrenCallback } from '@angular/router';

/* Injection token to provide the element path modules. */
export const LAZY_CMPS_REGISTRY = new InjectionToken('ngx-lazy-cmp-registry');

export interface LazyComponentDef {
  selector: string;
  loadChildren: LoadChildrenCallback; // prop needs to be named like this
}

export interface LazyComponentRegistry {
  /** A list of LazyComponentDef for this registry. */
  definitions: LazyComponentDef[];
  /** Whether this uses native custom element tag names or an selector attribute. */
  useCustomElementNames: boolean;
  /** If useCustomElementNames is true, then this specifies the REQUIRED prefix for the tag names according to Custom Element specification. */
  customElementNamePrefix?: string;
}

export function createDef(selector: string, loadChildren: LoadChildrenCallback): LazyComponentDef {
  return {selector, loadChildren};
}
