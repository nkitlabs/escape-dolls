import { makeAutoObservable } from 'mobx'

import { ItemDetails } from 'types/types'

export class ItemStore {
  public itemKeywordToName: Record<string, string>
  public existingItems: ItemDetails[]
  public selectedItems: Set<string>

  constructor() {
    this.itemKeywordToName = {}
    this.existingItems = []
    this.selectedItems = new Set()

    makeAutoObservable(this)
  }

  public addExistingItems = (items: ItemDetails[]) => {
    this.existingItems = items.concat(this.existingItems)
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
}

export const itemStore = new ItemStore()
