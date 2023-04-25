
export async function resolveAll<T, M extends Record<string, T | PromiseLike<T>>>(map: M): Promise<{ [P in keyof M]: Awaited<M[P]> }> {
  let resolvedArray = await Promise.all(Object.values(map))
  let resolvedMap: any = {}

  Object.keys(map).forEach((key, index) => {
    resolvedMap[key] = resolvedArray[index]
  })

  return resolvedMap
}

export async function runAction(emit: (event: 'action', ...args: any[]) => void, eventName?: 'action', target?: any): Promise<void>
export async function runAction<T extends string>(emit: (event: T, ...args: any[]) => void, eventName: T, target?: any): Promise<void>
export async function runAction<T extends string>(emit: (event: T, ...args: any[]) => void, eventName?: T, target?: any): Promise<void> {
  return new Promise(resolve => {
    let waited = false

    // Apply type erasure to merge both declarations in a single implementation.
    emit(eventName as any || 'action', {
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
