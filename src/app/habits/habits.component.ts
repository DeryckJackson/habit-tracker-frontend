import { Component, OnInit } from '@angular/core';
import { HABITS } from '../habit-mock';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.scss']
})
export class HabitsComponent implements OnInit {
  habits = HABITS;

  constructor() { }

  ngOnInit(): void {
  }

  createRange(num: number): number[] {
    var range: number[] = [];
    for (var i = 0; i < num; i++) {
      range.push(i);
    }
    return range;
  }

}
