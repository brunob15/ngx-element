import { Injectable, Injector, ComponentFactoryResolver, ComponentFactory, Type } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgxElementService {
  injectors = new Map<Type<any>, Injector>();
  componentFactoryResolvers = new Map<Type<any>, ComponentFactoryResolver>();

  constructor() { }

  receiveContext(component: Type<any>, injector: Injector) {
    this.injectors.set(component, injector);
    this.componentFactoryResolvers.set(component, injector.get(ComponentFactoryResolver));
  }

  getInjector(component: Type<any>): Injector {
    return this.injectors.get(component);
  }

  getComponentFactoryResolver(component: Type<any>): ComponentFactoryResolver {
    return this.componentFactoryResolvers.get(component);
  }
}
