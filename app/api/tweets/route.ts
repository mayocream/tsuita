import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/storage'
import { auth } from '@/lib/auth'

export const GET = async (request: NextRequest) => {
  const searchParams = await request.nextUrl.searchParams
  const limit = searchParams.get('limit') || '10'
  const cursor = searchParams.get('cursor')

  // Get tweets from users the current user follows, plus their own tweets
  const tweets = await prisma.tweet.findMany({
    take: parseInt(limit as string),
    skip: cursor ? 1 : 0,
    cursor: cursor
      ? {
          id: parseInt(cursor as string),
        }
      : undefined,
    orderBy: {
      createdAt: 'desc',
    },
  })

  return NextResponse.json(tweets)
}

export const POST = async (request: NextRequest) => {

  console.log('POST request')

  const user = await auth()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { content } = await request.json()
  if (!content) {
    return NextResponse.json({ error: 'Content is required' }, { status: 400 })
  }

  const tweet = await prisma.tweet.create({
    data: {
      content,
      authorId: user.id,
    },
  })

  return NextResponse.json(tweet)
}
