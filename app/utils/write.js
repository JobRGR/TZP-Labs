import fs from 'fs'

export default (json) => {
  return
  const fileName = process.cwd() + '/index.json'
  try {
    fs.writeFile(fileName, JSON.stringify(json, null, 4))
  }
  catch (err) {
    console.log(err)
  }
}
