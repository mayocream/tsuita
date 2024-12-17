'use client'

import { motion } from 'framer-motion'
import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HouseSolidIcon,
  MagnifyingGlassIcon as SearchSolidIcon,
  UserCircleIcon as UserSolidIcon,
  Cog6ToothIcon as CogSolidIcon,
} from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menus = [
  { name: '時間線', path: '/', icon: HomeIcon, activeIcon: HouseSolidIcon },
  {
    name: '検索',
    path: '/search',
    icon: MagnifyingGlassIcon,
    activeIcon: SearchSolidIcon,
  },
  {
    name: '個人情報',
    path: '/profile',
    icon: UserCircleIcon,
    activeIcon: UserSolidIcon,
  },
  {
    name: '設定',
    path: '/settings',
    icon: Cog6ToothIcon,
    activeIcon: CogSolidIcon,
  },
]

export const Navigation = () => {
  return (
    <motion.nav className='w-64 p-4'>
      <motion.ul className='flex flex-col space-y-6'>
        {menus.map((menu) => (
          <motion.li key={menu.path}>
            <Link
              className='flex items-center space-x-4 text-xl rounded-lg p-2'
              href={menu.path}
            >
              {usePathname() === menu.path ? (
                <menu.activeIcon className='w-7 h-7' />
              ) : (
                <menu.icon className='w-7 h-7' />
              )}
              <span
                className={`${usePathname() === menu.path ? 'font-bold' : ''}`}
              >
                {menu.name}
              </span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.nav>
  )
}
