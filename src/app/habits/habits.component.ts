import { Component, OnInit } from '@angular/core';
import { Habit } from 'src/habit';
import { HABITS } from '../habit-mock';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.scss']
})
export class HabitsComponent implements OnInit {
  habits = HABITS;
  weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor() { }

  ngOnInit(): void {
    const currentDay = Date().slice(0, 3);
    const dayIndex: number = this.weekdays.findIndex((i) => i == currentDay);
    for (let i = 0; i < dayIndex; i++) {
      const shiftDay = this.weekdays.shift()
      this.weekdays.push(shiftDay!);
    }

  }

  toggleTask(habit: Habit, dayIndex: number): void {
    const habitIndex = this.habits.findIndex(h => h == habit);
    this.habits[habitIndex].days[dayIndex] = this.habits[habitIndex].days[dayIndex] ? false : true;
  };

  createRange(num: number): number[] {
    var range: number[] = [];
    for (var i = 0; i < num; i++) {
      range.push(i);
    }
    return range;
  }

}
