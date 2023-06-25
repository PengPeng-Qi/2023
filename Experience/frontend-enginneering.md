# FrontEnd Engineering

前端代码规范主要使用

1. `prettier` - 代码格式化工具
2. `eslint` - 检查并修复js的工具
3. `commitlint` - [Link](https://commitlint.js.org/#/guides-local-setup)
4. `commitizen` - commit messgae
5. `husky` - 提供所有的Git hooks
6. `lint-staged` - 将所有的 staged 中的文件执行 linter，避免出现代码 💩

## commitizen

use `commitizen` for format our commit message.

```shell
npm i -g commitizen
```

use it

```shell
git cz
```

⚠️ if `git cz` work as `git commit`, we should run below👇🏻 code in my project.👨‍💻

```shell
commitizen init cz-conventional-changelog --save-dev --save-exact
```

### works global

but this method only works a project. if we want works global, wo can do that as follow.

```shell
npm install -g commitizen
npm install -g cz-conventional-changelog

echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

> Reference: [🔗](https://github.com/commitizen/cz-cli)

## husky

[official website](https://typicode.github.io/husky/getting-started.html)

### config git hooks

```shell
npx husky add .husky/pre-commit "npx lint-staged" # 在pre-commit的时候进行 lint-staged

npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"' # commit message 进行 commitlint 检查🧐
```

### automatically Git hooks enabled

automatically have Git hooks enabled after install, edit package.json

```shell
npm pkg set scripts.prepare="husky install"
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
