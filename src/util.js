import _ from 'lodash'
import camelize from 'camelize'
import decamelize from 'decamelize'

function isEmpty (obj) {
  if (obj === '') {
    return true
  }
  if (obj === null) {
    return true
  }
  if (obj === undefined) {
    return true
  }
  if (!_.isArray(obj) && obj.length === 0) {
    return true
  }
  return typeof obj === 'object' && Object.getOwnPropertyNames(obj).length === 0
}

function deepPrune (obj, func = isEmpty, recurseArray = true) {
  if (_.isArray(obj)) {
    if (recurseArray) {
      const newArray = []
      obj.forEach((item) => {
        if (!func(item)) {
          if (_.isObject(item) || _.isArray(item)) {
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
  if (_.isObject(obj)) {
    const newObj = Object.assign({}, obj)
    Object.keys(newObj).forEach((key) => {
      if (func(newObj[key])) {
        delete newObj[key]
      } else if (_.isObject(newObj[key]) || _.isArray(newObj[key])) {
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

function camelizeObject (obj, isCamelizing = true) {
  if (!obj || typeof obj !== 'object') {
    return obj
  }
  const dest = {}
  Object.keys(obj).forEach((key) => {
    dest[isCamelizing ? camelize(key) : decamelize(key)] = obj[key]
  })
  return dest
}

function deepCamelize (obj, isCamelizing = true) {
  if (_.isArray(obj)) {
    return obj.map((item) => {
      if (_.isObject(item) || _.isArray(item)) {
        return deepCamelize(item, isCamelizing)
      }
      return item
    })
  }
  const newObj = Object.assign({}, obj)
  Object.keys(newObj).forEach((key) => {
    if (_.isObject(newObj[key]) || _.isArray(newObj[key])) {
      newObj[key] = deepCamelize(newObj[key], isCamelizing)
    }
  })
  return camelizeObject(newObj, isCamelizing)
}


export default {
  deepPrune,
  deepCamelize: (obj) => deepCamelize(obj, true),
  deepDecamelize: (obj) => deepCamelize(obj, false)
}
