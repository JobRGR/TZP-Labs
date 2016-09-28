import fs from 'fs'

export default () => {
  const fileName = process.cwd() + '/app/data/index.json'
  fs.exists(fileName, exists => {
    if (!exists){
      fs.writeFile(fileName, JSON.stringify([{
        name: 'ADMIN',
        password: '',
        admin: true,
        active: true
      }]))
    }
  })
}
