function addStrings(str1, str2) {
  let arr1 = str1.split('')
  let arr2 = str2.split('')

  let count = Math.max(arr1.length, arr2.length)
  let resArr = []

  while (count) {
    let res
    if (arr1.length && arr2.length) {
      res = +arr1.at(-1) + +arr2.at(-1)
    } else if (arr1.length) {
      res = +arr1.at(-1)
    } else {
      res = +arr2.at(-1)
    }

    if (res > 9) {
      resArr.unshift(String(res)[1])
      arr1.pop()
      arr2.pop()
      if (arr1.length === 0 && arr2.length === 0) {
        resArr.unshift(String(res)[0])
      }

      if (arr1.length) {
        arr1[arr1.length - 1] = +arr1[arr1.length - 1] + +String(res)[0]
      } else {
        arr2[arr2.length - 1] = +arr2[arr2.length - 1] + +String(res)[0]
      }
    } else {
      resArr.unshift(String(res))
      arr1.pop()
      arr2.pop()
    }

    count--
  }

  return resArr.join('')
}
