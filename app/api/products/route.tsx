import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

//Aca es un simple get el cual devuelve "todos" los productos
export function GET(request: NextRequest) {
    return NextResponse.json([
        { id: 1, name: "Milk", price: 2.5 },
        { id: 2, name: "Bread", price: 3.5 }
    ])
}

export async function POST(request: NextRequest) {
    //Hay que hacer await al body de la petición, por tanto, la función debe ser asincrona
    const body = await request.json()
    const validation = schema.safeParse(body)

    //Aca utilizamos la validación de nuestro archivo schema.ts por medio de la libreria zod
    if(!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })

    //"creamos" el producto
    const product = { id: 1, name: body.name, price: body.price }

    return NextResponse.json(product, { status: 201 })
}