import { NgModule, Injector, ModuleWithProviders, Inject } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { NgxElementComponent } from './ngx-element.component';
import { LazyComponentRegistry, LAZY_CMPS_REGISTRY } from './tokens';

@NgModule({
  declarations: [NgxElementComponent],
  entryComponents: [NgxElementComponent]
})
export class NgxElementModule {

  constructor(private injector: Injector, @Inject(LAZY_CMPS_REGISTRY) private registry: LazyComponentRegistry) {
    if(!registry.useCustomElementNames) {
      const ngxElement = createCustomElement(NgxElementComponent, { injector });
      customElements.define('ngx-element', ngxElement);
    } else {
      registry.definitions.forEach(def => {
        const ngxElement = createCustomElement(NgxElementComponent, { injector });
        customElements.define(`${registry.customElementNamePrefix}-${def.selector}`, ngxElement);
      });
    }
  }

  static forRoot(registry: any): ModuleWithProviders<NgxElementModule> {
    return {
      ngModule: NgxElementModule,
      providers: [
        {
          provide: LAZY_CMPS_REGISTRY,
          useValue: registry
        }
      ]
    };
  }

  ngDoBootstrap() {}
}
