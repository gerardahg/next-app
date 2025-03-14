import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <div className='flex p-5 bg-blue-950'>
        <Link href="/" className='mr-5'>Next.js</Link>
        <Link href="/users" className='mr-5'>Users</Link>
        <Link href="/admin">Admin</Link>
    </div>
  )
}

export default NavBar