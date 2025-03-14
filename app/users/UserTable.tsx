import React from 'react'
import { sort } from 'fast-sort'
import Link from 'next/link';

//Declaramos una interface 'User' para los usuarios a los que hacemos fetch
interface User {
    id: number;
    name: string;
    email: string;
}

//Nuevamente la interface props pero en este caso solo de sortOrder de tipo string ya que eso es lo que recibimos por parametro
interface Props {
    sortOrder: string
}

const UserTable = async ({ sortOrder }: Props) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const users: User[] = await response.json()

    //Un operador ternario, el orden por defecto es por nombre, al menos que se envie el dato de 'email'
    let sorted = sortOrder != "email" ? sort(users).asc(user => user.name) : sort(users).asc(user => user.email)

    return (
        <table className='table'>
        <thead>
            <tr>
            <th>
                <Link href="./users?sortOrder=name">Name</Link>
            </th>
            <th>
                <Link href="./users?sortOrder=email">Email</Link>
            </th>
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