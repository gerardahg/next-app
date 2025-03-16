'use client'
import React from 'react'

//error es otro archivo que busca el router, aqui podemos personalizar los mensajes de error
//Este al estar al nivel del directorio 'app' toma cualquier error en la aplicación entera 
//al menos que hayan páginas 'error' en directorios especificos

interface Props {
    error: Error
    reset: () => void //Reset permite al usuario volver a intentar, debemos pasar la función a un boton
}

const ErrorPage = ({ error, reset }: Props) => {
  console.log('Error', error)
  return (
    <>
    <div>An unexpected error has occurred.</div>
    <button className='btn' onClick={() => reset()}>Retry</button>
    </>
  )
}

export default ErrorPage