/**
 * 判断是否 为空
 */
 export function isValue(value) {
  return value !== '' && value !== undefined && value !== null
}

/**
 * 深拷贝
 * @param {Object} source
 * @returns {Object}
 */
 export function deepClone(source) {
  if (isValue(source) && !source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  let targetObj = {}
  try {
    targetObj = source.constructor === Array ? [] : {}
  } catch (err) {
    targetObj = {}
  }
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object' && source[keys].constructor !== Date) {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}