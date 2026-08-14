import { describe, expect, it } from 'vitest'

import { isSafeRelativePath, isSameOrigin, isSecureDeploymentURL, secretsMatch } from './security'

describe('security helpers', () => {
  it.each(['/posts/example', '/'])('accepts internal preview path %s', (path) => {
    expect(isSafeRelativePath(path)).toBe(true)
  })

  it.each(['//attacker.example/path', 'https://attacker.example', 'posts/example'])(
    'rejects unsafe preview path %s',
    (path) => {
      expect(isSafeRelativePath(path)).toBe(false)
    },
  )

  it('requires an exact request origin', () => {
    expect(isSameOrigin('https://example.com', 'https://example.com/admin')).toBe(true)
    expect(isSameOrigin('https://attacker.example', 'https://example.com')).toBe(false)
    expect(isSameOrigin(null, 'https://example.com')).toBe(false)
  })

  it('requires HTTPS except for local development hosts', () => {
    expect(isSecureDeploymentURL('https://example.com')).toBe(true)
    expect(isSecureDeploymentURL('http://localhost:3000')).toBe(true)
    expect(isSecureDeploymentURL('http://127.0.0.1:3000')).toBe(true)
    expect(isSecureDeploymentURL('http://example.com')).toBe(false)
  })

  it('compares secrets without accepting prefixes or different byte lengths', () => {
    expect(secretsMatch('correct-secret', 'correct-secret')).toBe(true)
    expect(secretsMatch('correct', 'correct-secret')).toBe(false)
    expect(secretsMatch('incorrect-secret', 'correct-secret')).toBe(false)
  })
})
