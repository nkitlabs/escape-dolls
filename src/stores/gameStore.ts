import { makeAutoObservable } from 'mobx'

import { StoryInfo } from 'types/types'

export class GameStore {
  public dialogs: string[][]
  public dialogMapping: Record<string, string[]>
  public imgRecord: Record<string, string>
  public storyRecord: Record<string, StoryInfo>
  public functionMapping: Record<number, (params: string[]) => unknown>

  constructor() {
    this.dialogs = []
    this.imgRecord = {}
    this.storyRecord = {}
    this.dialogMapping = {}
    this.functionMapping = {}

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

  public registerFunctionsMapping = (id: number, f: (params: string[]) => unknown) => {
    this.functionMapping[id] = f
  }

  public clear = () => {
    this.dialogs = []
    this.imgRecord = {}
    this.storyRecord = {}
    this.dialogMapping = {}
  }
}

export const gameStore = new GameStore()
