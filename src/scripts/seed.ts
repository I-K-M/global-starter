import config from '@payload-config'
import { createLocalReq, getPayload } from 'payload'

import { seed } from '../endpoints/seed'

const payload = await getPayload({ config })
const req = await createLocalReq({}, payload)

await seed({ payload, req })
await payload.destroy()
