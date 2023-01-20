import { makeAutoObservable } from 'mobx'

import { StoryInfo } from 'types/types'

export class GameStore {
  public dialogs: string[][]
  public imgIdToUrl: Record<string, string>
  public storyIdToInfo: Record<string, StoryInfo>
  public functionIdMapping: Record<number, (params: string[]) => unknown> // id -> params

  constructor() {
    this.clear()
    this.functionIdMapping = {}
    makeAutoObservable(this)
  }

  public addStoryInfo = (id: string, info: StoryInfo) => {
    this.storyIdToInfo[id] = info
  }

  public addDialog = (texts: string[]) => {
    this.dialogs.push(texts)
  }

  public addNewImage = (imgId: string, imgUrl: string) => {
    this.imgIdToUrl[imgId] = imgUrl
  }

  public registerFunctionsMapping = (id: number, f: (params: string[]) => unknown) => {
    this.functionIdMapping[id] = f
  }

  public clear = () => {
    this.dialogs = []
    this.imgIdToUrl = {}
    this.storyIdToInfo = {}
  }
}

export const gameStore = new GameStore()
