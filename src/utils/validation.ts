const urlRegex = new RegExp(/^(http|https):\/\/[^ "]+$/)
// From http://emailregex.com/
const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

function validateUrl (url: string): boolean {
  return urlRegex.test(url)
}

function validateEmail (email: string): boolean {
  return emailRegex.test(email)
}

export {
  validateUrl,
  validateEmail
}
