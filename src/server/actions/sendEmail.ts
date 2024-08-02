import getBaseUrl from "@/lib/base-url";
import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = getBaseUrl();

export async function sendVerificationEmail(email: string, token: string) {
    const confirmLink = `${domain}/auth/new-verification?token=${token}&email=${email}`;
    const {data, error} = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Please confirm your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email</p>`
    })
    if (error) return console.log(error)
    if (data) return data
}
