import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.less']
})
export class ResultComponent implements OnInit {


  public _correctAnswers = 0;
  @Input('correctAnswers')
  set correctAnswers(value) {
    console.log(value)
    this._correctAnswers = value;
  }
  get correctAnswers() {
    return this._correctAnswers;
  }
  constructor() { }

  ngOnInit() {
  }

}
