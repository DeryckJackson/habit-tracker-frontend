import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HabitDetailComponent } from './habit-detail.component';
import { getTestHabits } from '../services/testing/test-habits';
import { convertToParamMap } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HabitService } from '../services/habit.service';
import { of } from 'rxjs';

describe('HabitDetailComponent', () => {
  let component: HabitDetailComponent;
  let fixture: ComponentFixture<HabitDetailComponent>;
  let habitService: jasmine.SpyObj<HabitService>;
  let getHabitSpy;
  let updateHabitSpy;
  const HABIT = getTestHabits()[0]

  beforeEach(async () => {
    habitService = jasmine.createSpyObj('HabitsService', ['getHabit', 'updateHabit']);
    getHabitSpy = habitService.getHabit.and.returnValue(of(HABIT));
    getHabitSpy = habitService.updateHabit.and.returnValue(of(HABIT));

    await TestBed.configureTestingModule({
      declarations: [
        HabitDetailComponent
      ],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '1'
              })
            }
          }
        },
        { provide: HabitService, useValue: habitService },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call ngOnit and call getHabit', () => {
    component.ngOnInit();

    expect(habitService.getHabit).toHaveBeenCalled();
    expect(component.habit).toBe(HABIT);
  });

  it('should call updateHabit after calling save', () => {
    component.ngOnInit();
    component.save()

    expect(habitService.updateHabit).toHaveBeenCalled();
  })
});
