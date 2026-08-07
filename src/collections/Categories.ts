import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { admins, adminsOrEditors } from '../access/roles'
import { slugField } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: adminsOrEditors,
    delete: admins,
    read: anyone,
    update: adminsOrEditors,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({
      position: undefined,
    }),
  ],
}
