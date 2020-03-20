import {
  Component,
  OnInit,
  Input,
  Type,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  OnDestroy,
  ElementRef,
  Injector,
  ReflectiveInjector} from '@angular/core';
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
  componentFactoryResolver: ComponentFactoryResolver;
  injector: Injector;
  refInjector: ReflectiveInjector;

  constructor(private ngxElementService: NgxElementService,
              private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.ngxElementService.getComponentToLoad(this.selector).subscribe(event => {
      this.componentToLoad = event.componentClass;
      this.componentFactoryResolver = this.ngxElementService.getComponentFactoryResolver(this.componentToLoad);
      this.injector = this.ngxElementService.getInjector(this.componentToLoad);

      const attributes = this.getElementAttributes();
      this.createComponent(attributes);
    });
  }

  createComponent(attributes) {
    this.container.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(this.componentToLoad);

    this.refInjector = 
      ReflectiveInjector.resolveAndCreate([{provide: this.componentToLoad, useValue: this.componentToLoad}], this.injector);
    this.componentRef = this.container.createComponent(factory, 0, this.refInjector);

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
          name: this.camelCaseAttribute(attr.nodeName),
          value: attr.nodeValue
        });
      }
    }

    return attributes;
  }

  camelCaseAttribute(attribute: string) {
    const attr = attribute.replace('data-', '');
    const chunks = attr.split('-');

    if (chunks.length > 1) {
      return chunks[0] + chunks.slice(1).map(chunk => chunk.replace(/^\w/, c => c.toUpperCase())).join();
    }

    return attr;
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
