import type { CollectionSchema } from 'deepspace/schema'

export const tinytableWorkspaceSchema: CollectionSchema = {
  name: 'tinytable_workspace',
  columns: [
    { name: 'key', storage: 'text', interpretation: 'plain' },
    { name: 'state', storage: 'text', interpretation: 'plain' },
    { name: 'updatedAt', storage: 'number', interpretation: 'plain' },
  ],
  permissions: {
    viewer: { read: 'own', create: false, update: false, delete: false },
    member: { read: 'own', create: true, update: 'own', delete: 'own' },
    admin: { read: true, create: true, update: true, delete: true },
  },
}
