
import { expect, test } from 'vitest'
import { runAction } from '.'

test('emit types', () => {
  let emit = (event: 'click', ..._args: any[]) => {
    expect(event).toBe('click')
  }
  runAction(emit, 'click')
})

test('default action', () => {
  let emit = (event: 'action', ..._args: any[]) => {
    expect(event).toBe('action')
  }
  runAction(emit)
})
