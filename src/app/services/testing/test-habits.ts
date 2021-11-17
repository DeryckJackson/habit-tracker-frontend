import { Habit } from "src/app/data-types";
import { Entry } from "src/app/data-types";

export function getTestHabits(): Habit[] {
  return [{
    id: 1,
    name: 'foo',
    entryList: generateEntryList()
  },
  {
    id: 2,
    name: 'bar',
    entryList: generateEntryList()
  }];
}

function generateEntryList(): Entry[] {
  const twentyFourHoursInMs = 8.64e+7;
  let entryList: Entry[] = [{ timestamp: Date.now(), value: returnOne() },];

  for (let i = 1; i < 7; i++) {
    entryList.push({
      timestamp: Date.now() - (twentyFourHoursInMs * i),
      value: returnOne()
    });
  }

  return entryList;
}

function returnOne() {
  return 1;
}
