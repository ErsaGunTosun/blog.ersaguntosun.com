'use client';
import React from "react";
import { Verify, Logout } from "@/utils/adminFunc"

async function LogoutPage() {
    React.useEffect(() => {
        let verify = Verify().then((res) => {
            if (res.status === 200) {
                console.log('verified')
                Logout()
                window.location.href = '/admin/login'
            }
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div>

        </div>
    )
}

export default LogoutPage