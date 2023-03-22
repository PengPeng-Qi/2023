## Promise API

在 `Promise` 类中，有 6 中静态方法。

### Promise.all

假设我们希望并执行多个 promise，并等待所有 promise 都准备就绪。

```js
let promise = Promise.all(iterable);
```

`promise.all` 接受一个可迭代对象（通常是一个数组项为 promise 的数组），并返回一个新的 promise。

所有给定的 `promise` 都 `resolve` 时，新的 `promise` 才会 `resolve`，并且其结果数组将成为新 `promise` 的结果

```js
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000)), // 3
]).then(alert); // 1,2,3 当上面这些 promise 准备好时：每个 promise 都贡献了数组中的一个元素
```

请注意，结果数组中元素的顺序与其在源 `promise` 中的顺序相同。**即使第一个 `promise` 花费了最长的时间才 `resolve`，但它仍是结果数组中的第一个。**

**如果任意一个 `promise` 被 `reject`，由 `Promise.all` 返回的 `promise` 就会立即 `reject`，并且带有的就是这个 `error`。**

> 1. **如果一个 `promise` 被 `reject`，`Promise.all` 就会立即被 `reject` **
> 2. 如果这些对象中的任何一个不是 `promise`，那么它将被 **按原样** 传递给结果数组。

**一个常见的技巧是，将一个任务数据数组映射（map）到一个 `promise` 数组，然后将其包装到 `Promise.all`。**

### Promise.allSettled

`Promise.allSettled` 等待所有的 `promise` 都被 `settle`，无论结果如何。结果数组具有：

- `{status:"fulfilled", value:result}` 对于成功的响应
- `{status:"rejected", reason:error}` 对于 `error`

```js
let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://no-such-url",
];

Promise.allSettled(urls.map(url => fetch(url))).then(results => {
  // (*)
  /*
    results:
      [
        {status: 'fulfilled', value: ...response...},
        {status: 'fulfilled', value: ...response...},
        {status: 'rejected', reason: ...error object...}
      ]
     */
});
```

### Promise.race

与 `Promise.all` 类似，只等待第一个 `settled` 的 `promise` 并获取其结果（或 `error`）

```js
let promise = Promise.race(iterable);
```

```js
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(alert); // 1
```

### Promise.any

与 `Promise.race` 类似，区别在于 `Promise.any` 只等待第一个 `fulfilled` 的 `promise`，并将这个 `fulfilled` 的 `promise` 返回。

```js
let promise = Promise.any(iterable);
```

```js
Promise.any([
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 1000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(alert); // 1
```

如果所有 `promise` 都 `rejected`，则会抛出错误

```js
Promise.any([
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Ouch!")), 1000)
  ),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Error!")), 2000)
  ),
]).catch(error => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error!
});
```
