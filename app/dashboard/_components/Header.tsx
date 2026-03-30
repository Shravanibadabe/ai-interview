"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
    const path=usePathname();
    useEffect(()=>
      {
        console.log(path)
      },[]
    )
  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
      <Image src={'/logo.svg'} alt='logo' width={160} height={100}/>
      <ul className='hidden md:flex gap-6'>
        <li className={`hover:text-purple hover:font-bold transition-all cursor-pointer ${path=='/dashboard' &&'text-purple font-bold'}`}>Dashboard</li>
        <li className={`hover:text-purple hover:font-bold transition-all cursor-pointer ${path=='/dashboard/questions' &&'text-purple font-bold'}`}>Questions</li>
        <li className={`hover:text-purple hover:font-bold transition-all cursor-pointer ${path=='/dashboard/upgrade' &&'text-purple font-bold'}`}>Upgrade</li>
        <li className={`hover:text-purple hover:font-bold transition-all cursor-pointer ${path=='/dashboard/HIW' &&'text-purple font-bold'}`}>How it Works</li>
      </ul>
      <UserButton/>
    </div>
  )
}

export default Header