import { makeAutoObservable, runInAction } from 'mobx'

export class TimerStore {
  private _timer: number
  private _timeIntervalSetter: NodeJS.Timer
  public isStartTimer: boolean
  constructor() {
    this._timer = 0
    this.isStartTimer = false
    this._timeIntervalSetter = setInterval(() => {
      runInAction(() => {
        this._timer += 1
      })
    }, 1000)
    makeAutoObservable(this)
  }

  public resetTimer() {
    this._timer = 0
    this.isStartTimer = true
    if (this._timeIntervalSetter) {
      clearInterval(this._timeIntervalSetter)
    }
    this._timeIntervalSetter = setInterval(() => {
      runInAction(() => {
        this._timer += 1
      })
    }, 1000)
  }

  public addTimer(n: number) {
    this._timer += n
  }

  public get timer() {
    return this._timer
  }
}

export const timerStore = new TimerStore()
