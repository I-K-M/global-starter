import type { GlobalConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { adminsOrEditors } from '@/access/roles'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: { read: anyone, update: adminsOrEditors },
  fields: [
    { name: 'siteName', type: 'text', required: true, defaultValue: 'Global Starter' },
    { name: 'siteDescription', type: 'textarea' },
    { name: 'defaultSocialImage', type: 'upload', relationTo: 'media' },
    { name: 'contactEmail', type: 'email' },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}
