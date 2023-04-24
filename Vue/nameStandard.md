# nameStandard

## Component

use `PascalCase` for components tags because it improves template readability by differentiating Vue components from native elements.

```vue
<MyComponent />
```

## Props

the convention is using `kebab-case` in all cases to align with **HTML arrtibutes**:

```vue
<MyComponent greeting-message='hello' />
```

we declare long prop names using `camelCase` to avoids to use quotes:

```js
defineProps({
  greetingMessage: String
})
```

## Event

like components and props, event names provide an automatic case transformation.

```vue
<MyComponent @some-event="callback" />

<!-- MyComponent -->
<button @click="$emit('someEvent')">click me</button>
```
