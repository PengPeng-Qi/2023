# FrontEnd Engineering

前端代码规范主要使用

1. `prettier` - 代码格式化工具
2. `eslint` - 检查并修复js的工具
3. `commitlint` - [Link](https://commitlint.js.org/#/guides-local-setup)
4. `husky` - 提供所有的Git hooks
5. `lint-staged` - 将所有的 staged 中的文件执行 linter，避免出现代码 💩

## husky

[official website](https://typicode.github.io/husky/getting-started.html)

### config git hooks

```shell
npx husky add .husky/pre-commit "npx lint-staged" # 在pre-commit的时候进行 lint-staged

npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"' # commit message 进行 commitlint 检查🧐
```

## lint-staged

[`lint-staged`](https://github.com/okonet/lint-staged) 中一般在 `package.json` 中配置 `prettier` 和 `eslint` 的检查信息

```js
"lint-staged": {
  "src/**/*.{js,ts,vue}": [
    // 读取指定的文件或目录中的所有代码，并使用 Prettier 提供的规则对其进行格式化
    "prettier --write",
    // 读取指定的文件或目录中的所有代码，并使用 ESLint 提供的规则对其进行检查并修复
    "eslint --fix"
  ]
}
```

> 也可以使用其他配置文件，像 `husky` 一样，[Link](https://github.com/okonet/lint-staged#Configuration)
