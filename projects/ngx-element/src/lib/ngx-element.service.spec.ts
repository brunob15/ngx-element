import { TestBed } from '@angular/core/testing';
import { NgxElementService } from './ngx-element.service';
import { createDef, LazyComponentRegistry, LAZY_CMPS_REGISTRY } from './tokens';

describe('NgxElementService', () => {
  let service: NgxElementService;

  const lazyConfig: LazyComponentRegistry = {
    definitions: [
      createDef('talk', () => import('../../../ngx-element-app/src/app/talk/talk.module').then(m => m.TalkModule)),
      createDef('sponsor', () => import('../../../ngx-element-app/src/app/sponsor/sponsor.module').then(m => m.SponsorModule))
    ],
    useCustomElementNames: false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LAZY_CMPS_REGISTRY,
          useValue: lazyConfig
        }
      ]
    });
    service = TestBed.inject(NgxElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
