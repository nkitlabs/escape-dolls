import { makeAutoObservable } from 'mobx'

import { ItemDetails } from 'types/types'

export class ItemStore {
  public idToName: Record<string, string>
  public existingItems: ItemDetails[]
  public selectedIds: Set<string>

  constructor() {
    this.clear()
    makeAutoObservable(this)
  }

  public addExistingItems = (items: ItemDetails[]) => {
    this.existingItems = items.concat(this.existingItems)
    items.map((item) => {
      for (const id of item.relatedIds ?? []) {
        this.idToName[id] = item.name
      }
    })
  }

  public removeExistingItem = (index: number) => {
    const item = this.existingItems[index]
    for (const id of item.relatedIds ?? []) {
      delete this.idToName[id]
    }

    this.existingItems.splice(index, 1)
  }

  public toggleSelectedItem = (id: string) => {
    this.selectedIds.has(id) ? this.selectedIds.delete(id) : this.selectedIds.add(id)
  }

  public replaceItem = (index: number, newItem: ItemDetails) => {
    const oldItem = this.existingItems[index]
    for (const id of oldItem.relatedIds ?? []) {
      delete this.selectedIds[id]
    }

    this.existingItems[index] = newItem
    if (this.selectedIds.has(newItem.id)) {
      this.selectedIds.delete(newItem.id)
    }
    for (const id of newItem.relatedIds ?? []) {
      this.idToName[id] = newItem.name
    }
  }

  public clearSelectedItems = () => {
    this.selectedIds.clear()
  }

  public clear = () => {
    this.idToName = {}
    this.existingItems = []
    this.selectedIds = new Set()
  }
}

export const itemStore = new ItemStore()
