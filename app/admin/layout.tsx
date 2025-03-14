import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className='flex'>
        <aside className='bg-white p-5'>Admin Sidebar</aside>
        <div className='p-5'>{children}</div>
    </div>
  )
}

export default AdminLayout