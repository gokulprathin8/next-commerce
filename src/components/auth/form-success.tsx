import {CheckCircle2} from "lucide-react";

export const FormSuccess = ({message} : {message ?: string}) => {

    return (
        <>
            {message && (
                <p className="bg-teal-400 text-secondary-foreground text-xs p-3 mt-2">
                    <CheckCircle2 className="w-4 h-4"/>
                    <p>{message}</p>
                </p>
            )}
        </>
    )
}