import { DailyHabit } from "../src/domain/entity/DailyHabit"
import { Group } from "../src/domain/entity/Group"
import { Habit } from "../src/domain/entity/Habit"
import {User} from "../src/domain/entity/User"

describe('group', () => {
    let newGroup!: Group
    let nameGroup: string = 'family'
    let habit1!: Habit
    let habitName1: string = 'Go to the gym'
    let habit2!: Habit
    let habitName2: string = 'drink water'
    let user1!: User 
    let user2!: User
    let userName1: string = 'iury@gmail.com'
    let userName2: string = 'marcos@gmail.com'
    let userPassword1: string = 'thispassword'
    let userPassword2: string = 'book'
    let date = new Date()
    let newDailyHabit!: DailyHabit


    beforeEach(() => {
        newGroup = new Group(nameGroup)
        habit1 = new Habit(habitName1)
        habit2 = new Habit(habitName2)
        user1 = new User(userName1, userPassword1)
        user2 = new User(userName2, userPassword2)
        newDailyHabit = new DailyHabit(date)
    })

    it('should have a group with correct name', () => {
        expect(newGroup.name).toBe(nameGroup)
    })

    it('should have a group with habits', () => {
        newGroup.addHabit(habit1)
        newGroup.addHabit(habit2)
        expect(newGroup.habits).toContain(habit1)
        expect(newGroup.habits).toContain(habit2)
    })

    it('should have a group with users', () => {
        newGroup.addUser(user1)
        newGroup.addUser(user2)
        expect(newGroup.users).toContain(user1)
        expect(newGroup.users).toContain(user2)
    })

    it('should have a daily habit when add', () => {
        newGroup.addHabit(habit1)
        newGroup.addDailyHabit(newDailyHabit, habit1)
        expect(newGroup.dailiesHabits).toContain(newDailyHabit)
    })

    it('should add a daily habit with a habit parent', () => {
        newGroup.addDailyHabit(newDailyHabit, habit1)
        expect(newDailyHabit.habit.name).toBe(habitName1)
    })
})
