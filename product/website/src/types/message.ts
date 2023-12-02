import Messages from "@/components/chat/Messages";
import { AppRouter } from "@/trpc";
import { inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>

type ExtendedText = {
    text: string | JSX.Element
}

export type ExtendedMesage = ExtendedText