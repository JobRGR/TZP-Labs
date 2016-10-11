import fs from 'fs'

export default () => {
  const fileName = process.cwd() + '/app/data/'
  fs.exists(fileName + 'public.json', exists => {
    if (exists){
      fs.unlinkSync(fileName + 'public.json')
    }
    window.close()
  })
}
