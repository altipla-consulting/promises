
export async function resolveAll<T, M extends Record<string, T | PromiseLike<T>>>(map: M): Promise<{ [P in keyof M]: Awaited<M[P]> }> {
  let resolvedArray = await Promise.all(Object.values(map))
  let resolvedMap: any = {}

  Object.keys(map).forEach((key, index) => {
    resolvedMap[key] = resolvedArray[index]
  })

  return resolvedMap
}

export async function runAction(emit: (event: string, ...args: any[]) => void, eventName = 'action', target: EventTarget) {
  return new Promise(resolve => {
    let waited = false

    emit(eventName, {
      target,
      waitUntil: async function (p: Promise<any>) {
        waited = true
        resolve(await p)
      },
    })

    if (!waited) {
      resolve(undefined)
    }
  })
}
