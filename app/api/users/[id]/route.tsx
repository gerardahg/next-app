import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

interface Props {
    params: { id: number }
}

export function GET(request: NextRequest, { params: { id } }: Props) {
    if (id > 10)
        return NextResponse.json({ error: "User not found" }, { status: 404 })

    return NextResponse.json({ id: 1, name: "Gerardo" })
}

export async function PUT(request: NextRequest, { params: { id } }: Props) {
    const body = await request.json()
    //Parse suelta una exception, safeParse no
    const validation = schema.safeParse(body)
    if(!validation.success) //1. verificamos el json con schema
        return NextResponse.json(validation.error.errors, { status: 400 })

    if(!body.name) //2. Verificamos por nuestra cuenta
        return NextResponse.json({ error: "name is required" }, { status: 400 })

    const user = { id: 10, name: "Gerardo"}

    if(user.id != id)
        return NextResponse.json({ error: "User not found" }, { status: 404 })

    user.name = body.name
    return NextResponse.json(user)

}

export function DELETE(request: NextRequest, { params: { id } }: Props) {
    const user = { id: 10, name: "Gerardo" }

    if(id != user.id)
        return NextResponse.json({ error: "User not found"}, { status: 404 })

    return NextResponse.json({ message: `User ${user.name} deleted`})
}