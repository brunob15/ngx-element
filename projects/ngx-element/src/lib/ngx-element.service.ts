import { Injectable, Inject, NgModuleFactory, Type, Compiler, Injector, ComponentFactoryResolver } from '@angular/core';
import { LAZY_CMPS_REGISTRY, LazyComponentDef, LazyComponentRegistry } from './tokens';
import { LazyCmpLoadedEvent } from './lazy-component-loaded-event';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgxElementService {
  private componentsToLoad: Map<string, LazyComponentDef>;
  private loadedComponents = new Map<string, Type<any>>();
  private elementsLoading = new Map<string, Promise<LazyCmpLoadedEvent>>();

  injectors = new Map<Type<any>, Injector>();
  componentFactoryResolvers = new Map<Type<any>, ComponentFactoryResolver>();

  constructor(
    @Inject(LAZY_CMPS_REGISTRY) private registry: LazyComponentRegistry,
    private compiler: Compiler,
    private injector: Injector
  ) {
    const ELEMENT_MODULE_PATHS = new Map<string, any>();
    registry.definitions.forEach(route => {
      ELEMENT_MODULE_PATHS.set(route.selector, route);
    });

    this.componentsToLoad = ELEMENT_MODULE_PATHS;
  }

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

  getComponentsToLoad() {
    return this.componentsToLoad;
  }

  getComponentToLoad(selector: string): Observable<LazyCmpLoadedEvent> {
    // Returns observable that completes when the lazy module has been loaded.
    const registered = this.loadComponent(selector);
    return from(registered);
  }

  /**
   * Checks whether the selector is registered in the registry.
   * @param selector
   */
  isSelectorRegistered(selector: string) {
    let result = false;
    this.registry.definitions.forEach(def => {
      if (selector === def.selector) {
        result = true;
      }
    });
    return result;
  }

  /**
   * Allows to lazy load a component given its selector.
   * If the component selector has been registered, it's according module
   * will be fetched lazily
   * @param componentTag selector of the component to load
   */
  loadComponent(componentSelector: string): Promise<LazyCmpLoadedEvent> {
    if (this.elementsLoading.has(componentSelector)) {
      return this.elementsLoading.get(componentSelector);
    }

    if (this.componentsToLoad.has(componentSelector)) {
      const cmpRegistryEntry = this.componentsToLoad.get(componentSelector);
      const path = cmpRegistryEntry.loadChildren;

      const loadPromise = new Promise<LazyCmpLoadedEvent>((resolve, reject) => {
        (path() as Promise<NgModuleFactory<any> | Type<any>>)
          .then(elementModuleOrFactory => {
            /**
             * With View Engine, the NgModule factory is created and provided when loaded.
             * With Ivy, only the NgModule class is provided loaded and must be compiled.
             * This uses the same mechanism as the deprecated `SystemJsNgModuleLoader` in
             * in `packages/core/src/linker/system_js_ng_module_factory_loader.ts`
             * to pass on the NgModuleFactory, or compile the NgModule and return its NgModuleFactory.
             */
            if (elementModuleOrFactory instanceof NgModuleFactory) {
              return elementModuleOrFactory;
            } else {
              try {
                return this.compiler.compileModuleAsync(elementModuleOrFactory);
              } catch (err) {
                // return the error
                reject(err);

                // break the promise chain
                throw err;
              }
            }
          })
          .then(moduleFactory => {
            const elementModuleRef = moduleFactory.create(this.injector);
            let componentClass;

            if (typeof elementModuleRef.instance.customElementComponent === 'object') {
              componentClass = elementModuleRef.instance.customElementComponent[componentSelector];

              if (!componentClass) {
                // tslint:disable-next-line: no-string-throw
                throw `You specified multiple component elements in module ${elementModuleRef} but there was no match for tag
                        ${componentSelector} in ${JSON.stringify(elementModuleRef.instance.customElementComponent)}.
                         Make sure the selector in the module is aligned with the one specified in the lazy module definition.`;
              }
            } else {
              componentClass = elementModuleRef.instance.customElementComponent;
            }

            // Register injector of the lazy module.
            // This is needed to share the entryComponents between the lazy module and the application
            const moduleInjector = elementModuleRef.injector;
            this.receiveContext(componentClass, moduleInjector);

            this.loadedComponents.set(componentSelector, componentClass);
            this.elementsLoading.delete(componentSelector);
            this.componentsToLoad.delete(componentSelector);

            resolve({
              selector: componentSelector,
              componentClass
            });
          })
          .catch(err => {
            this.elementsLoading.delete(componentSelector);
            return Promise.reject(err);
          });
      });

      this.elementsLoading.set(componentSelector, loadPromise);
      return loadPromise;

    } else if (this.loadedComponents.has(componentSelector)) {
      // component already loaded
      return new Promise(resolve => {
        resolve({
          selector: componentSelector,
          componentClass: this.loadedComponents.get(componentSelector)
        });
      });
    } else {
      throw new Error(
        `Unrecognized component "${componentSelector}". Make sure it is registered in the component registry`
      );
    }
  }
}
