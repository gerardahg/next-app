//Si queremos mostrar algo al usuario utilizamos 'page' pero si es algo orientado al backend, como manejar datos http se utiliza route
//Para manejar peticiones http se deben utilizar "route handlers"

import { NextRequest, NextResponse } from "next/server";

//No se utiliza el objeto 'request' pero si lo quitamos next va a manejar este archivo en el cache, asi que lo añadimos para que no se almacene en cache
export function GET(request: NextRequest) {
    //Aqui hariamos un fetch a la BD pero de momento se va a simular
    return NextResponse.json([
        { id: 1, name: "Gerardo" },
        { id: 2, name: "Ricky" },
    ])
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    if(!body.name)
        return NextResponse.json({ error: "Name is required" }, {status: 400})

    return NextResponse.json({ id: 1, name: body.name }, {status: 201})
}