import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HabitDetailComponent } from './habit-detail/habit-detail.component';
import { HabitComponent } from './habit/habit.component';

const routes: Routes = [
  { path: '', redirectTo: 'habits', pathMatch: 'full' },
  { path: 'habits', component: HabitComponent },
  { path: 'habits/:id', component: HabitDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
