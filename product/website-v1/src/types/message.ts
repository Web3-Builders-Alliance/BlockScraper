import Messages from "@/components/chat/Messages";
import { AppRouter } from "@/trpc";
import { inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>

type ExtendedText = {
    createdAt: string | number | Date;
    id: string;
    isUserMessage: any;
    text: string | JSX.Element
}

export type ExtendedMesage = ExtendedText