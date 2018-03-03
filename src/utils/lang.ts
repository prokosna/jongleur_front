function getLanguage (): string {
  try {
    navigator.language.substr(0, 2)
  } catch (e) {
    return 'en'
  }
}

export default {
  getLanguage
}
