import React, { Suspense } from 'react'
import UserTable from './UserTable'
import Link from 'next/link'

//Declaramos una interface Props, con el atributo searchParam que contiene un objeto sortOrder de tipo string, este será el objeto que entra por URL
interface Props {
  searchParams: { sortOrder: string }
}

//Entra por parametro a la función flecha 'sortOrder' que seria la variable del URL, tiene que tener el mismo nombre
const UsersPage = ({ searchParams: { sortOrder } } : Props) => {
  return (
    <>
      <h1>Users</h1>
      <Link href="/users/new" className='btn'>New User</Link>

      {/* Suspense es una etiqueta que va a mostrar su contenido mientras se carga el componente de adentro */}
      <Suspense fallback={<p>Loading...</p>}>
        {/* Aqui llamamos a nuestro contenedor y le pasamos sortOrder por parametro*/}
        <UserTable sortOrder = { sortOrder }  />
      </Suspense>
    </>
  )
}

export default UsersPage