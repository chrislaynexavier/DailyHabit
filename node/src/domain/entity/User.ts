import { DailyHabit } from "./DailyHabit"
import { Group } from "./Group"

export class User {
    public email!: string
    public password!: string
    public dailiesHabits: DailyHabit[] = []
    public groups: Group[] = []
    
    constructor(email: string, password: string){
        this.email = email
        this.password = password
    }

    addDailyHabit(dailyHabit: DailyHabit){
        this.dailiesHabits.push(dailyHabit)
        dailyHabit.user = this
    }
}
