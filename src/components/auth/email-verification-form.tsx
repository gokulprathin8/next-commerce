"use client";

import {useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {newVerification} from "@/server/actions/tokens";
import {AuthCard} from "@/components/auth/auth-card";
import {FormSuccess} from "@/components/auth/form-success";
import FormError from "@/components/auth/form-error";

export const EmailVerificationForm = () => {
    const token = useSearchParams().get('token');
    const router = useRouter();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleVerification = useCallback(() => {
        if (success || error) return
        if (!token) {
            setError("No token found!");
            return;
        }
        newVerification(token).then((data) => {
            if (data.error) {
                setError(data.error);
            }
            if (data.success) {
                setSuccess(data.success);
                router.push('/auth/login');
            }
        })
    }, []);

    useEffect(() => {handleVerification()}, []);

    return (
        <AuthCard
            cardTitle="Verifying your account"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
            showSocials={false}
        >
            <p>{!success && !error ? 'Verifying email...' : null}</p>
            <FormSuccess message={success} />
            <FormError message={error} />
        </AuthCard>
    )

}