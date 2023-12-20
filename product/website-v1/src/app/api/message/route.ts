import { db } from "@/db";
import { SendMessageValidator } from "@/lib/validators/SendMessageValidator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/types/server";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {

    const body = await req.json()

    const {getUser} = getKindeServerSession()
    const user = getUser()

    const {id: userId} = user

    if(!userId) return new Response("Unauthorized", {status: 401})

    const {message} = SendMessageValidator.parse(body)

    await db.message.create({
        data: {
            text: message,
            isUserMessage: true,
            userId,
        }
    })
}