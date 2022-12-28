import { makeAutoObservable } from 'mobx'

import { ItemDetails } from 'types/types'

export class GameStore {
  public dialogs: string[][]
  public imgRecord: Record<string, string>
  public storyRecord: Record<string, number>
  public items: ItemDetails[]
  constructor() {
    this.dialogs = []
    this.imgRecord = {}
    this.storyRecord = {}
    this.items = []
    makeAutoObservable(this)
  }

  public addStoryRecord = (key: string) => {
    this.storyRecord[key] = (this.storyRecord[key] ?? 0) + 1
  }

  public addDialog = (texts: string[]) => {
    this.dialogs.push(texts)
  }

  public addNewImage = (imgKey: string, imgUrl: string) => {
    this.imgRecord[imgKey] = imgUrl
  }

  public addItems = (items: ItemDetails[]) => {
    this.items.push(...items)
  }
}

export const gameStore = new GameStore()
