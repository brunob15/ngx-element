import { TestBed } from '@angular/core/testing';

import { NgxElementService } from './ngx-element.service';

describe('NgxElementService', () => {
  let service: NgxElementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
