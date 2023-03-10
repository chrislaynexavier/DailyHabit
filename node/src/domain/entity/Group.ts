import { DailyHabit } from "./DailyHabit"
import { Habit } from "./Habit"
import { User } from "./User"

export class Group {
    public name!: string
    public habits: Habit[] = []
    public users: User[] = []
    public dailiesHabits: DailyHabit[] = []

    constructor(name: string){
        this.name = name
    }

    addHabit(habit: Habit){
        this.habits.push(habit)
    }

    addUser(user: User){
        this.users.push(user)
        user.groups.push(this)
    }

    addDailyHabit(dailyHabit: DailyHabit, habit: Habit){
            habit.addDailyHabit(dailyHabit)
            this.dailiesHabits.push(dailyHabit)
            dailyHabit.group = this
    }

}
