import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Habit } from "src/app/data-types";
import { HabitsService } from "../habits.service";
import { getTestHabits } from "./test-habits";
import { catchError, map, tap } from 'rxjs/operators';
import { asyncData } from "src/app/testing/async-observable-helpers";

@Injectable()
/**
 * FakeHeroService pretends to make real http requests.
 * implements only as much of HeroService as is actually consumed by the app
 */
export class TestHabitsService extends HabitsService {

  constructor() {
    // This is a fake testing service that won't be making HTTP
    // requests so we can pass in `null` as the HTTP client.
    super(null!);
  }

  habits = getTestHabits();
  lastResult!: Observable<any>; // result from last method call

  override addHabit(habit: Habit): Observable<Habit> {
    throw new Error('Method not implemented.');
  }

  override deleteHabit(hero: number | Habit): Observable<Habit> {
    throw new Error('Method not implemented.');
  }

  override getHabits(): Observable<Habit[]> {
    return this.lastResult = asyncData(this.habits);
  }

  override getHabit(id: number | string): Observable<Habit> {
    if (typeof id === 'string') {
      id = parseInt(id, 10);
    }
    const habit = this.habits.find(h => h.id === id);
    this.lastResult = asyncData(habit);
    return this.lastResult;
  }

  override updateHabit(habit: Habit): Observable<Habit> {
    return this.lastResult = this.getHabit(habit.id).pipe(
      map(h => {
        if (h) {
          return Object.assign(h, habit);
        }
        throw new Error(`Habit ${habit.id} not found`);
      })
    );
  }
}
