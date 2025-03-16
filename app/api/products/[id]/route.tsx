//En este archivo como se encuentra dentro de [id] pues ya podemos hacer peticiones de productos especificos
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

//Nuestra interface Props con el atirbuto params que contiene el ID el cual es el parámetro de consulta que vamos a recibir
interface Props {
    params: { id: number }
}

//Ponemos 'request: NextRequest' para que nextjs no almacene los datos en el cache
export function GET(request: NextRequest, { params: { id } }: Props) {
    //Revisamos si el id recibido por párametro coincide con el de nuestro producto y lo devolvemos
    const product = { id: 1, name: "Milk", price: 2.5 }
    if(id != product.id)
        return NextResponse.json({ error: "Product not found" }, {status: 404 })

    return NextResponse.json(product)
}

export async function PUT(request: NextRequest, { params: { id } }: Props) {
    //Hacemos lo mismo que en el POST, recibimos el body, validamos, pero en este caso también tenemos que comparar si el id coincide
    const body = await request.json()
    const validation = schema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })

    //"buscamos" nuestro producto y vemos si coincide su ID
    const product = { id: 1, name: "Milk", price: 2.5 }
    if(product.id != id)
        return NextResponse.json({ error: "Product not found" }, { status: 404 })

    //Lo modificamos
    product.name = body.name
    product.price = body.price

    return NextResponse.json(product)
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
    const product = { id: 1, name: "Milk", price: 2.5 }

    if(product.id != id)
        return NextResponse.json({ error: "Product not found" }, { status: 404 })

    return NextResponse.json({ message: "Product eliminated" })
}