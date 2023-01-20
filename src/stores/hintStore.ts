import { makeAutoObservable } from 'mobx'

import { HintInfo } from 'types/types'

export class HintStore {
  public displayedHints: HintInfo[]
  public possibleHints: HintInfo[]
  public obsoleteIds: Set<string>

  constructor() {
    this.clear()
    makeAutoObservable(this)
  }

  public addDisplayedHints = () => {
    if (this.possibleHints.length) {
      this.displayedHints.push(this.possibleHints[0])
      this.possibleHints.splice(0, 1)
    }
  }

  public addPossibleHints = (hints: HintInfo[]) => {
    const activeHints = hints.filter((hint) => !this.obsoleteIds.has(hint.id))
    this.possibleHints.push(...activeHints)
  }

  public removePossibleHints = (ids: string[]) => {
    for (const id of ids) {
      this.obsoleteIds.add(id)
      const oldHintIndex = this.possibleHints.findIndex((oldHint) => oldHint.id === id)
      if (oldHintIndex !== -1) this.possibleHints.splice(oldHintIndex, 1)
    }
  }

  public clear = () => {
    this.displayedHints = []
    this.possibleHints = []
    this.obsoleteIds = new Set()
  }

  public get nextHint() {
    return this.possibleHints[0]
  }
}

export const hintStore = new HintStore()
