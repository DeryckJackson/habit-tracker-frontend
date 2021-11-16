import { TestBed } from '@angular/core/testing';

import { HabitsService } from './habits.service';
import { getTestHabits } from '../services/testing/test-habits';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Habit } from '../data-types';

describe('HabitsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: HabitsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [HabitsService]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HabitsService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getHabits', () => {
    let expectedHabits: Habit[];
    beforeEach(() => {
      service = TestBed.inject(HabitsService)
      expectedHabits = getTestHabits();
    })

    it('should return expected habits (called once)', () => {
      service.getHabits().subscribe(
        habits => expect(habits).toEqual(expectedHabits, 'should return expected habits'),
        fail
      );

      // HeroService should have made one request to GET heroes from expected URL
      const req = httpTestingController.expectOne(service.habitsUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock habits
      req.flush(expectedHabits);
    });

    it('should return empty array amd be OK', () => {
      service.getHabits().subscribe(
        habits => expect(habits.length).toEqual(0),
        fail
      )

      const req = httpTestingController.expectOne(service.habitsUrl);
      req.flush([]);
    })

    it('should return 404 and generate error msg', () => {
      const emsg = 'network error';
      service.getHabits().subscribe(
        data => fail('expected to fail'),
        error => expect(error.message).toContain(emsg)
      )

      const req = httpTestingController.expectOne(service.habitsUrl)

      req.flush(emsg, { status: 404, statusText: 'Not Found' })
    })
  })

  describe('#getHabit', () => {
    it('should return single habit', () => {
      const expectedHabit = getTestHabits()[0];

      service.getHabit(1).subscribe(
        habit => expect(habit).toEqual(expectedHabit)
      )

      const req = httpTestingController.expectOne(`${service.habitsUrl}/${1}`)

      req.flush(expectedHabit);
    })

    it('should return 404, habit not found', () => {
      const msg = 'habit not found';

      service.getHabit(42).subscribe(
        habit => fail('expected to fail'),
        error => expect(error.message).toContain(msg)
      );

      const req = httpTestingController.expectOne(`${service.habitsUrl}/${42}`);

      req.flush(msg, { status: 404, statusText: 'Not Found' });
    })
  })


});
