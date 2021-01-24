import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.scss']
})
export class TalkComponent implements OnInit {
  private _isTestMode = 'N';
  @Input() set isTestMode(value: string) {
    if (this._isTestMode !== value) {
      this._isTestMode = value;
    }
  }
  get isTestMode(): string {
    return this._isTestMode;
  }

  private _title: string;
  @Input() set title(value: string) {
    if (this._title !== value) {
      this._title = value;
      if (this.isTestMode === 'Y') {
        this.tagClick.emit(`{"attrName": "title", "attrValue": "${value}"}`);
      }
    }
  }
  get title(): string {
    return this._title;
  }

  private _description: string;
  @Input() set description(value: string) {
    if (this._description !== value) {
      this._description = value;
      if (this.isTestMode === 'Y') {
        this.tagClick.emit(`{"attrName": "description", "attrValue": "${value}"}`);
      }
    }
  }
  get description(): string {
    return this._description;
  }

  private _speaker: string;
  @Input() set speaker(value: string) {
    if (this._speaker !== value) {
      this._speaker = value;
      if (this.isTestMode === 'Y') {
        this.tagClick.emit(`{"attrName": "speaker", "attrValue": "${value}"}`);
      }
    }
  }
  get speaker(): string {
    return this._speaker;
  }

  private _tags: string;
  @Input() set tags(value: string) {
    if (this._tags !== value) {
      this._tags = value;
      if (this.isTestMode === 'Y') {
        this.tagClick.emit(`{"attrName": "tags", "attrValue": ${value}}`);
      }
    }
  }
  get tags(): string {
    return this._tags;
  }

  @Output() tagClick = new EventEmitter<string>();

  talkTags: string[];

  constructor() {}

  ngOnInit(): void {
    this.talkTags = this.tags ? JSON.parse(this.tags) : [];
  }

  onTagClick(tag: string): void {
    this.tagClick.emit(tag);
  }
}
