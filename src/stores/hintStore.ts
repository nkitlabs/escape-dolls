import { makeAutoObservable } from 'mobx'

import { HintInfo } from 'types/types'

export class HintStore {
  public displayedHints: HintInfo[]
  public possibleHints: HintInfo[]
  public unusedKeys: Set<string>

  constructor() {
    this.displayedHints = []
    this.possibleHints = []
    this.unusedKeys = new Set()

    makeAutoObservable(this)
  }

  public addDisplayedHints = () => {
    if (this.possibleHints.length) {
      this.displayedHints.push(this.possibleHints[0])
      this.possibleHints.splice(0, 1)
    }
  }

  public addPossibleHints = (hints: HintInfo[]) => {
    const activeHints = hints.filter((hint) => !this.unusedKeys.has(hint.key))
    this.possibleHints.push(...activeHints)
  }

  public removePossibleHints = (keys: string[]) => {
    for (const key of keys) {
      this.unusedKeys.add(key)
      const oldHintIndex = this.possibleHints.findIndex((oldHint) => oldHint.key === key)
      if (oldHintIndex !== -1) this.possibleHints.splice(oldHintIndex, 1)
    }
  }

  public clear = () => {
    this.displayedHints = []
    this.possibleHints = []
  }

  public get nextHint() {
    return this.possibleHints?.[0]
  }
}

export const hintStore = new HintStore()
