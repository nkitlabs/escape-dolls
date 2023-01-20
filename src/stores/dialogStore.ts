import { DialogProps } from '@mui/material'
import { makeAutoObservable } from 'mobx'

export type DialogOptions = Partial<DialogProps> & {
  title?: string
  divider?: boolean
  isContentCenter?: boolean
  isHeaderHidden?: boolean
  backgroundColor?: string
  borderRadius?: number
  closeCallback?: () => void
}

export class DialogStore {
  public content: React.ElementType | string | null
  public options: DialogOptions
  public isOpen: boolean

  private readonly defaultOptions: DialogOptions = {
    divider: false,
    isContentCenter: false,
    isHeaderHidden: false,
    disableEscapeKeyDown: true,
  }

  constructor() {
    this.content = null
    this.options = this.defaultOptions
    this.isOpen = false
    makeAutoObservable(this)
  }

  public open = (content: React.ElementType | string | null, options: DialogOptions = {}) => {
    this.content = content
    this.options = { ...this.defaultOptions, ...options }
    this.isOpen = true
  }

  public close = () => {
    this.options.closeCallback?.()
    this.isOpen = false
  }
}

export const dialogStore = new DialogStore()
