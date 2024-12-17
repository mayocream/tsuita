import { prisma } from '@/lib/storage'
import { cookies } from 'next/headers'

export const auth = async () => {
  const id = (await cookies()).get('auth')
  if (id) {
    try {
        return await prisma.user.findUnique({
          where: { id: id.value },
        })
      } catch {
        return null
      }
  } else {
    // create a new user
    const user = await prisma.user.create({
      data: {}
    })
    await createSession(user.id)
  }
}

export const createSession = async (id: string) => {
  ;(await cookies()).set('auth', id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
  })
}

export const deleteSession = async () => {
  ;(await cookies()).delete('auth')
}
