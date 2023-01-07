import { useEffect, useState } from 'react'

import { dataLoaderService } from 'services/dataLoaderService'

import { gameStore } from 'stores/gameStore'

import { openItem01Modal } from 'views/core/CoreEscapeGame/Item01Modal'
import { openItem02Modal } from 'views/core/CoreEscapeGame/Item02Modal'

export const useGameSetup = () => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (isReady) return
    const initTask = async () => {
      await dataLoaderService.setStoryMapping()
      gameStore.registerFunctionsMapping(1, openItem01Modal)
      gameStore.registerFunctionsMapping(2, openItem02Modal)
    }

    initTask().then(() => {
      setIsReady(true)
    })

    // in case we want a cleanup mechanism.
    return () => {}
  }, [])

  return { isReady }
}
