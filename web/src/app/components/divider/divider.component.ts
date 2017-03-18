import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'blog-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.css']
})
export class DividerComponent implements OnInit {

  @Input()
  tip: string;

  constructor() { }

  ngOnInit() {
  }

}
