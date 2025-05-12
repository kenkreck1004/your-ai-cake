'use client'

import { ConnectButton } from '@mysten/dapp-kit'
import { Link } from '@radix-ui/themes'
import Balance from '@suiware/kit/Balance'
import NetworkType from '@suiware/kit/NetworkType'

import Image from 'next/image'
import Logo from '../../assets/logo-cake.svg'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm px-4 py-3 transition-all duration-300">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
      {/* Logo & Title */}
      <Link
        href="/"
        className="flex items-center gap-2 text-gray-800 hover:no-underline dark:text-white"
      >
        <Image
          width={48}
          height={48}
          src={Logo}
          alt="Cake Icon Logo"
          className="rounded-full shadow-md"
        />
        <span className="text-xl sm:text-2xl font-semibold text-pink-600">
          Your Cake Icon
        </span>
      </Link>

      {/* Wallet Info + Connect Button */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
          <Balance />
          <NetworkType />
        </div>

        <div className="sds-connect-button-container">
          <ConnectButton />
        </div>
      </div>
    </div>
  </header>
  )
}
export default Header
