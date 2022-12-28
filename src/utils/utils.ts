import { TIME_LIMIT } from 'types/constants'

import { base64ToBinary } from 'utils/cryptography'
import { METADATA_FILE_PREFIX_REGEX } from 'utils/regex'

/**
 * export the given data into a local
 * @param data the given data (base64 format)
 * @param filename optional, name of the file to be downloaded
 */
export const downloadData = (data: string, filename?: string): void => {
  if (!data) return

  let blob: Blob
  const link = document.createElement('a')

  if (data.startsWith('data:image')) {
    link.download = filename ?? 'image.png'
    blob = new Blob([Buffer.from(data.replace(METADATA_FILE_PREFIX_REGEX, ''), 'base64')])
  } else if (data.startsWith('data:application/json')) {
    link.download = filename ?? 'data.json'
    blob = new Blob([base64ToBinary(data.replace(METADATA_FILE_PREFIX_REGEX, ''))])
  } else if (data.startsWith('data:text')) {
    link.download = filename ?? 'data.txt'
    blob = new Blob([base64ToBinary(data.replace(METADATA_FILE_PREFIX_REGEX, ''))])
  } else {
    link.download = filename ?? 'encrpyted-data.txt'
    blob = new Blob([data])
  }

  const url = URL.createObjectURL(blob)
  link.href = url
  link.click()
}

/**
 * display time with formatter.
 * @param timer actual timer.
 * @param timeLimit timeLimit of the game.
 * @returns a string represents a time used/left.
 */
export const displayTimer = (timer: number, timeLimit: number = TIME_LIMIT): string => {
  if (timer <= timeLimit) {
    const left = timeLimit - timer
    const hrLeft = Math.floor(left / 3600)
    const minLeft = Math.floor((left % 3600) / 60)
      .toString()
      .padStart(2, '0')
    const secLeft = (left % 60).toString().padStart(2, '0')
    if (left >= 3600) return `Time left: ${hrLeft}:${minLeft}:${secLeft} h`
    else if (left >= 60) return `Time left: ${minLeft}:${secLeft} min`
    else return `Time left: ${secLeft} sec`
  }

  const hrUsed = Math.floor(timer / 3600)
  const minUsed = Math.floor((timer % 3600) / 60)
    .toString()
    .padStart(2, '0')
  const secUsed = (timer % 60).toString().padStart(2, '0')
  if (timer >= 3600) return `Time used: ${hrUsed}:${minUsed}:${secUsed} h`
  else if (timer >= 60) return `Time used: ${minUsed}:${secUsed} min`
  else return `Time used: ${secUsed} sec`
}
