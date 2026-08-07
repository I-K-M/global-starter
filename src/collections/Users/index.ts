import type { CollectionConfig } from 'payload'

import { admins, adminsField, firstUserOrAdmin } from '../../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: ({ req }) => Boolean(req.user),
    create: firstUserOrAdmin,
    delete: admins,
    read: admins,
    update: admins,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'admin',
      options: [
        { label: 'Administrator', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: { create: adminsField, update: adminsField },
      saveToJWT: true,
    },
  ],
  timestamps: true,
}
