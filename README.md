
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

```js
import { runAction } from '@altipla/promises'


await runAction(this.$emit)
await runAction(this.$emit, 'action', value)
```
