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
    queryFn: ({ pageParam }) =>
      fetch(`/api/tweets${pageParam ? `?cursor=${pageParam}` : ''}`).then(
        (res) => res.json()
      ),
    getNextPageParam: (lastPage) => {
      // If the page is empty or has fewer items than the limit, there are no more pages
      if (!lastPage || lastPage.length < 10) return undefined
      // Return the ID of the last item for the next cursor
      return lastPage[lastPage.length - 1].id
    },
    initialPageParam: undefined,
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

  return (
    <section className='space-y-4'>
      {data.pages.map((page, index) => (
        <div key={index}>
          {page.map((tweet, index) => (
            <div
              key={index}
              ref={index === page.length - 1 ? lastTweetRef : null}
              className='border border-gray-200 rounded-lg p-4 hover:bg-gray-50'
            >
              <TweetCard tweet={tweet} />
            </div>
          ))}
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
