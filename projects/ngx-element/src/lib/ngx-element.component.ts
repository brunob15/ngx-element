import { Component, OnInit, Input, Type } from '@angular/core';
import { NgxElementService } from './ngx-element.service';

@Component({
  selector: 'lib-ngx-element',
  template: `
    <h1>
      Loading component {{ selector }}
    </h1>
  `,
  styles: []
})
export class NgxElementComponent implements OnInit {
  @Input() selector: string;

  componentToLoad: Type<any>;

  constructor(private ngxElementService: NgxElementService) { }

  ngOnInit(): void {
    const lazyConfig = this.ngxElementService.getComponentsToLoad();
    console.log('LAZY CONFIG', Array.from(lazyConfig.keys()));

    this.ngxElementService.getComponentToLoad(this.selector).subscribe(event => {
      this.componentToLoad = event.componentClass;
      console.log('COMPONENT TO LOAD', this.componentToLoad);
    });
  }

}
