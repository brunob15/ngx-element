import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
