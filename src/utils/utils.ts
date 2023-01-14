import { base64ToBinary } from 'utils/cryptography'
import { REGEX_METADATA_FILE_PREFIX } from 'utils/regex'

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
    blob = new Blob([Buffer.from(data.replace(REGEX_METADATA_FILE_PREFIX, ''), 'base64')])
  } else if (data.startsWith('data:application/json')) {
    link.download = filename ?? 'data.json'
    blob = new Blob([base64ToBinary(data.replace(REGEX_METADATA_FILE_PREFIX, ''))])
  } else if (data.startsWith('data:text')) {
    link.download = filename ?? 'data.txt'
    blob = new Blob([base64ToBinary(data.replace(REGEX_METADATA_FILE_PREFIX, ''))])
  } else {
    link.download = filename ?? 'encrpyted-data.txt'
    blob = new Blob([data])
  }

  const url = URL.createObjectURL(blob)
  link.href = url
  link.click()
}

export const formatSeconds = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, '0')
  const secs = (seconds % 60).toString().padStart(2, '0')
  if (seconds >= 3600) return `${hrs}:${mins}:${secs} h`
  else if (seconds >= 60) return `${mins}:${secs} min`
  else return `${secs} sec`
}
