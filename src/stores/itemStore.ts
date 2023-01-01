import { makeAutoObservable } from 'mobx'

import { DuplicateItemError, NotFoundError } from 'types/errors'
import { ItemDetails } from 'types/types'

export class ItemStore {
  public existingItems: ItemDetails[]
  public selectedItems: Set<string>

  constructor() {
    this.existingItems = []
    this.selectedItems = new Set()
    makeAutoObservable(this)
  }

  public addExistingItem = (item: ItemDetails) => {
    if (this.existingItems.filter((v) => v.key === item.key).length > 0) {
      throw new DuplicateItemError(item.key)
    }

    this.existingItems.push(item)
  }

  public removeItem = (key: string) => {
    if (this.existingItems.filter((v) => v.key === key).length === 0) {
      throw new NotFoundError('item')
    }
    const id = this.existingItems.findIndex((v) => v.key === key)
    this.existingItems = this.existingItems.splice(id, 1)
  }

  public toggleSelectedItems = (key: string) => {
    if (this.existingItems.filter((v) => v.key === key).length === 0) {
      throw new NotFoundError('item')
    }

    this.selectedItems.has(key) ? this.selectedItems.delete(key) : this.selectedItems.add(key)
  }

  public replaceItem = (oldKey: string, newItem: ItemDetails) => {
    this.existingItems.forEach((item, id) => {
      if (item.key !== oldKey) return

      this.existingItems[id] = newItem
    })
  }
}

export const itemStore = new ItemStore()
