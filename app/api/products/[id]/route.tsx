//En este archivo como se encuentra dentro de [id] pues ya podemos hacer peticiones de productos especificos
import { NextRequest, NextResponse } from "next/server"
import schema from "../schema"
import { prisma } from "@/prisma/client"

//Nuestra interface Props con el atirbuto params que contiene el ID el cual es el parámetro de consulta que vamos a recibir
interface Props {
  params: { id: string } //tiene que ser string debido a que los parametros de URL son strings
}

//Ponemos 'request: NextRequest' para que nextjs no almacene los datos en el cache
export async function GET(request: NextRequest, { params }: Props) {
  //Buscamos el producto por su id, si lo encontramos lo devolvemos
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  })

  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 })

  return NextResponse.json(product)
}

export async function PUT(request: NextRequest, { params }: Props) {
  //Hacemos lo mismo que en el POST: recibimos el body y validamos
  const body = await request.json()
  const validation = schema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 })

  //buscamos nuestro producto y si existe lo modificamos
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  })
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 })

  //Lo modificamos
  const modifiedProduct = await prisma.product.update({
    where: { id: product.id },
    data: {
      name: body.name,
      price: body.price,
    },
  })

  return NextResponse.json(modifiedProduct)
}

export async function DELETE(request: NextRequest, { params }: Props) {
  //buscamos el producto, si lo encontramos lo eliminamos
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  })

  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 })

  const deletedProduct = await prisma.product.delete({
    where: { id: product.id },
  })

  return NextResponse.json(deletedProduct)
}
