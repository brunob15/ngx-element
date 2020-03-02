[![npm version](https://badge.fury.io/js/ngx-element.svg)](https://badge.fury.io/js/ngx-element)
![Tests CI](https://github.com/brunob15/ngx-element/workflows/Tests%20CI/badge.svg)

# NgxElement

NgxElement enables to lazy load Angular components in non-angular applications.
The library will register a custom element to which you can pass an attribute to specify what component you want to load.

It's a great way to use Angular in your CMS platform in an efficient manner.

## Install Angular Elements
This library depends on Angular Elements. You can install it by running:
```
$ ng add @angular/elements
```

## Installing the library
```
$ npm install ngx-element
```

## Usage
### 1) Configure the Module containing the lazy loaded component

First of all, expose the Angular Component that should be loaded via a customElementComponent property.

```
...
@NgModule({
  declarations: [TalkComponent],
  ...
  exports: [TalkComponent]
})
export class TalkModule {
  customElementComponent: Type<any> = TalkComponent;
}
```

### 2) Define the lazy component map in your AppModule
Just like with the Angular Router, define the map of component selector and lazy module.

```
const lazyConfig = [
  {
    selector: 'talk',
    loadChildren: () => import('./talk/talk.module').then(m => m.TalkModule)
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
  entryComponents: [
    NgxElementComponent
  ],
  providers: []
})
export class AppModule {
  ngDoBootstrap() {}
}
```
Note: You can skip the entryComponents array if you are using Angular 9.

### 3) Use the lazy loaded component
You can load your Angular component by adding an `<ngx-element>` tag to the DOM in your non-angular application like follows:

```
<ngx-element
  selector="talk"
  data-title="Angular Elements"
  data-description="How to write Angular and get Web Components"
  data-speaker="Bruno">
</ngx-element>
```
