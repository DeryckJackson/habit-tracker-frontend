import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Habit } from '../data-types';
import { HabitsService } from '../services/habits.service';

@Component({
  selector: 'app-habit-detail',
  templateUrl: './habit-detail.component.html',
  styleUrls: ['./habit-detail.component.scss']
})
export class HabitDetailComponent implements OnInit {
  habit!: Habit;

  constructor(
    private route: ActivatedRoute,
    private habitsService: HabitsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHabit()
  }

  getHabit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.habitsService.getHabit(id)
      .subscribe(habit => this.habit = habit);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.habit) {
      this.habitsService.updateHabit(this.habit)
        .subscribe(() => this.goBack());
    }
  }

}
