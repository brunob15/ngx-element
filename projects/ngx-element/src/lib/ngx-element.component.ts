import { Component, OnInit, Input, Type, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ComponentRef, OnDestroy } from '@angular/core';
import { NgxElementService } from './ngx-element.service';

@Component({
  selector: 'lib-ngx-element',
  template: `
    <h1>Loading component {{ selector }}</h1>
    <ng-template #container></ng-template>
  `,
  styles: []
})
export class NgxElementComponent implements OnInit, OnDestroy {
  @Input() selector: string;
  @ViewChild('container', { read: ViewContainerRef }) container;

  componentRef;
  componentToLoad: Type<any>;

  constructor(private ngxElementService: NgxElementService,
              private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    const lazyConfig = this.ngxElementService.getComponentsToLoad();
    console.log('LAZY CONFIG', Array.from(lazyConfig.keys()));

    this.ngxElementService.getComponentToLoad(this.selector).subscribe(event => {
      this.componentToLoad = event.componentClass;
      console.log('COMPONENT TO LOAD', this.componentToLoad);

      this.createComponent();
    });
  }

  createComponent() {
    this.container.clear();
    const factory = this.resolver.resolveComponentFactory(this.componentToLoad);
    this.componentRef = this.container.createComponent(factory);
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }

}
