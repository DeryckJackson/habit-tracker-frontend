import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HabitsComponent } from './habits.component';
import { Habit } from '../data-types'
import { HabitsService } from '../services/habits.service';
import { getTestHabits } from '../services/testing/test-habits';
import { of } from 'rxjs';

describe('HabitsComponent', () => {
  let component: HabitsComponent;
  let fixture: ComponentFixture<HabitsComponent>;
  let getHabitsSpy;
  const HABITS = getTestHabits()

  beforeEach(waitForAsync(() => {
    const habitsService = jasmine.createSpyObj('HabitsService', ['getHabits']);
    getHabitsSpy = habitsService.getHabits.and.returnValue(of(HABITS));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HabitsComponent],
      providers: [{ provide: HabitsService, useValue: habitsService }]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HabitsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should shift first day to Wed', () => {
    spyOn(window, "Date").and.returnValue('Wed');

    component.ngOnInit()

    expect(component.weekdays[0]).toEqual('Wed');
    expect(component.weekdays[1]).toEqual('Tue');
  })

  it('should create range of numbers', () => {
    const expectedRange = [0, 1, 2];

    const generatedRange = component.createRange(3);

    expect(expectedRange).toEqual(generatedRange)
  })

  it('should toggle entry value to one and then zero', () => {
    const habit: Habit[] = [{
      id: 1,
      name: 'foo',
      entryList: [{ timestamp: Date.now(), value: 0 }]
    }]

    component.habits = habit;
    component.toggleEntryValue(habit[0], 0);

    expect(component.habits[0].entryList[0].value).toEqual(1);

    component.toggleEntryValue(habit[0], 0)
    expect(component.habits[0].entryList[0].value).toEqual(0);
  })
});
