import { DailyHabit } from "../src/domain/entity/DailyHabit"
import { Habit } from "../src/domain/entity/Habit"
import { User } from "../src/domain/entity/User"
import { Group } from"../src/domain/entity/Group"

describe('daily Habit', () => {
  let newDailyHabit!: DailyHabit
  let date = new Date()
  const habitName = 'drink water'
  let habit !: Habit
  let newUser: User
  let email = "chris@gmail.com"
  let password = "123456"
  let newGroup!: Group
  let nameGroup: string = 'family'

  beforeEach(() => {
    newDailyHabit = new DailyHabit(date)
    newUser = new User(email, password)
    newGroup = new Group(nameGroup)
    habit = new Habit(habitName)
  })

  it('should have a date', () => {
    expect(newDailyHabit.date).toBe(date)
    expect(newDailyHabit.date).toBeInstanceOf(Date)
  })

  it('should habit start with check false', () => {
    expect(newDailyHabit.checked).toBe(false)
  })

  it('should have checked equals to true when toggle once', () => {
    newDailyHabit.toggleCheck()
    expect(newDailyHabit.checked).toBe(true)
  } )

  it('should have checked equals to false when toggle twice', () => {
    newDailyHabit.toggleCheck()
    newDailyHabit.toggleCheck()
    expect(newDailyHabit.checked).toBe(false)
  })

  it('should have a habit parent', () => {
    habit.addDailyHabit(newDailyHabit)
    expect(newDailyHabit.habit).toBe(habit)
  });

  it('should have the name of habit parent', () => {
    habit.addDailyHabit(newDailyHabit)
    expect(newDailyHabit.habit.name).toBe(habitName)
  });

  it('should have the user', () => {
    newUser.addDailyHabit(newDailyHabit)
    expect(newDailyHabit.user).toBe(newUser)
  })

  it('should have a group', () => {
    newGroup.addDailyHabit(newDailyHabit, habit)
    expect(newDailyHabit.group).toBe(newGroup)
  })
})
