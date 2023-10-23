function deepClone(target, map = new Map()) {
  if (typeof target !== 'object' || target === null) {
    return target
  }

  if (map.has(target)) {
    return map.get(target)
  }

  let obj = Array.isArray(target) ? [] : {}
  map.set(target, obj)

  for (const key in target) {
    obj[key] = deepClone(target[key], map)
  }

  return obj
}

let obj = {
  a: 1,
  b: {
    c: 2
  }
}

obj.self = obj // 创建一个循环引用
