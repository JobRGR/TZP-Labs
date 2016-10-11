import fs from 'fs'
import { encrypt } from './crypto'

export default json => {
  if (process.env.NODE_ENV == 'production') {
    return null
  }
  const text = JSON.stringify(json, null, 4)
  const fileName = process.cwd() + '/app/data/'
  try {
    fs.writeFile(fileName + 'private.txt', encrypt(text))
    fs.writeFile(fileName + 'public.json', text)
  }
  catch (err) {
    console.log(err)
  }
}
