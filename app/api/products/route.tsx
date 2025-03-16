import { NextRequest, NextResponse } from "next/server"
import schema from "./schema"
import { prisma } from "@/prisma/client"

//Aca es un simple get el cual devuelve todos los productos
export async function GET(request: NextRequest) {
  const products = await prisma.product.findMany()

  return NextResponse.json(products)
}

export async function POST(request: NextRequest) {
  //Hay que hacer await al body de la petición, por tanto, la función debe ser asincrona
  const body = await request.json()
  const validation = schema.safeParse(body) //safeParse no suelta expecion, Parse() si

  //Aca utilizamos la validación de nuestro archivo schema.ts por medio de la libreria zod
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 })

  //creamos el producto
  const product = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
    },
  })

  return NextResponse.json(product, { status: 201 })
}
