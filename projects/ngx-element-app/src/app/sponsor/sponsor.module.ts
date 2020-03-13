import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { SponsorComponent } from './sponsor.component';

@NgModule({
  declarations: [SponsorComponent],
  imports: [CommonModule],
  exports: [SponsorComponent],
  entryComponents: [SponsorComponent]
})
export class SponsorModule {
  customElementComponent: Type<any> = SponsorComponent;

  constructor() { }

  ngDoBootstrap() { }
}
