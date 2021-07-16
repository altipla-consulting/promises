
export function resolveAll(requests) {
  let keys = []
  let promises = []
  for (let key in requests) {
    keys.push(key)
    promises.push(requests[key])
  }
  return Promise.all(promises).then(reply => {
    let result = {}
    keys.forEach((key, index) => {
      result[key] = reply[index]
    })
    return result
  })
}


export async function runAction(emit, eventName = 'action', target) {
  return new Promise(resolve => {
    let waited = false

    emit(eventName, {
      target,
      waitUntil: async (p) => {
        waited = true
        await p
        resolve()
      },
    })

    if (!waited) {
      resolve()
    }
  })
}
