import { Group } from "./Group"
import { Habit } from "./Habit"
import { User } from "./User"

export class DailyHabit{
  public date!: Date
  public checked: boolean = false
  public habit!: Habit
  public user!: User
  public group!: Group

  constructor(date: Date) {
    this.date = date
  }

  toggleCheck() {
    this.checked = !this.checked
  }
}
