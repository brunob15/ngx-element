import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxElementModule } from '../../../ngx-element/src/lib/ngx-element.module';

const lazyConfig = [
  {
    selector: 'talk',
    loadChildren: () => import('./talk/talk.module').then(m => m.TalkModule)
  },
  {
    selector: 'sponsor',
    loadChildren: () => import('./sponsor/sponsor.module').then(m => m.SponsorModule)
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxElementModule.forRoot(lazyConfig)
  ],
  providers: []
})
export class AppModule {
  ngDoBootstrap() {}
}
