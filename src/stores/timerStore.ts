import { makeAutoObservable, runInAction } from 'mobx'

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
    this.timeLimit = 3600
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

  public addTimer(n: number) {
    this.timer += n
    this.countPenalty += 1
    this.totalPenalty += n
  }
}

export const timerStore = new TimerStore()
