export class NotFoundError extends Error {
  constructor(keyword?: string) {
    super(keyword ? `${keyword} not found` : 'not found')
    this.name = 'NotFoundError'
  }
}

export class DuplicateItemError extends Error {
  constructor(key?: string) {
    super(key ? `item ${key} is already in the list` : `item is already in the list`)
    this.name = 'DuplicateItemError'
  }
}

export class DuplicateStoryError extends Error {
  constructor(key?: string) {
    super(key ? `story ${key} is already in the list` : `story is already in the list`)
    this.name = 'DuplicateStoryError'
  }
}

export class CombineItemsError extends Error {
  constructor() {
    super('He cannot combine selected items.')
    this.name = 'CombineItemsError'
  }
}

export class ObserveItemsError extends Error {
  constructor(itemName?: string) {
    super(itemName ? `He cannot observe an item ${itemName}.` : 'He cannot observe an item.')
    this.name = 'ObserveItemsError'
  }
}

export class SearchItemsError extends Error {
  constructor(item?: string) {
    super(`He doesn't see ${item ?? 'an item'} in this room.`)
    this.name = 'SearchItemsError'
  }
}

export const customErrorName = new Set([
  'NotFoundError',
  'DuplicateItemError',
  'DuplicateStoryError',
  'CombineItemsError',
  'ObserveItemsError',
  'SearchItemsError',
])
