import type { Access, FieldAccess } from 'payload'

type Role = 'admin' | 'editor'
type UserWithRole = { role?: Role | null } | null

const roleOf = (user: unknown): Role | undefined => (user as UserWithRole)?.role ?? undefined

export const admins: Access = ({ req }) => roleOf(req.user) === 'admin'
export const firstUserOrAdmin: Access = async ({ req }) => {
  if (roleOf(req.user) === 'admin') return true
  const { totalDocs } = await req.payload.count({ collection: 'users', overrideAccess: true })
  return totalDocs === 0
}
export const adminsField: FieldAccess = ({ req }) => roleOf(req.user) === 'admin'
export const adminsOrEditors: Access = ({ req }) => ['admin', 'editor'].includes(roleOf(req.user) ?? '')

export const preventEditorPublishing = ({ data, req }: { data?: Record<string, unknown>; req: { user?: unknown } }) => {
  if (roleOf(req.user) === 'editor' && data?._status === 'published') {
    throw new Error('Editors can save drafts but only administrators can publish content.')
  }
  return data
}
