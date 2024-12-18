'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { TweetCard } from '@/components/tweet'

export default function Page() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ['tweets'],
    queryFn: ({ pageParam = 0 }) =>
      fetch(`/api/tweets${pageParam ? `?cursor=${pageParam}` : ''}`).then(
        (res) => res.json()
      ),
    getNextPageParam: (lastPage) => lastPage.id,
    initialPageParam: 0,
  })

  // Intersection Observer for infinite scroll
  const lastTweetRef = useCallback(
    (node) => {
      if (!node || isFetchingNextPage) return

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      })

      observer.observe(node)
      return () => observer.disconnect()
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  )

  if (status === 'pending') return <LoadingSpinner />
  if (status === 'error') return <ErrorMessage error={error} />

  const tweets = data.pages.flatMap((page) => page.tweets)
  if (tweets.length === 0) return <EmptyState />

  return (
    <section className='space-y-4'>
      {tweets?.map((tweet, index) => (
        <div
          key={index}
          ref={index === tweets.length - 1 ? lastTweetRef : null}
          className='border border-gray-200 rounded-lg p-4 hover:bg-gray-50'
        >
          <TweetCard tweet={tweet} />
        </div>
      ))}
      {isFetchingNextPage && <LoadingSpinner />}
      {!hasNextPage && <EndMessage />}
    </section>
  )
}

const LoadingSpinner = () => (
  <div className='flex justify-center p-4'>
    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900' />
  </div>
)

const ErrorMessage = ({ error }) => (
  <div className='text-center text-red-600 py-4'>
    Error: {error.message || error}
  </div>
)

const EmptyState = () => (
  <p className='text-center text-gray-600 py-4'>No tweets found</p>
)

const EndMessage = () => (
  <p className='text-center text-gray-600 py-4'>You've reached the end</p>
)
