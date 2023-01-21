export class NotFoundError extends Error {
  constructor(keyword?: string) {
    super(keyword ? `${keyword} not found` : 'not found')
    this.name = 'NotFoundError'
  }
}

export class DuplicateItemError extends Error {
  constructor(id?: string) {
    super(id ? `item ${id} is already in the list` : `item is already in the list`)
    this.name = 'DuplicateItemError'
  }
}

export class DuplicateStoryError extends Error {
  id: string
  constructor(id: string) {
    super(`story ${id} is already in the list`)
    this.name = 'DuplicateStoryError'
    this.id = id ?? 'an undefined story'
  }
}

export class SearchExistingItemError extends Error {
  itemName: string
  constructor(itemName: string) {
    super(`item ${itemName} is already in the list`)
    this.name = 'SearchExistingItemError'
    this.itemName = itemName
  }
}

export class StoryPenaltyError extends Error {
  constructor(id: string, penalty: number) {
    super(`incorrect action; story ${id} has a penalty ${penalty} second.`)
    this.name = 'StoryPenaltyError'
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

export class SolveItemError extends Error {
  constructor() {
    super('Incorrect!!')
    this.name = 'SolveItemError'
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
  'SearchExistingItemError',
  'CombineItemsError',
  'ObserveItemsError',
  'SearchItemsError',
  'StoryPenaltyError',
  'SolveItemError',
])
