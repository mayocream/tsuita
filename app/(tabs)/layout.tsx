import { Navigation } from '@/components/navigation'
import { TweetDialog } from '@/components/tweet'
import { QueryProvider } from '@/providers/query'
import { Toaster } from 'react-hot-toast'

export default function Layout({ children }) {
  return (
    <QueryProvider>
      <div className='container mx-auto flex justify-center min-h-screen bg-white'>
        {/* Left Sidebar */}
        <div className='hidden md:flex w-72 px-4 py-6 items-center flex-col'>
          {/* Logo or Brand */}
          <Navigation />
          <TweetDialog />
        </div>

        {/* Main Content Area */}
        <div className='flex-1 max-w-[600px]'>
          <div className='border-x border-gray-200 min-h-screen'>
            <div className='flex justify-center items-center border-b border-gray-200'>
              <h1 className='font-semibold text-xl p-2'>対多</h1>
            </div>
            {children}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className='hidden md:block w-72 px-4 py-6'></div>
      </div>
      <Toaster />
    </QueryProvider>
  )
}
