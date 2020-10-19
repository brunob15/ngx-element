import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.scss']
})
export class TalkComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() speaker: string;
  @Input() tags: string;

  /*
  tslint:disable:no-output-rename
  */
  @Output('custom-click') customClick = new EventEmitter<string>();

  talkTags: string[];

  constructor() { }

  ngOnInit() {
    this.talkTags = this.tags ? JSON.parse(this.tags) : [];
  }

  invokeClick(tag: string): void {
    this.customClick.emit(tag);
  }
}
