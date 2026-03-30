"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Header() {
  const path = usePathname()

  const [coins, setCoins] = useState(0)

  // 🔥 Load coins
  useEffect(() => {
    const stored = Number(localStorage.getItem("coins") || 20)
    setCoins(stored)

    // auto update
    const interval = setInterval(() => {
      setCoins(Number(localStorage.getItem("coins") || 20))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const linkClass = (href: string) =>
    `hover:text-purple-600 hover:font-bold transition-all cursor-pointer ${
      path === href ? "text-purple-600 font-bold" : "text-gray-700"
    }`

  return (
    <div className='flex p-4 items-center justify-between bg-white shadow-sm sticky top-0 z-50'>

      <Link href="/dashboard">
        <Image src={'/logo.svg'} alt='Logo' width={160} height={100} />
      </Link>

      <ul className='hidden md:flex gap-6'>
        <li><Link href="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link></li>
        <li><Link href="/dashboard/questions" className={linkClass("/dashboard/questions")}>Questions</Link></li>
        <li><Link href="/dashboard/upgrade" className={linkClass("/dashboard/upgrade")}>Upgrade</Link></li>
        <li><Link href="/dashboard/HIW" className={linkClass("/dashboard/HIW")}>How it Works</Link></li>
      </ul>

      {/* 💰 COINS + USER */}
      <div className="flex items-center gap-4">
        <span className="text-purple-600 font-bold">
          💰 {coins} Coins
        </span>
        <UserButton />
      </div>
    </div>
  )
}

export default Header