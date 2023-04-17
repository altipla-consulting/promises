
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

Run the action from the component method:

```vue
<template>
  <button @click="run"></button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'my-component',

  setup(props, { emit }) {
    async function run() {
      await runAction(this.$emit)

      // If you want to customize the action name or the argument.
      await runAction(this.$emit, 'action', value)

      // Things you want to run after the promise of the other component is resolved
      ...
    }

    return {
      run,
    }
  }
})
</script>
```

Then outside the component you can wait for your promise:

```vue
<template>
  <my-component @action="$event.waitUntil(foo())"></my-component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, { emit }) {
    async function foo() {
      // Do anything you need, my-component will wait for this before continuing
      // with the code after the runAction call.
    }

    return {
      foo,
    }
  }
}
</script>
```
