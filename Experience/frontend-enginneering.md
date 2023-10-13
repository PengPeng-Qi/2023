# FrontEnd Engineering

前端代码规范主要使用

1. `git` - 版本管理工具
2. `commitlint` - 项目 commit message 校验工具
3. `husky` - 提供所有的 Git hooks
4. `commitizen` - commit message 提交工具
5. `prettier` - 代码格式化工具
6. `eslint` - 检查并修复 js 的工具
7. `lint-staged` - 将所有的 staged 中的文件执行 linter，避免出现代码 💩

## Git

vue 项目模板创建后，可以进行 git 进行版本控制

```shell
git init
```

可通过 [Link](https://github.com/github/gitignore) 添加 `.gitignore` 模板

## Commitlint

- [参考](https://commitlint.js.org/#/guides-local-setup)

```shell
npm install --save-dev @commitlint/{cli,config-conventional}

echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```

> 此时，还无法生效，需要安装 Husky，在 git hooks - `commit-msg` 的时候进行校验

## Husky

- [Husky](https://typicode.github.io/husky/getting-started.html#install)

```shell
# install
npm install husky --save-dev
# enabled
npx husky install
# auto enabled after install
npm pkg set scripts.prepare="husky install"
```

### Create a hook

```shell
npx husky add .husky/pre-commit "npx lint-staged" # 在 pre-commit 的时候进行 lint-staged

npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"' # 在 commit message 进行 commitlint 检查🧐
```

> 前期可以跳过第一个 `lint-staged` 钩子，先创建 `commit-msg` 钩子。注意，敲代码 👨🏻‍💻 的时候不要把上面的注释敲上去了。

现在 `git commit -m 'x'` 时，如果 commit msg 不符合规范就会被阻止提交。

## Commitizen

使用 `commitizen` 来帮助我们生成规范的 commit message。

安装方式：

```shell
npm i -g commitizen
```

使用方式：

```shell
git cz
```

⚠️ 如果 `git cz` 和输入 `git commit` 一样的话, 我们应该在我们的项目中运行下面的代码。👨‍💻

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

## Prettier

`prettier` 常见配置

```cjs
// .prettierrc.cjs
// @see: https://prettier.io/docs/en/options

module.exports = {
  // 指定最大换行长度
  printWidth: 120,
  // 缩进制表符宽度 | 空格数
  tabWidth: 2,
  // 使用制表符而不是空格缩进行 (true：制表符，false：空格)
  useTabs: false,
  // 结尾使用分号 (true：有，false：没有)
  semi: false,
  // 使用单引号 (true：单引号，false：双引号)
  singleQuote: true,
  // 在对象字面量中决定是否将属性名用引号括起来 可选值 "<as-needed|consistent|preserve>"
  quoteProps: 'as-needed',
  // 在JSX中使用单引号而不是双引号 (true：单引号，false：双引号)
  jsxSingleQuote: false,
  // 多行时尽可能打印尾随逗号 可选值"<none|es5|all>"
  trailingComma: 'none',
  // 在对象，数组括号与文字之间加空格 "{ foo: bar }" (true：有，false：没有)
  bracketSpacing: true,
  // 将 > 多行元素放在最后一行的末尾，而不是单独放在下一行 (true：放末尾，false：单独一行)
  bracketSameLine: false,
  jsxBracketSameLine: false,
  // (x) => {} 箭头函数参数只有一个时是否要有小括号 (avoid：省略括号，always：不省略括号)
  arrowParens: 'avoid',
  // 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码 (rangeStart：开始，rangeEnd：结束)
  rangeStart: 0,
  rangeEnd: Infinity,
  // 指定要使用的解析器，不需要写文件开头的 @prettier
  requirePragma: false,
  // 可以在文件顶部插入一个特殊标记，指定该文件已使用 Prettier 格式化
  insertPragma: false,
  // 用于控制文本是否应该被换行以及如何进行换行
  proseWrap: 'preserve',
  // 在html中空格是否是敏感的 "css" - 遵守 CSS 显示属性的默认值， "strict" - 空格被认为是敏感的 ，"ignore" - 空格被认为是不敏感的
  htmlWhitespaceSensitivity: 'css',
  // 控制在 Vue 单文件组件中 <script> 和 <style> 标签内的代码缩进方式
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf 结尾是 可选值 "<auto|lf|crlf|cr>"
  endOfLine: 'auto',
  // 是否对嵌入式语言，例如：HTML 中的 CSS 或 JS 进行格式化，可选值 "<auto|off>"
  embeddedLanguageFormatting: 'auto',
  // 是否将 HTML 每个属性单独放一行
  singleAttributePerLine: false
}
```

## Eslint

```cjs
// .eslint.cjs
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    node: true // 在开发过程中进行 eslint 检查
  },
  // 继承某些已有的规则
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  /**
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // eslint (@see: https://eslint.org/docs/latest/rules/)
    eqeqeq: 'error', // 使用严格相等符号
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'no-multiple-empty-lines': ['error', { max: 1 }], // 不允许多个空行

    // typeScript (https://typescript-eslint.io/rules)
    // "@typescript-eslint/prefer-ts-expect-error": "error", // 禁止使用 @ts-ignore
    // '@typescript-eslint/ban-ts-comment': 'error' // 禁止 @ts-<directive> 使用注释或要求在指令后进行描述
    '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量

    // vue (https://eslint.vuejs.org/rules)
    'vue/no-mutating-props': 'error', // 不允许改变组件 prop
    'vue/attribute-hyphenation': 'error' // 对模板中的自定义组件强制执行属性命名样式：my-prop="prop"
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
```

## Lint-Staged

### Install

```shell
npm install --save-dev lint-staged
```

### Configure Lint-Staged

- reference: [Configure Lint-Staged](https://github.com/okonet/lint-staged#configuration)

```js
// lint-staged.config.js

module.exports = {
  '*.{js,jsx,ts,tsx,vue}': ['eslint --fix', 'prettier --write'],
  'package.json': ['prettier --write'],
  '*.{scss,less,css,html}': ['prettier --write'],
  '*.md': ['prettier --write']
}
```

> 注意：不要忘记添加上面的 `pre-commit` hook

这样，一个项目的初步搭建就完成了。👏🏻
