import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/storage'

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) => {
  const { id } = await params

  const tweet = await prisma.tweet.findUnique({
    where: { id },
  })

  if (!tweet) {
    return new NextResponse(null, { status: 404 })
  }

  return NextResponse.json(tweet, {
    headers: {
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
