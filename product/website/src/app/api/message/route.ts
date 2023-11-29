import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/types/server";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {

    const body = await req.json()

    const {getUser} = getKindeServerSession()
    const user = getUser()

    const {id: userId} = user

    if(!userId) return new Response("Unauthorized", {status: 401})

    const {}
}