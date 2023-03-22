## Promise

异步函数应该始终返回一个 promise，这样可以使得之后计划的行为成为可能。

### executor

`executor` 只能被调用一次 `resolve` 或一个 `reject`，任何状态的更改都是最终的，所有其他**再对 `resolve` 或者 `reject` 的调用都会被忽略**，但是其他代码任然执行。

### then

1. 如果只对成功完成的情况感兴趣，那么可以只为 `.then` 提供一个函数参数

2. 每个对 `.then` 的调用都会返回一个新的 `promise`，因此，可以在此基础上调用下一个 `.then`，当处理程序返回一个值时，将成为该 `promise` 的 `result`，会再使用它调用下一个 `.then`

3. `.then()` 中所使用的处理程序可以创建并返回一个 `promise`，这种情况下，处理程序将等待它调用 `reslove` 或者 `reject` 后再获得其结果

### catch

如果只针对 `error` 感兴趣，可以使用 `null` 作为第一个参数，或者使用 `.catch`

```js
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// .catch(f) 与 promise.then(null, f) 一样
promise.catch(alert);
```

> `.catch` 是 `.then(null, f)` 的语法糖，通常情况下，被附加到链的末尾

#### 隐式 try...catch

`promise` 的 **`executor` 和 `promise` 的处理程序周围有一个隐式的 `try...catch`**，如果发生异常（同步错误），就会被捕获。

```js
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
}).catch(alert); // Error: Whoops!

// 这两段代码完全相同
new Promise((resolve, reject) => {
  reject(new Error("Whoops!"));
}).catch(alert); // Error: Whoops!
```

```js
new Promise((resolve, reject) => {
  resolve("ok");
})
  .then(result => {
    throw new Error("Whoops!"); // reject 这个 promise
  })
  .catch(alert); // Error: Whoops!
```

##### 例子

```js
new Promise(function (resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
// 不会捕获错误，因为try catch 只捕获同步错误，这里的错误不是在 executor 运行时产生的，而是在稍后生成的
```

```js
new Promise(function (resolve, reject) {
  setTimeout(() => {
    reject(new Error("Whoops!"));
  }, 1000);
}).catch(alert);
// 会alert错误
```

### finally

1. `.finally(f)` 类似于 `.then(f, f)`，无论 `promise` `resolve` 还是 `reject` 都会执行 `f`

2. **`finally` 的处理函数中是没有参数的，`finally` 处理程序将结果或 `error` 传递给下一个合适的处理函数， `promise` 的结果由下一个处理程序处理。**

```js
new Promise((resolve, reject) => {
  setTimeout(() => resolve("value"), 2000);
})
  .finally(() => alert("Promise ready")) // 先触发
  .then(result => alert(result)); // <-- .then 显示 "value"
```

3. **`finally` 处理程序也不应该返回任何内容，如果返回了，返回的值会默认被忽略。除非该程序抛出 `error`，此时这个 `error` 会被转到下一个处理程序。**
