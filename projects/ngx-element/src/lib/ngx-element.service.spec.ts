import { TestBed } from '@angular/core/testing';

import { NgxElementService } from './ngx-element.service';
import { LAZY_CMPS_PATH_TOKEN } from './tokens';

describe('NgxElementService', () => {
  let service: NgxElementService;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LAZY_CMPS_PATH_TOKEN,
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
