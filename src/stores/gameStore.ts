import { makeAutoObservable } from 'mobx'

import { ItemDetails, StoryInfo } from 'types/types'

export class GameStore {
  public dialogs: string[][]
  public dialogMapping: Record<string, string[]>
  public imgRecord: Record<string, string>
  public storyRecord: Record<string, StoryInfo>
  public existingItems: ItemDetails[]
  public selectedItems: Set<string>

  constructor() {
    this.dialogs = []
    this.imgRecord = {}
    this.storyRecord = {}
    this.dialogMapping = {}
    this.existingItems = []
    this.selectedItems = new Set()

    makeAutoObservable(this)
  }

  public addStoryInfo = (key: string, info: StoryInfo) => {
    this.storyRecord[key] = info
  }

  public addDialog = (texts: string[]) => {
    this.dialogs.push(texts)
  }

  public addNewImage = (imgKey: string, imgUrl: string) => {
    this.imgRecord[imgKey] = imgUrl
  }

  public addDialogMapping = (key: string, texts: string[]) => {
    this.dialogMapping[key] = texts
  }

  public addExistingItems = (items: ItemDetails[]) => {
    this.existingItems.push(...items)
  }

  public removeExistingItem = (id: number) => {
    this.existingItems = this.existingItems.splice(id, 1)
  }

  public toggleSelectedItem = (key: string) => {
    this.selectedItems.has(key) ? this.selectedItems.delete(key) : this.selectedItems.add(key)
  }

  public replaceItem = (id: number, newItem: ItemDetails) => {
    this.existingItems[id] = newItem
    if (this.selectedItems.has(newItem.key)) {
      this.selectedItems.delete(newItem.key)
    }
  }

  public clearSelectedItems = () => {
    this.selectedItems.clear()
  }
}

export const gameStore = new GameStore()
