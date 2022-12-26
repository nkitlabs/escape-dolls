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
