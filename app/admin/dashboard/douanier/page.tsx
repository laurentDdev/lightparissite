"use client"
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useUserRole} from "@/hooks/useUserRole";
import {ERole} from "@/types";

const Page = () => {

    const {data: session, status} = useSession();
    const router = useRouter()
    if (status === "unauthenticated") {
        return router.back();
    }

    const {data: user, isFetching, error} = useUserRole(session?.user?.email as string)

    if (user?.roleId !== ERole.ADMIN) {
        return router.back();
    }

    return (
        <div>
            page douanier
        </div>
    );
};

export default Page;
