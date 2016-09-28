import fs from 'fs'

export default (json) => {
  const fileName = process.cwd() + '/app/data/index.json'
  try {
    fs.writeFile(fileName, JSON.stringify(json, null, 4))
  }
  catch (err) {
    console.log(err)
  }
}