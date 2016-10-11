import fs from 'fs'
import { encrypt, decrypt  } from './crypto'

export default cb => {
  if (process.env.NODE_ENV == 'production') {
    return true
  }
  const text = JSON.stringify([{
    name: 'ADMIN',
    password: '',
    admin: true,
    active: true
  }], null, 4)
  const fileName = process.cwd() + '/app/data/'
  fs.exists(fileName + 'private.txt', exists => {
    if (!exists){
      fs.writeFile(fileName + 'private.txt', encrypt(text))
      fs.writeFile(fileName + 'public.json', text, cb)
    }
    else {
      const data = fs.readFileSync(fileName + 'private.txt', 'utf8')
      fs.writeFile(fileName + 'public.json', decrypt(data), cb)
    }
  })
}
