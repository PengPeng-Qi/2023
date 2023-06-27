# async/await

是以更舒适的方式使用 `promise` 的一种特殊语法

## async

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

`await` 只能在 `async` 函数内工作，返回值为 `resolve` 或 `reject` 的值。

```js
// 只在 async 函数内工作
let value = await promise;
```

**`await` 会暂停函数的执行，直到 promise 状态变为 settled，然后以 promise 的结果继续执行**。这个行为不会耗费任何 CPU 资源，因为 JavaScript 引擎可以同时处理其他任务：执行其他脚本，处理事件等。

**是一个异步方法，但是经过特殊处理，可以被 `try...catch` 处理。**（`try...catch是一个同步的方法`）

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

> 相比于 `promise.then`，`await` 是获取 `promise` 的结果的一个更优雅的语法。

### modules 里使用 await

在**现代浏览器中，当我们处于一个 `module` 中时**，那么在顶层使用 `await` 也是被允许的。

```js
// 我们假设此代码在 module 中的顶层运行
let response = await fetch("/article/promise-chaining/user.json");
let user = await response.json();

console.log(user);
```

### class 中的 async 方法

要声明和一个 class 中的 async 方法，只需在对应方法前面加上 async 即可：

```js
class Waiter {
  async wait() {
    return await Promise.resolve(1);
  }
}

new Waiter().wait().then(alert); // 1（alert 等同于 result => alert(result))
```

### thenables 对象

```js
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // 1000ms 后使用 this.num*2 进行 resolve
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f() {
  // 等待 1 秒，之后 result 变为 2
  let result = await new Thenable(1);
  alert(result);
}

f();
```

如果 `await` 接收了一个非 `promise` 的但是提供了 `.then` 方法的对象，那么就会调用这个 `.then` 方法，并将内建的 `resolve` 和 `reject` 作为参数传入。

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

在真实开发中，`promise` 可能需要一点时间才 `reject`，在这种情况下，`throw error` 之前就会有一些延时。

我们可以使用 `try...catch` 来捕获该错误，与常规的 `throw` 使用的是一样的

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

如果我们没有 `try...catch`，那么由异步函数 `f()` 的调用生成的 `promise` 将变成 `rejectd`。我们可以在函数调用后面添加 `.catch` 来处理这个 `error`。

## 面试题

**await 后面的函数是立即执行还是放入异步队列中？**

**await后面的函数会被放入异步队列中，而不是立即执行。** 当 `async` 函数被调用时，它会返回一个 `Promise` 对象，这个 `Promise` 对象会在 `async` 函数中的所有 `await` 语句执行完毕之后被 `resolve`。

在执行到 `await` 语句时，`async` 函数会暂停执行，并等待 `await` 后面的异步操作完成，然后继续执行 `async` 函数的下一行代码。这种机制使得 `async` 函数的执行不会阻塞主线程，而是可以在异步操作执行的同时执行其他任务。
