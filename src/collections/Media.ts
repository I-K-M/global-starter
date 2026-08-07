import type { CollectionConfig } from 'payload'
import { admins, adminsOrEditors } from '../access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: adminsOrEditors,
    delete: admins,
    read: () => true,
    update: adminsOrEditors,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
