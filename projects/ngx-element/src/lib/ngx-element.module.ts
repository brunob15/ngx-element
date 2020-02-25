import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { NgxElementComponent } from './ngx-element.component';

@NgModule({
  declarations: [NgxElementComponent],
  exports: [NgxElementComponent],
  entryComponents: [NgxElementComponent]
})
export class NgxElementModule {
  constructor(private injector: Injector) {
    const ngxElement = createCustomElement(NgxElementComponent, { injector });
    customElements.define('ngx-element', ngxElement);
  }

  ngDoBootstrap() {}
}
