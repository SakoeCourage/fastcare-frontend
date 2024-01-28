import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React,{useEffect} from "react";

export default function Nextsessionprovider({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}