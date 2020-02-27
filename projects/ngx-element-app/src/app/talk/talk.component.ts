import { Component, OnInit, Input } from '@angular/core';

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

  talkTags: string[];

  constructor() { }

  ngOnInit() {
    this.talkTags = JSON.parse(this.tags);
  }

}
