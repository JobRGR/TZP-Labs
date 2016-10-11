import crypto from 'crypto'
const algorithm = 'RC4-HMAC-MD5'
const password = 'password' + Date.now()

export function encrypt(text){
  let cipher = crypto.createCipher(algorithm,password)
  let crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex')
  return crypted
}

export function decrypt(text){
  let decipher = crypto.createDecipher(algorithm, password)
  let dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8')
  return dec
}
