function isObject (obj: any): boolean {
  return typeof obj === 'object' && !Array.isArray(obj)
}

function isEmpty (obj: any): boolean {
  if (obj === '') {
    return true
  }
  if (obj === null) {
    return true
  }
  if (obj === undefined) {
    return true
  }
  if (Array.isArray(obj) && obj.length === 0) {
    return true
  }
  return isObject(obj) && Object.getOwnPropertyNames(obj).length === 0
}

function deepPrune (obj: any, func = isEmpty, recurseArray = true) {
  if (Array.isArray(obj)) {
    if (recurseArray) {
      const newArray: any[] = []
      obj.forEach((item: any) => {
        if (!func(item)) {
          if (isObject(item) || Array.isArray(item)) {
            const temp = deepPrune(item, func, recurseArray)
            if (!func(temp)) {
              newArray.push(temp)
            }
          } else {
            newArray.push(item)
          }
        }
      })
      return newArray
    }
    return obj
  }
  if (isObject(obj)) {
    const newObj = Object.assign({}, obj)
    Object.keys(newObj).forEach((key) => {
      if (func(newObj[key])) {
        delete newObj[key]
      } else if (isObject(newObj[key]) || Array.isArray(newObj[key])) {
        const temp = deepPrune(newObj[key], func, recurseArray)
        if (!func(temp)) {
          newObj[key] = temp
        } else {
          delete newObj[key]
        }
      }
    })
    return newObj
  }
  return obj
}

function deepFunction (obj: any, f: (a: any) => any): any {
  if (Array.isArray(obj)) {
    return obj.map((item: any) => {
      if (isObject(item) || Array.isArray(item)) {
        return deepFunction(item, f)
      } else {
        return f(item)
      }
    })
  } else if (isObject(obj)) {
    const temp = Object.assign({}, obj)
    Object.keys(obj).forEach((key: any) => {
      temp[key] = deepFunction(temp[key], f)
    })
    return temp
  } else {
    return f(obj)
  }
}

export {
  isObject,
  deepPrune,
  deepFunction
}
