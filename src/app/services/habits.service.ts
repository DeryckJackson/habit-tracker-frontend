import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Habit } from '../data-types';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HabitsService {
  constructor(private http: HttpClient) { }

  readonly habitsUrl = 'api/habits'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getHabits(): Observable<Habit[]> {
    const habits = this.http.get<Habit[]>(this.habitsUrl)
      .pipe(
        catchError(this.handleError<Habit[]>('getHabits'))
      )
    return habits;
  }

  getHabit(id: number): Observable<Habit> {
    const url = `${this.habitsUrl}/${id}`;
    return this.http.get<Habit>(url).pipe(
      // tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Habit>(`getHabit id=${id}`))
    );
  }

  updateHabit(habit: Habit): Observable<any> {
    return this.http.put(this.habitsUrl, habit, this.httpOptions).pipe(
      // tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHabit'))
    );
  }

  addHabit(habit: Habit): Observable<Habit> {
    return this.http.post<Habit>(this.habitsUrl, habit, this.httpOptions).pipe(
      // tap((newHero: Habit) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Habit>('addHabit'))
    );
  }

  deleteHabit(id: number): Observable<Habit> {
    const url = `${this.habitsUrl}/${id}`;

    return this.http.delete<Habit>(url, this.httpOptions).pipe(
      // tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Habit>('deleteHabit'))
    );
  }

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param operation - name of the operation that failed
   */
  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
        `server returned code ${error.status} with body "${error.error}"`;

      // TODO: better job of transforming error for user consumption
      throw new Error(`${operation} failed: ${message}`);
    };

  }
}
