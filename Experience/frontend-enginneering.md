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

## Husky

[Install Husky](https://typicode.github.io/husky/getting-started.html#install)

### Create a hook

```shell
npx husky add .husky/pre-commit "npx lint-staged" # 在 pre-commit 的时候进行 lint-staged

npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"' # 在 commit message 进行 commitlint 检查🧐
```

### Automatically Git hooks enabled

automatically have Git hooks enabled after install, edit package.json

```shell
npm pkg set scripts.prepare="husky install"
```

## Lint-Staged

### Install

```shell
npm install --save-dev lint-staged
```

### Configure Lint-Staged

[Configure Lint-Staged](https://github.com/okonet/lint-staged#configuration)
