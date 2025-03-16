//Si queremos mostrar algo al usuario utilizamos 'page' pero si es algo orientado al backend, como manejar datos http se utiliza route
//Para manejar peticiones http se deben utilizar "route handlers"

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/prisma/client"

//No se utiliza el objeto 'request' pero si lo quitamos next va a manejar este archivo en el cache, asi que lo añadimos para que no se almacene en cache
export async function GET(request: NextRequest) {
  //Esta es la función de prisma que hace un SELECT, si abrimos un objeto dentro podemos especificar parámetros. EJ: findMany({ where: { email: "gerardo@gmail.com" } })
  const users = await prisma.user.findMany()

  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  if (!body.name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 })

  //Debemos revisar si ya existe el usuario primero con ese correo
  const userExists = await prisma.user.findUnique({
    where: { email: body.email },
  })
  if (userExists)
    return NextResponse.json({ error: "Email already exists" }, { status: 400 })

  //Al crear un usuario debemos asignar al atributo data lo que enviamos a nuestra BD. No es buena idea enviar el 'body' entero, porque se pueden manipular los datos
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  })

  return NextResponse.json(user, { status: 201 })
}
