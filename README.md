
# promises

Promises utilities.


## Install

```sh
npm i @altipla/promises
```


## Usage

### Resolve multiple promises in parallel

```js
import { resolveAll } from '@altipla/promises'

let { foo, bar } = await resolveAll({
  foo: client.List(),
  bar: otherPromise,
})
```


### Run a Vue event handler with a promise return

Run the action from the componente method:

```vue
<template>
  <button @click="run"></button>
</template>

<script>
export default {
  name: 'my-component',

  methods: {
    async run() {
      await runAction(this.$emit)

      // If you want to customize the action name or the argument.
      await runAction(this.$emit, 'action', value)

      // Things you want to run after the promise of the other component is resolved
      ...
    },
  },
}
</script>
```

Then outside the component you can wait for your promise:

```vue
<template>
  <my-component @action="$event.waitUntil(foo())"></my-component>
</template>
<script>
export default {
  methods: {
    async foo() {
      // Do anything you need, my-component will wait for this before continuing
      // with the code after the runAction call.
    },
  },
}
</script>
```

