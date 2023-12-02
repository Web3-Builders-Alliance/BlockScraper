import { cn } from "@/lib/utils"
import { ExtendedMesage } from "@/types/message"
import { Icons } from "../Icons"

interface MessageProps {
    message: ExtendedMesage
    isNextMessagePerson: boolean
}

const Message = ({message, isNextMessagePerson}: MessageProps) => {
    return (
        <div 
        className = {cn('flex items-end', {
            "justify-end": message
    })}>
        <div className = {cn('relative flex h-6 w-6 aspect-square items-center justify-center', {
        })}></div>
    </div>
    )
}

export default Message