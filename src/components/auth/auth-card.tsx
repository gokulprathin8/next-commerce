import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Socials from "@/components/auth/socials";

type CardWrapperProps = {
    children: React.ReactNode;
    cardTitle: string;
    backButtonHref: string;
    backButtonLabel: string;
    showSocials: boolean;
}

function BackButton() {
    return null;
}

export const AuthCard = ({
    children,
    cardTitle,
    backButtonHref,
    backButtonLabel,
    showSocials
} : CardWrapperProps) => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>{cardTitle}</CardTitle>
                </CardHeader>
                <CardContent>{children}</CardContent>
                {showSocials && (
                    <CardFooter>
                        <Socials />
                    </CardFooter>
                )}
                <CardFooter>
                    <BackButton />
                </CardFooter>
            </Card>
        </>
    )
}

