import fs from 'fs'

export default () => {
  const fileName = process.cwd() + '/app/data/public.json'
  return process.env.NODE_ENV == 'production' ? [] : JSON.parse(fs.readFileSync(fileName, 'utf8'))
}
