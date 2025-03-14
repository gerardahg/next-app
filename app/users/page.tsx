import React from 'react'
import UserTable from './UserTable'

//Declaramos una interface Props, con el atributo searchParam que contiene un objeto sortOrder de tipo string, este será el objeto que entra por URL
interface Props {
  searchParams: { sortOrder: string }
}

//Entra por parametro a la función flecha 'sortOrder' que seria la variable del URL, tiene que tener el mismo nombre
const UsersPage = ({ searchParams: { sortOrder } } : Props) => {
  return (
    <>
      <h1>Users</h1>
      {/* Aqui llamamos a nuestro contenedor y le pasamos sortOrder por parametro*/}
      <UserTable sortOrder = { sortOrder }  />
    </>
  )
}

export default UsersPage