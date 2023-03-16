## Css Bem

块（Block）、元素（Element）、修饰符（Modifier）

优势： 获得更多描述和更清晰的目录结构

### 块

块的名称描述了块所使用的目的（`button、menu`），而不是状态（`red、big`）

```html
<!-- 正确的. error 块语义化 -->
<div class="error"></div>

<!-- Incorrect. It describes the appearance -->
<div class="red-text"></div>
```

#### 块 嵌套

```html
<!-- `header` block -->
<header class="header">
  <!-- Nested `logo` block -->
  <div class="logo">...</div>

  <!-- Nested `search-form` block -->
  <form class="search-form">...</form>
</header>
```

### 元素

元素 是 块的一部分，不能单独使用。

元素的名称描述了他是什么 (item,text, etc.), 而不是状态 (red,big, etc.).

一个元素的名称应该是`block-name__element-name`. **一个元素名称应该和块的名称间隔两个下划线**

```html
<!-- `search-form` 块 -->
<form class="search-form">
  <!-- `search-form` block 下的 `input` 元素 -->
  <input class="search-form__input" />

  <!-- `button` element in the `search-form` block -->
  <button class="search-form__button">Search</button>
</form>
```

#### 元素 嵌套

一个元素总是块的一部分，不能是另一个元素的一部分，意味着不能这样定义`block__elem1__elem2`.

```html
<!-- 正确的 -->
<form class="search-form">
  <div class="search-form__content">
    <input class="search-form__input" />
    <button class="search-form__button">Search</button>
  </div>
</form>

<!-- 不正确的. -->
<form class="search-form">
  <div class="search-form__content">
    <!-- 推荐的: `search-form__input` or `search-form__content-input` -->
    <input class="search-form__content__input" />

    <!-- 推荐的: `search-form__button` or `search-form__content-button` -->
    <button class="search-form__content__button">Search</button>
  </div>
</form>
```

#### 元素 关系

元素总是块的一部分，不能单独使用元素

```html
<!-- 正确的. Elements are located inside the `search-form` block -->
<!-- `search-form` block -->
<form class="search-form">
  <!-- `input` element in the `search-form` block -->
  <input class="search-form__input" />

  <!-- `button` element in the `search-form` block -->
  <button class="search-form__button">Search</button>
</form>

<!--
  不正确的. Elements are located outside of the context of the `search-form` block
-->
<!-- `search-form` block -->
<form class="search-form"></form>

<!-- `input` element in the `search-form` block -->
<input class="search-form__input" />

<!-- `button` element in the `search-form` block-->
<button class="search-form__button">Search</button>
```

#### 可选的元素

一个元素是一个可选的块级组件，不是所有的块都有元素

```html
<!-- `search-form` block -->
<div class="search-form">
  <!-- `input` block -->
  <input class="input" />

  <!-- `button` block -->
  <button class="button">Search</button>
</div>
```

### 块 or 元素

#### 块

如果一个代码块可能被重复使用且不依赖于其他页面组件

#### 元素

不能在元素中创建元素，在这种情况下，需要创建一个块

### 修饰符

定义块或元素的外观、状态、或者行为，例如：什么大小（Size）、什么主题（Theme）、什么功能（Disabled）、什么行为或者方位（directions_left-top）

修饰符和块或者元素用一个下划线风格 `_`

The structure of the modifier's full name follows the pattern:

- `block-name_modifier-name`
- `block-name__element-name_modifier-name`

```html
<!-- The `search-form` block has the `focused` Boolean modifier -->
<form class="search-form search-form_focused">
  <input class="search-form__input" />

  <!-- The `button` element has the `disabled` Boolean modifier -->
  <button class="search-form__button search-form__button_disabled">
    Search
  </button>
</form>
```

#### key value

The structure of the modifier's full name follows the pattern:

- `block-name_modifier-name_modifier-value`
- `block-name__element-name_modifier-name_modifier-value`

```html
<!-- The `search-form` block has the `theme` modifier with the value `islands` -->
<form class="search-form search-form_theme_islands">
  <input class="search-form__input" />

  <!-- The `button` element has the `size` modifier with the value `m` -->
  <button class="search-form__button search-form__button_size_m">Search</button>
</form>

<!-- You can't use two identical modifiers with different values simultaneously -->
<form class="search-form search-form_theme_islands search-form_theme_lite">
  <input class="search-form__input" />

  <button
    class="search-form__button search-form__button_size_s search-form__button_size_m"
  >
    Search
  </button>
</form>
```

修饰符不能独自使用

```html
<!--
  Correct. The `search-form` block has the `theme` modifier with
  the value `islands`
-->
<form class="search-form search-form_theme_islands">
  <input class="search-form__input" />

  <button class="search-form__button">Search</button>
</form>

<!-- Incorrect. The modified class `search-form` is missing -->
<form class="search-form_theme_islands">
  <input class="search-form__input" />

  <button class="search-form__button">Search</button>
</form>
```
