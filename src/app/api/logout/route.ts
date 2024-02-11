import { NextResponse,NextRequest } from "next/server"
import { signOut } from "next-auth/react"

//TO-DO - As Server Side Logout Action
export async function GET(request: NextRequest) {
    //I want to log user out by removing necessary cookies
    //Then redirect to /login

    return NextResponse.json({ message: "You have successfully logged out" })
}