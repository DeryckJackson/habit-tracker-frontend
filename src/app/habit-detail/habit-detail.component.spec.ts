import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HabitDetailComponent } from './habit-detail.component';
import { getTestHabits } from '../services/testing/test-habits';
import { convertToParamMap } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HabitsService } from '../services/habits.service';
import { of } from 'rxjs';

describe('HabitDetailComponent', () => {
  let component: HabitDetailComponent;
  let fixture: ComponentFixture<HabitDetailComponent>;
  let habitsService: jasmine.SpyObj<HabitsService>;
  let getHabitSpy;
  let updateHabitSpy;
  const HABIT = getTestHabits()[0]

  beforeEach(async () => {
    habitsService = jasmine.createSpyObj('HabitsService', ['getHabit', 'updateHabit']);
    getHabitSpy = habitsService.getHabit.and.returnValue(of(HABIT));
    getHabitSpy = habitsService.updateHabit.and.returnValue(of(HABIT));

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
        { provide: HabitsService, useValue: habitsService },
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

    expect(habitsService.getHabit).toHaveBeenCalled();
    expect(component.habit).toBe(HABIT);
  });

  it('should call updateHabit after calling save', () => {
    component.ngOnInit();
    component.save()

    expect(habitsService.updateHabit).toHaveBeenCalled();
  })
});
