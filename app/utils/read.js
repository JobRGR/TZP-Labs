import fs from 'fs'

export default () => {
  const fileName = process.cwd() + '/app/data/index.json'
  return JSON.parse(fs.readFileSync(fileName, 'utf8'))
}
