import write from './write'
import read from './read'

export default (name, password) => {
  const json = read()
 json.push({
    name, password,
    admin: false,
    active: true,
    rule: false
  })
  write(json)
}
