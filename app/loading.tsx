import React from 'react'

//Se tiene la opcion de en el layout.tsx del root del proyecto poner un <suspense>
//Pero esta manera es mejor ya que es una de las palabras reservadas en el router como page y layout
const Loading = () => {
  return (
    <span className="loading loading-spinner loading-md"></span>
  )
}

export default Loading