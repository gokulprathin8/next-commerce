"use client";

import {useFormStatus} from 'react-dom';

export default function PostSubmitButton() {
    const {pending} = useFormStatus();

    return (
        <button
            disabled={pending}
            type="submit"
        >
            Submit
        </button>
    )
}