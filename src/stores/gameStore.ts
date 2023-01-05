import { makeAutoObservable } from 'mobx'

import { ItemDetails, StoryInfo } from 'types/types'

export class GameStore {
  public dialogs: string[][]
  public dialogMapping: Record<string, string[]>
  public imgRecord: Record<string, string>
  public storyRecord: Record<string, StoryInfo>
  public itemKeywordToName: Record<string, string>
  public existingItems: ItemDetails[]
  public selectedItems: Set<string>
  public functionMapping: Record<number, (params: string[]) => unknown>

  constructor() {
    this.dialogs = []
    this.imgRecord = {}
    this.storyRecord = {}
    this.itemKeywordToName = {}
    this.dialogMapping = {}
    this.existingItems = []
    this.functionMapping = {}
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
    items.forEach((item) => item.possibleKeywords?.forEach((v) => (this.itemKeywordToName[v] = item.name)))
  }

  public removeExistingItem = (id: number) => {
    const item = this.existingItems[id]
    item.possibleKeywords?.forEach((v) => {
      delete this.itemKeywordToName[v]
    })
    this.existingItems.splice(id, 1)
  }

  public toggleSelectedItem = (key: string) => {
    this.selectedItems.has(key) ? this.selectedItems.delete(key) : this.selectedItems.add(key)
  }

  public replaceItem = (id: number, newItem: ItemDetails) => {
    const oldItem = this.existingItems[id]
    oldItem.possibleKeywords?.forEach((v) => {
      delete this.itemKeywordToName[v]
    })

    this.existingItems[id] = newItem
    if (this.selectedItems.has(newItem.key)) {
      this.selectedItems.delete(newItem.key)
    }
    newItem.possibleKeywords?.forEach((v) => (this.itemKeywordToName[v] = newItem.name))
  }

  public clearSelectedItems = () => {
    this.selectedItems.clear()
  }

  public registerFunctionsMapping = (id: number, f: (params: string[]) => unknown) => {
    this.functionMapping[id] = f
  }
}

export const gameStore = new GameStore()
