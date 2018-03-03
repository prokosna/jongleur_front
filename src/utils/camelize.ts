import { isObject } from 'util'

function snakeToCamel (src: string): string {
  return src.replace(/_./g, (s: string) => {
    return s.charAt(1).toUpperCase()
  })
}

function camelToSnake (src: string): string {
  return src.replace(/([A-Z])/g, (s: string) => {
    return `_${s.charAt(0).toLowerCase()}`
  })
}

function snakeToCamelObj (src: any): {} {
  if (Array.isArray(src)) {
    return src.map((item: any) => {
      if (isObject(item) || Array.isArray(item)) {
        return snakeToCamelObj(item)
      }
    })
  }
  if (isObject(src)) {
    const obj: any = {}
    Object.keys(src).forEach((key) => {
      obj[snakeToCamel(key)] = src[key]
    })
    return obj
  }
  return src
}

function camelToSnakeObj (src: any): {} {
  if (Array.isArray(src)) {
    return src.map((item: any) => {
      if (isObject(item) || Array.isArray(item)) {
        return camelToSnakeObj(item)
      }
    })
  }
  if (isObject(src)) {
    const obj: any = {}
    Object.keys(src).forEach((key) => {
      obj[camelToSnake(key)] = src[key]
    })
    return obj
  }
  return src
}

export {
  snakeToCamel,
  camelToSnake,
  snakeToCamelObj,
  camelToSnakeObj
}
