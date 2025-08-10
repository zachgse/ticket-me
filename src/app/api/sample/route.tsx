import { NextResponse } from "next/server"

export async function GET(){
    return NextResponse.json(
        {message:"Hi i am sample"},
        {status:200}
    )
}