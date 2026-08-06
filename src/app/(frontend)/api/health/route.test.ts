import { describe, expect, it } from 'vitest'
import { GET } from './route'

describe('health endpoint', () => {
  it('returns an ok status', async () => {
    const response = GET()
    await expect(response.json()).resolves.toEqual({ status: 'ok' })
    expect(response.status).toBe(200)
  })
})
