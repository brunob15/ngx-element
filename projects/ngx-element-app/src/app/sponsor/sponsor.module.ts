import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';

import { SponsorComponent } from './sponsor.component';

@NgModule({
  declarations: [
    SponsorComponent
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [
    SponsorComponent
  ]
})
export class SponsorModule {
  customElementComponent: Type<any> = SponsorComponent;

  ngDoBootstrap() {}
}
