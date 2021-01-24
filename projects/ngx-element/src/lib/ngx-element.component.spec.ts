import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxElementComponent } from './ngx-element.component';
import { LAZY_CMPS_PATH_TOKEN } from './tokens';

describe('NgxElementComponent', () => {
  let component: NgxElementComponent;
  let fixture: ComponentFixture<NgxElementComponent>;

  const inputsAttrs = {
    title: 'Angular Elements',
    description: 'How to write Angular and get Web Components',
    speaker: 'Bruno'
  };

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

    fixture = TestBed.createComponent(NgxElementComponent);
    component = fixture.componentInstance;
    component.selector = 'talk';
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * ATTENTION:
   * Because of calling <dispatchEvent> to emit <customEvent> and the spec of
   * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
   * that says: Unlike "native" events, which are fired by the DOM and invoke
   * event handlers asynchronously via the event loop, dispatchEvent() invokes
   * event handlers synchronously. All applicable event handlers will execute
   * and return before the code continues on after the call to dispatchEvent()
   * ..., the line of code <outputObject = JSON.parse(e.detail);> is called
   * always after all other ones, so the expectation has to be evaluated here.
   */

  it('should pass and receive the same "title" attr value', () => {
    let outputObject: {attrName: string, attrValue: string};
    const nativeElement = fixture.nativeElement;
    nativeElement.addEventListener('tagClick', (e: CustomEvent) => {
      outputObject = JSON.parse(e.detail);
      expect(outputObject.attrValue).toEqual(inputsAttrs[outputObject.attrName]);
    });
    nativeElement.setAttribute('data-is-test-mode', 'Y');
    nativeElement.setAttribute('data-title', inputsAttrs.title);
    expect().nothing();
  });

  it('should pass and receive the same "description" attr value', () => {
    let outputObject: {attrName: string, attrValue: string};
    const nativeElement = fixture.nativeElement;
    nativeElement.addEventListener('tagClick', (e: CustomEvent) => {
      outputObject = JSON.parse(e.detail);
      expect(outputObject.attrValue).toEqual(inputsAttrs[outputObject.attrName]);
    });
    nativeElement.setAttribute('data-is-test-mode', 'Y');
    nativeElement.setAttribute('data-description', inputsAttrs.description);
    expect().nothing();
  });

  it('should pass and receive the same "speaker" attr value', () => {
    let outputObject: {attrName: string, attrValue: string};
    const nativeElement = fixture.nativeElement;
    nativeElement.addEventListener('tagClick', (e: CustomEvent) => {
      outputObject = JSON.parse(e.detail);
      expect(outputObject.attrValue).toEqual(inputsAttrs[outputObject.attrName]);
    });
    nativeElement.setAttribute('data-is-test-mode', 'Y');
    nativeElement.setAttribute('data-speaker', inputsAttrs.speaker);
    expect().nothing();
  });
});
