'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const newUserPage = () => {
  //Necesitamos declarar un router para poder hacer "programmatic navigation"
  const router = useRouter()

  return (
    <button className='btn btn-primary'onClick={() => router.push('/users')}>Create</button>
  )
}

export default newUserPage