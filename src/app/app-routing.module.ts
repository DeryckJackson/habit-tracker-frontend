import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HabitDetailComponent } from './habit-detail/habit-detail.component';
import { HabitsComponent } from './habits/habits.component';

const routes: Routes = [
  { path: '', redirectTo: 'habits', pathMatch: 'full' },
  { path: 'habits', component: HabitsComponent },
  { path: 'habits/:id', component: HabitDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
