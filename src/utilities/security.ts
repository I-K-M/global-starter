import { timingSafeEqual } from 'node:crypto'

export const isSafeRelativePath = (path: string): boolean =>
  path.startsWith('/') && !path.startsWith('//')

export const isSameOrigin = (origin: string | null, expectedURL: string): boolean => {
  if (!origin) return false

  try {
    return new URL(origin).origin === new URL(expectedURL).origin
  } catch {
    return false
  }
}

export const isSecureDeploymentURL = (value: string): boolean => {
  const url = new URL(value)
  return url.protocol === 'https:' || ['localhost', '127.0.0.1', '::1'].includes(url.hostname)
}

export const secretsMatch = (provided: string | null, expected: string): boolean => {
  if (!provided) return false

  const providedBuffer = Buffer.from(provided)
  const expectedBuffer = Buffer.from(expected)
  if (providedBuffer.length !== expectedBuffer.length) return false

  return timingSafeEqual(providedBuffer, expectedBuffer)
}
