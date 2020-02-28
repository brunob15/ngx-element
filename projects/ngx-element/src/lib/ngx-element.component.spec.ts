import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxElementComponent } from './ngx-element.component';
import { LAZY_CMPS_PATH_TOKEN } from './tokens';

describe('NgxElementComponent', () => {
  let component: NgxElementComponent;
  let fixture: ComponentFixture<NgxElementComponent>;

  const lazyConfig = [
    {
      selector: 'talk',
      loadChildren: () => import('../../../ngx-element-app/src/app/talk/talk.module').then(m => m.TalkModule)
    },
    {
      selector: 'sponsor',
      loadChildren: () => import('../../../ngx-element-app/src/app/sponsor/sponsor.module').then(m => m.SponsorModule)
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxElementComponent ],
      providers: [
        {
          provide: LAZY_CMPS_PATH_TOKEN,
          useValue: lazyConfig
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxElementComponent);
    component = fixture.componentInstance;
    component.selector = 'talk';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
