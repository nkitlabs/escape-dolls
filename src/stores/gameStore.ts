import { makeAutoObservable } from 'mobx'

import { StoryInfo } from 'types/types'

export class GameStore {
  public dialogs: string[][]
  constructor() {
    this.dialogs = []
    makeAutoObservable(this)
  }

  public addNewStory = (info: StoryInfo) => {
    console.log('!!! add new Story')
    if (info.dialogs) {
      this.dialogs.push(info.dialogs)
    }
  }
}

export const gameStore = new GameStore()
