import { useEffect, useState } from 'react'

import { dataLoaderService } from 'services/dataLoaderService'

export const useGameSetup = () => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const initTask = async () => {
      await dataLoaderService.setStoryMapping()
    }

    initTask().then(() => {
      setIsReady(true)
    })

    // in case we want a cleanup mechanism.
    return () => {}
  }, [])

  return { isReady }
}
