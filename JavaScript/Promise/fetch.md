# fetch

```js
let promise = fetch(url);
```

向 `url` 发出网络请求并返回一个 `promise`，当远程服务器返回响应头时，**该 `promise` 使用一个 `response` 对象来进行 `resolve`**

为了读取完整的响应，我们应该**调用 `response.text()` 方法，当全部文字内容从远程服务器下载完成后，会返回一个 `promise`**，该 `promise` 以刚刚下载完成的这个文本作为 `result` 进行 `resolve`

```js
// 向 user.json 发送请求
fetch("/article/promise-chaining/user.json")
  // 当远程服务器响应时，下面的 .then 开始执行
  // response.text() 返回一个新的 promise，该 promise 以加载的 user.json 为 result 进行 resolve
  .then((response) => response.text())
  .then((text) => {
    alert(text); // {"name": "iliakan", "isAdmin": true}
  });
```

从 `fetch` 返回的 `response` 对象还包含 **`response.json` 方法，该方法可以读取远程数据并将其解析为 `JSON`**

```js
// 同上，使用 response.json() 将远程内容解析为 JSON
fetch("/article/promise-chaining/user.json")
  .then(response => response.json())
  .then(user => alert(user.name)); // iliakan，获取到了用户名
```
