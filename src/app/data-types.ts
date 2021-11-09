export interface Habit {
  id: number,
  name: string,
  entryList: Entry[]
}

export interface Entry {
  timestamp: number,
  value: number
}
