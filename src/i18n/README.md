## Localization

At this time, first-class support for Foxglove Studio is provided in English only. Localization into other languages is available on a best-effort basis, with translations provided by community volunteers. Current community supported-languages are:

- Chinese

Translation support is implemented using [`react-i18next`](https://react.i18next.com).

### Add translations

- We value having _high-quality_ translations over having _all_ translations for a given component or view. Though every PR must have up-to-date English translations, updating other languages is completely optional.
- If you update an English translation and cannot provide updated non-English translations, delete the non-English versions in that PR. Optionally, open follow-up PRs to add accurate non-English translations.

### Use `useTranslation()` and `t()` to access translated strings

1. Call the [<code>useTranslation(<i>namespace</i>)</code> hook](https://react.i18next.com/latest/usetranslation-hook) inside a React component to access strings in a given namespace. The hook returns a function called `t`.

2. Call the `t` function to get the translation for a string.

For example:

```ts
const { t } = useTranslation('myComponent');
return <p>{t('hello')}</p>;
```

### Add localization support to a component

1. Move English strings out of the component code, and into the `i18n` folder. Use a new namespace for logical groups of components or app views.

2. Replace strings hard-coded in source code with calls to the `t()` function. Use `camelCase` for new localization keys.

<table><tr><th>Before</th><th>After</th></tr><tr><td>

```ts
function MyComponent() {
  return <p>Hello!</p>;
}
```

</td><td>

```ts
function MyComponent() {
  const { t } = useTranslation('myComponent');
  return <p>{t('hello')}</p>;
}
```

```ts
// i18n/en/myComponent.ts
export default {
  hello: 'Hello!',
};
```

</td></tr></table>

### Complete example

```ts
// MyComponent.ts

import { useTranslation } from 'react-i18next';

function MyComponent(props: Props): JSX.Element {
  const { t } = useTranslation('myComponent');

  return <p>{t('hello')}</p>;
}
```

```ts
// i18n/index.ts
export const translations = {
  en: {
    ...,
    myComponent: enMyComponent,
  },
  zh: {
    ...,
    myComponent: zhMyComponent,
  },
};
```

```ts
// i18n/en/myComponent.ts
export default {
  hello: 'Hello!',
};

// i18n/en/index.ts
export { default as enMyComponent } from './myComponent';
```

```ts
// i18n/zh/myComponent.ts
export default {
  hello: '你好！',
};

// i18n/zh/index.ts
export { default as zhMyComponent } from './myComponent';
```

Result:

| English         | Chinese         |
| --------------- | --------------- |
| `<p>Hello!</p>` | `<p>你好！</p>` |
