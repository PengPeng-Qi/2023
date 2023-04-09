# async

`async` 被放置在一个函数前面，表明这个函数总是返回一个 `promise`，其他值将自动被包装在一个 `resolved` 的 `promise` 中

```js
async function f() {
  return 1;
}

f().then(alert); // 1

// 结果一样
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

## await

`await` 只能在 `async` 函数内工作

```js
// 只在 async 函数内工作
let value = await promise;
```

**`await` 会暂停函数的执行，直到 promise 状态变为 settled，然后以 promise 的结果继续执行**。这个行为不会耗费任何 CPU 资源，因为 JavaScript 引擎可以同时处理其他任务：执行其他脚本，处理事件等。**是一个异步方法，但是可以经过特殊处理，可以被 `try...catch` 处理。**（`try...catch是一个同步的方法`）

```js
async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000);
  });

  let result = await promise; // 等待，直到 promise resolve (*)

  alert(result); // "done!"
}

f();
```

> 相比于 `promise.then`，它只是获取 `promise` 的结果的一个更优雅的语法。

### modules 里使用 await

在现代浏览器中，当我们处于一个 `module` 中时，那么在顶层使用 `await` 也是被允许的。

```js
// 我们假设此代码在 module 中的顶层运行
let response = await fetch("/article/promise-chaining/user.json");
let user = await response.json();

console.log(user);
```

## Error 处理

如果 `promise` 被 `reject`，`await promise` 返回的就是一个 `error`，它将 `throw` 这个 `error`，就像在这一行有一个 `throw` 语句那样。

```js
async function f() {
  await Promise.reject(new Error("Whoops!"));
}

// 与下面一样👇
async function f() {
  throw new Error("Whoops!");
}
```

可以使用 `try catch` 来捕获该错误，与常规的 `throw` 使用的是一样的

```js
async function f() {
  try {
    let response = await fetch("/no-user-here");
    let user = await response.json();
  } catch (err) {
    // 捕获到 fetch 和 response.json 中的错误
    alert(err);
  }
}

f();
```

> 此处注意 ⚠️：`try...catch` 只捕获同步错误，此处能捕获 `await` 是因为 `await` 会把 `rejected` `promise` 转变为 `throw`，这也是 `await` 的功能之一。

## 面试题

**await 后面的函数是立即执行还是放入异步队列中？**

await后面的函数会被放入异步队列中，而不是立即执行。当async函数被调用时，它会返回一个Promise对象，这个Promise对象会在async函数中的所有await语句执行完毕之后被resolve。

在执行到await语句时，async函数会暂停执行，并等待await后面的异步操作完成，然后继续执行async函数的下一行代码。这种机制使得async函数的执行不会阻塞主线程，而是可以在异步操作执行的同时执行其他任务。
