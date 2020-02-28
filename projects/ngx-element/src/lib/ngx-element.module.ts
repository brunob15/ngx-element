import { NgModule, Injector, ModuleWithProviders } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { NgxElementComponent } from './ngx-element.component';
import { LAZY_CMPS_PATH_TOKEN } from './tokens';

@NgModule({
  declarations: [NgxElementComponent]
})
export class NgxElementModule {
  constructor(private injector: Injector) {
    const ngxElement = createCustomElement(NgxElementComponent, { injector });
    customElements.define('ngx-element', ngxElement);
  }

  static forRoot(modulePaths: any[]): ModuleWithProviders {
    return {
      ngModule: NgxElementModule,
      providers: [
        {
          provide: LAZY_CMPS_PATH_TOKEN,
          useValue: modulePaths
        }
      ]
    };
  }

  ngDoBootstrap() {}

}
