import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxElementComponent } from './ngx-element.component';
import { createDef, LazyComponentRegistry, LAZY_CMPS_REGISTRY } from './tokens';

describe('NgxElementComponent', () => {
  let component: NgxElementComponent;
  let fixture: ComponentFixture<NgxElementComponent>;

  const lazyConfig: LazyComponentRegistry = {
    definitions: [
      createDef('talk', () => import('../../../ngx-element-app/src/app/talk/talk.module').then(m => m.TalkModule)),
      createDef('sponsor', () => import('../../../ngx-element-app/src/app/sponsor/sponsor.module').then(m => m.SponsorModule))
    ],
    useCustomElementNames: false
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxElementComponent],
      providers: [
        {
          provide: LAZY_CMPS_REGISTRY,
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
