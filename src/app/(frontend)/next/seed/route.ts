import { createLocalReq, getPayload } from 'payload'
import { seed } from '@/endpoints/seed'
import config from '@payload-config'
import { env } from '@/env'
import { isSameOrigin } from '@/utilities/security'
import { headers } from 'next/headers'
import type { NextRequest } from 'next/server'

export const maxDuration = 60 // This function can run for a maximum of 60 seconds

export async function POST(request: NextRequest): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  if (!isSameOrigin(request.headers.get('origin'), env.NEXT_PUBLIC_SERVER_URL)) {
    return new Response('Action forbidden.', { status: 403 })
  }

  // Authenticate by passing request headers
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user || user.role !== 'admin') {
    return new Response('Action forbidden.', { status: 403 })
  }

  try {
    // Create a Payload request object to pass to the Local API for transactions
    // At this point you should pass in a user, locale, and any other context you need for the Local API
    const payloadReq = await createLocalReq({ user }, payload)

    await seed({ payload, req: payloadReq })

    return Response.json({ success: true })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error seeding data' })
    return new Response('Error seeding data.', { status: 500 })
  }
}
