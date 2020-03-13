import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { TalkComponent } from './talk.component';

@NgModule({
  declarations: [TalkComponent],
  imports: [CommonModule],
  exports: [TalkComponent],
  entryComponents: [TalkComponent]
})
export class TalkModule {
  customElementComponent: Type<any> = TalkComponent;

  constructor() { }

  ngDoBootstrap() { }
}
