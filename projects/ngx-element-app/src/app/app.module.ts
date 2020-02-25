import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxElementModule } from '../../../ngx-element/src/lib/ngx-element.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxElementModule
  ],
  providers: []
})
export class AppModule {
  ngDoBootstrap() {}
}
