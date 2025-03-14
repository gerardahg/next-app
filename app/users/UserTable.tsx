import React from 'react'
import { sort } from 'fast-sort'
import Link from 'next/link';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    sortOrder: string
}

const UserTable = async ({ sortOrder }: Props) => {
    console.log(sortOrder)
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const users: User[] = await response.json()

    let sorted = users
    if(sortOrder == "asc"){
        sorted = sort(users).desc((u: User) => u.name)
        sortOrder = "desc"
    }
    else if(sortOrder = "desc") {
        sorted = sort(users).desc((u: User) => u.name)
        sortOrder = "asc"
    }

    return (
        <table className='table'>
        <thead>
            <tr>
            <th>
                <Link href={`./users?sortOrder=${sortOrder}`}>Name</Link>
            </th>
            <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {sorted.map(user => <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            </tr>)}
        </tbody>
        </table>
    )
}

export default UserTable