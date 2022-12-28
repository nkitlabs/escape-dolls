import { BinaryLike, createCipheriv, createDecipheriv, createHash, randomBytes } from 'crypto'
import { isString } from 'lodash'

import { METADATA_FILE_PREFIX_REGEX } from 'utils/regex'

// https://stackoverflow.com/questions/1220751/how-to-choose-an-aes-encryption-mode-cbc-ecb-ctr-ocb-cfb
// https://www.geeksforgeeks.org/node-js-crypto-createhash-method/
const ENCRYPT_ALGO = 'aes-256-ctr'

export const encryptWithSalt = (data: BinaryLike, hexKey: string, iv: BinaryLike) => {
  const key = Buffer.from(hexKey, 'hex')
  const cipher = createCipheriv(ENCRYPT_ALGO, key, iv)
  return Buffer.concat([cipher.update(data), cipher.final()])
}

export const decryptWithSalt = (data: NodeJS.ArrayBufferView, hexKey: string, iv: BinaryLike) => {
  const key = Buffer.from(hexKey, 'hex')
  const cipher = createDecipheriv(ENCRYPT_ALGO, key, iv)
  return Buffer.concat([cipher.update(data), cipher.final()])
}

export const getHash = (key: string) => {
  return createHash('sha256').update(key).digest().toString('hex')
}

export const randomIv = (n: number = 8) => {
  return randomBytes(n).toString('hex')
}

export const base64ToBinary = (data: string): string => {
  return Buffer.from(data, 'base64').toString('binary')
}

/**
 * read decrypted data and decode the data from base64 format to text (actual data).
 * @param file the input file
 * @return returns string, the data of the file
 */
export const getDecryptedDataFromFile = async (file?: File): Promise<string> => {
  if (!file) return ''

  const reader = new FileReader()
  reader.readAsDataURL(file)

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      let newData: string | undefined

      if (isString(reader.result)) {
        newData = reader.result.replace(METADATA_FILE_PREFIX_REGEX, '')

        // we encode base64 before we write the data, need to convert back
        resolve(Buffer.from(newData, 'base64').toString('binary'))
      }

      // not support ArrayBuffer type
      reject('type not support')
    }
  })
}
