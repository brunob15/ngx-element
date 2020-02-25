import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxElementComponent } from './ngx-element.component';

describe('NgxElementComponent', () => {
  let component: NgxElementComponent;
  let fixture: ComponentFixture<NgxElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
