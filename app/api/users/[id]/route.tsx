import { NextRequest, NextResponse } from "next/server"
import schema from "../schema"
import { prisma } from "@/prisma/client"

//Esta es la interface que define el ID que entra por parametro de la URL
interface Props {
  params: { id: string }
}

//En este caso cambiamos la interface porque los parámetros de URL son string
export async function GET(request: NextRequest, { params }: Props) {
  //Hacemos un fetch del usuario por medio su ID
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) }, //Hay que hacerle un parseInt() para transformar el string del URL a int
  })

  //Comprobamos si encontramos al usuario
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 })

  return NextResponse.json(user)
}

export async function PUT(request: NextRequest, { params }: Props) {
  const body = await request.json()
  //Parse suelta una exception, safeParse no
  const validation = schema.safeParse(body)
  if (!validation.success)
    //verificamos el json con nuestro schema de zod
    return NextResponse.json(validation.error.errors, { status: 400 })

  //Buscamos que el usuario exista
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  })
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 })

  //aca es lo mismo, no updateamos con el body entero sino con parametros especificos para evitar
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: body.name,
      email: body.email,
    },
  })

  return NextResponse.json(updatedUser)
}

export async function DELETE(request: NextRequest, { params }: Props) {
  //revisamos si existe el usuario
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  })
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 })

  const deletedUser = await prisma.user.delete({
    where: { id: user.id },
  })

  return NextResponse.json(deletedUser)
}
