import {AlertCircle} from "lucide-react";

export default function FormError({message} : {message ?: string}) {
    return (
        <>
            {message && (
                <p className="bg-destructive text-secondary-foreground text-xs p-3 mt-2">
                    <AlertCircle className="w-4 h-4"/>
                    <p></p>
                </p>
            )}
        </>
    )
}
