import {
  Component,
  OnInit,
  Input,
  Type,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  OnDestroy,
  ElementRef } from '@angular/core';
import { NgxElementService } from './ngx-element.service';

@Component({
  selector: 'lib-ngx-element',
  template: `
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
              private resolver: ComponentFactoryResolver,
              private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.ngxElementService.getComponentToLoad(this.selector).subscribe(event => {
      this.componentToLoad = event.componentClass;

      const attributes = this.getElementAttributes();
      this.createComponent(attributes);
    });
  }

  createComponent(attributes) {
    this.container.clear();
    const factory = this.resolver.resolveComponentFactory(this.componentToLoad);
    this.componentRef = this.container.createComponent(factory);

    this.setAttributes(attributes);
    this.listenToAttributeChanges();
  }

  setAttributes(attributes) {
    attributes.forEach(attr => {
      this.componentRef.instance[attr.name] = attr.value;
    });
  }

  getElementAttributes() {
    const attrs = this.elementRef.nativeElement.attributes;
    const attributes = [];

    for (let attr, i = 0; i < attrs.length; i++) {
      attr = attrs[i];

      if (attr.nodeName.match('^data-')) {
        attributes.push({
          name: attr.nodeName.replace('data-', ''),
          value: attr.nodeValue
        });
      }
    }

    return attributes;
  }

  listenToAttributeChanges() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes') {
          const attributes = this.getElementAttributes();
          this.setAttributes(attributes);
        }
      });
    });

    observer.observe(this.elementRef.nativeElement, {
      attributes: true
    });
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }

}
