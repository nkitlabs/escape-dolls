import { makeAutoObservable, runInAction } from 'mobx'

import { TIME_LIMIT } from 'types/constants'

import { formatSeconds } from 'utils/utils'

export class TimerStore {
  private _timeIntervalSetter: NodeJS.Timer

  public timer: number
  public timeLimit: number
  public countPenalty: number
  public totalPenalty: number

  constructor() {
    this.timer = 0
    this._timeIntervalSetter = setInterval(() => {
      runInAction(() => {
        this.timer += 1
      })
    }, 1000)
    this.timeLimit = TIME_LIMIT
    makeAutoObservable(this)
  }

  public resetTimer() {
    this.timer = 0
    this.countPenalty = 0
    this.totalPenalty = 0
    if (this._timeIntervalSetter) {
      clearInterval(this._timeIntervalSetter)
    }
    this._timeIntervalSetter = setInterval(() => {
      runInAction(() => {
        this.timer += 1
      })
    }, 1000)
  }

  public stopTimer() {
    if (this._timeIntervalSetter) {
      clearInterval(this._timeIntervalSetter)
    }
  }

  public addTimer(n: number) {
    this.timer += n
    this.countPenalty += 1
    this.totalPenalty += n
  }

  public get displayTimer() {
    if (this.timer <= this.timeLimit) {
      const left = this.timeLimit - this.timer
      return `Time left: ${formatSeconds(left)}`
    }

    return `Time used: ${formatSeconds(this.timer)}`
  }
}

export const timerStore = new TimerStore()
