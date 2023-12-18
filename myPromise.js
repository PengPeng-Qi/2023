/**
 * @description 执行异步函数
 * @param  {} callback
 */
function runAsyncTask(callback) {
  if (typeof queueMicrotask === 'function') {
    queueMicrotask(callback)
  } else if (typeof MutationObserver === 'function') {
    const obs = new MutationObserver(callback)
    const divNode = document.createElement('div')
    obs.observe(divNode, { childList: true })
    divNode.innerHTML = 'test'
  } else {
    setTimeout(callback, 0)
  }
}

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class myPromise {
  status = PENDING
  result = undefined

  // 存储回调函数
  #handler = [] // [{ onFulfilled, onRejected }]

  constructor(func) {
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.result = value
        // 处理异步调用
        this.#handler.forEach(({ onFulfilled }) => {
          onFulfilled(this.result)
        })
      }
    }
    const reject = (value) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.result = value
        // 处理异步调用
        this.#handler.forEach(({ onRejected }) => {
          onRejected(this.result)
        })
      }
    }

    try {
      // 执行函数
      func(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    /* 没有该函数的时候参数 x 是来自于下面传递的 this.result */
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (x) => x
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (x) => {
            throw x
          }

    // 放在 myPromise 里面是为了获取到 onFulfilled 的返回值
    const p = new myPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        runAsyncTask(() => {
          try {
            // then 函数中的返回值
            const resPromise = onFulfilled(this.result)
            resolvePromise(resPromise, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.status === REJECTED) {
        runAsyncTask(() => {
          try {
            const resPromise = onRejected(this.result)
            resolvePromise(resPromise, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
        // 存储异步调用回调函数和多次调用
      } else if (this.status === PENDING) {
        this.#handler.push({
          onFulfilled: () => {
            runAsyncTask(() => {
              try {
                const resPromise = onFulfilled(this.result)
                resolvePromise(resPromise, resolve, reject)
              } catch (error) {
                reject(error)
              }
            })
          },
          onRejected: () => {
            runAsyncTask(() => {
              try {
                const resPromise = onRejected(this.result)
                resolvePromise(resPromise, resolve, reject)
              } catch (error) {
                reject(error)
              }
            })
          }
        })
      }
    })

    const resolvePromise = function (resPromise, resolve, reject) {
      if (resPromise === p) {
        throw new TypeError('Chaining cycle detected for promise #<Promise>')
      }

      // 如果在 then 里面返回了 promise
      if (resPromise instanceof myPromise) {
        // 在 then 里面获取返回的 promise 的状态
        resPromise.then(
          (res) => {
            // 将获取到的返回的 promise 的值 resolve 给下一个 then
            resolve(res)
          },
          (err) => {
            reject(err)
          }
        )
      } else {
        resolve(resPromise)
      }
    }

    return p
  }

  // reject 或者 throw error 可以触发该函数、会返回一个 promise 对象
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  // 无论成功失败，都会执行该函数，且不接收参数，会返回一个 promise 对象
  // 参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally#%E6%8F%8F%E8%BF%B0
  finally(onFinally) {
    return this.then(onFinally, onFinally)
  }

  // 如果传入的值是常规值，则转换为 Promise 并返回，如果本身是 promise，则直接运行并返回。
  static resolve(value) {
    if (value instanceof myPromise) {
      return value
    } else {
      return new myPromise((resolve) => {
        resolve(value)
      })
    }
  }

  static reject(value) {
    return new myPromise((_, reject) => {
      reject(value)
    })
  }

  // 返回一个 promise、判断参数是否是数组、等待第一个值敲定
  // 参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
  static race(promises) {
    return new myPromise((resolve, reject) => {
      if (Array.isArray(promises)) {
        promises.forEach((p) => {
          // 处理参数，统一修改为 promise
          // 此处其实参数中的多个 promise 都运行了，只是返回的 promise 的状态只能修改一次，所以只有最开始的那个有结果
          myPromise.resolve(p).then(
            (res) => {
              resolve(res)
            },
            (err) => {
              reject(err)
            }
          )
        })
      } else {
        reject(new TypeError('Argument is not iterable'))
      }
    })
  }

  // 参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  static all(promises) {
    return new myPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        reject(new TypeError('Argument is not iterable'))
      }

      // 如果是空数组，直接兑现，返回空数组
      promises.length === 0 && resolve(promises)

      // 记录结果
      let resArr = []
      // 记录存储次数
      let count = 0
      promises.forEach((p, index) => {
        myPromise.resolve(p).then(
          (res) => {
            // 使用索引的目的是为了返回的结果顺序一致
            resArr[index] = res
            count++
            // 判断全部兑现、返回结果
            count === promises.length && resolve(resArr)
          },
          (err) => {
            // 处理第一个 reject
            reject(err)
          }
        )
      })
    })
  }

  // 参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
  static allSettled(promises) {
    return new myPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        reject(new TypeError('undefined is not iterable'))
      }

      // 如果是空数组，直接兑现，返回空数组
      promises.length === 0 && resolve(promises)

      // 记录结果
      let resArr = []
      // 记录存储次数
      let count = 0

      promises.forEach((p, index) => {
        myPromise.resolve(p).then(
          (res) => {
            // 使用索引的目的是为了返回的结果顺序一致
            resArr[index] = { status: FULFILLED, value: res }
            count++

            // 判断全部兑现、返回结果
            count === promises.length && resolve(resArr)
          },
          (err) => {
            resArr[index] = { status: REJECTED, reason: err }
            count++

            // 判断全部兑现、返回结果
            count === promises.length && resolve(resArr)
          }
        )
      })
    })
  }

  // 参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/any
  static any(promises) {
    return new myPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        reject(new TypeError('undefined is not iterable'))
      }

      // 如果是空数组，直接兑现，返回空数组
      promises.length === 0 &&
        reject(new AggregateError(promises, 'All promises were rejected'))

      // 记录结果
      let errArr = []
      // 记录存储次数
      let count = 0

      promises.forEach((p, index) => {
        myPromise.resolve(p).then(
          (res) => {
            // 第一个兑现
            resolve(res)
          },
          (err) => {
            // 将所有 error 兑现
            errArr[index] = err
            count++
            promises.length === count &&
              reject(new AggregateError(errArr, 'All promises were rejected'))
          }
        )
      })
    })
  }
}

let p1 = new myPromise((resolve, reject) => {
  reject(1)
})

let p2 = new myPromise((resolve, reject) => {
  setTimeout(() => {
    reject(2)
  }, 1000)
})

myPromise.any([p1, p2]).then(
  (res) => {
    console.log('res', res)
  },
  (err) => {
    console.dir(err)
  }
)
