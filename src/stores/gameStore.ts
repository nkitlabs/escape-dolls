import { makeAutoObservable } from 'mobx'

import { StoryInfo } from 'types/types'

export class GameStore {
  public dialogs: string[][]
  public imgRecord: Record<string, string> // imgKey -> url
  public storyRecord: Record<string, StoryInfo> // storyKey -> info
  public functionMapping: Record<number, (params: string[]) => unknown> // id -> params

  constructor() {
    this.clear()
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

  public registerFunctionsMapping = (id: number, f: (params: string[]) => unknown) => {
    this.functionMapping[id] = f
  }

  public clear = () => {
    this.dialogs = []
    this.imgRecord = {}
    this.storyRecord = {}
  }
}

export const gameStore = new GameStore()
