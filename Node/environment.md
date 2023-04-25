# Environment

`NODE_ENV` 是一个常用的环境变量，用于指定当前 Node.js 应用的运行环境，常见的取值为`development`、`production` 和`test`。

在项目中使用 `NODE_ENV` 可以用来判断当前应用的运行环境，并根据不同的环境做相应的处理，例如：

1. 在开发环境（`NODE_ENV=development`）下输出更详细的日志信息，方便开发调试；
2. 在生产环境（`NODE_ENV=production`）下启用压缩、缓存等优化，提高运行效率；
3. 在测试环境（`NODE_ENV=test`）下运行自动化测试，验证应用的正确性。

在Node.js应用中，可以通过 `process.env.NODE_ENV` 来获取当前应用的运行环境。例如：

```js
if (process.env.NODE_ENV === 'development') {
  console.log('Running in development environment');
  // 输出更详细的日志信息
}
else if (process.env.NODE_ENV === 'production') {
  console.log('Running in production environment');
  // 启用压缩、缓存等优化
}
else if (process.env.NODE_ENV === 'test') {
  console.log('Running in test environment');
  // 运行自动化测试
}
```

通常在开发阶段会通过设置 `NODE_ENV=development` 来告诉应用当前的运行环境，而在生产部署时则会通过 `NODE_ENV=production` 来指定应用的生产环境。

可以在命令行或启动脚本中设置 `NODE_ENV` 环境变量，例如：

```shell
# 设置开发环境
$ NODE_ENV=development node app.js

# 设置生产环境
$ NODE_ENV=production node app.js
```

在实际应用开发中，使用 `NODE_ENV` 可以方便地控制应用的行为，提高开发效率和代码质量。
