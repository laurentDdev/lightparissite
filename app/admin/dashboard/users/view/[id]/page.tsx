"use client"
import {useUserId} from "@/hooks/useUserId";
import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {useRoles} from "@/hooks/useRoles";
import {useTeams} from "@/hooks/useTeams";
import {useState} from "react";

import { Role, Team } from "@prisma/client";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select";
import {useMutation} from "react-query";
import axios from "axios";
import {signOut, useSession} from "next-auth/react";
import {useUserRole} from "@/hooks/useUserRole";
import {ERole} from "@/types";
import {useToast} from "@/components/ui/use-toast";
import useSWR, {mutate} from "swr";
import {fetcher} from "@/lib/fetcher";
const Page = ({params}: {params: {id: string}}) => {
    const {id} = params;
    const { data: session, status } = useSession();
    const { data: userConnected, isFetching: userConnectedFetching, error } = useUserRole(session?.user?.email as string);
    const [editMode, setEditMode] = useState(false)
    const {data: user, isFetching} = useUserId(id)
    const router = useRouter()
    const { toast } = useToast()
    const {data: roles, isFetching: roleFetching} = useRoles()

    const {data: teams, isFetching: teamFetching} = useTeams()

    const [newRole, setNewRole] = useState<string | null>(null)
    const [newTeam, setNewTeam] = useState<string | null>(null)


    const updateUser = async (updatedData: {role: string, team: string | null}) => {
        const response = await axios.put(`/api/users/team/${id}`, updatedData)
        console.log(response.data)
        mutate(`/api/users/team/${id}`)

        setEditMode(false)
        toast({
            title: "Utilisateur modifié",
            description: "L'utilisateur a bien été modifié"
        })
    }

    const deleteUser = async () => {
        const response = await axios.delete(`/api/users/${id}`)
        mutate(`/api/users/${id}`)
        toast({
            title: "Utilisateur supprimé",
            description: "L'utilisateur a bien été supprimé"
        })
        router.back()
    }


    if (userConnected?.roleId !== ERole.ADMIN) {
        return router.back()
    }

    if (status === "unauthenticated") {
        return router.back();
    }


    if (isFetching || roleFetching || teamFetching) {
        return <Skeleton  />
    }

    if (!user) {
        router.back()
    }


    const handleDelete = () => {
        if (confirm("alert(\"Voulez vous vraiment supprimer cet utilisateur ?")) {
            deleteUser()
        } else {
            return
        }
    }

    const handleEdit = ( )  => {
        if (!editMode) {
            setEditMode(true)
        }else {
            const role = newRole || user?.role?.name as string
            const team = teams?.find((team : Team) => team?.name === newTeam)?.id || teams?.find((team : Team) => user?.team?.name === newTeam)?.id as string

            updateUser({role, team})
        }
    }
    return (
        <Card className={"h-full"}>
            <CardHeader>
                <CardTitle>
                    Identiter user  : {user?.name}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Card>
                    <CardContent>
                        <div>
                            <Label htmlFor={"name"} >Nom</Label>
                            <Input id={"name"} value={user?.name as string} disabled={true} />
                        </div>
                        <div>
                            <Label htmlFor={"email"} >Email</Label>
                            <Input id={"email"} value={user?.email as string} disabled={true} />
                        </div>
                        <div>
                            <Label htmlFor={"role"} >Role</Label>
                            {
                                editMode ? (
                                    <Select onValueChange={setNewRole}>
                                        <SelectTrigger>
                                            <p>{newRole ? newRole : user?.role?.name as string}</p>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                roles?.map((role: Role) => (
                                                    <SelectItem key={role.name} value={role.name}>{role.name}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <Input id={"role"} value={newRole ? newRole : user?.role?.name as string } disabled={true} />
                                )
                            }
                        </div>
                        <div>
                            <Label htmlFor={"team"} >Team</Label>
                            {
                                editMode ? (
                                    <Select onValueChange={setNewTeam}>
                                        <SelectTrigger>
                                            <p>{newTeam ? newTeam : user?.team?.name as string } </p>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                teams?.map((team: Team) => (
                                                    <SelectItem key={team.name} value={team.name}>{team.name}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <Input id={"team"} value={newTeam ? newTeam : user?.team?.name as string } disabled={true} />
                                )
                            }
                        </div>

                        <div className={"flex justify-between gap-2 mt-5"}>
                            <div>
                                <Button variant={"ghost"} onClick={() => router.back()}>Retour</Button>
                            </div>
                            <div className={"flex gap-2"}>
                                <Button variant={"destructive"} onClick={handleDelete}>Supprimer</Button>
                                <Button variant={"secondary"} onClick={handleEdit}>Modifier</Button>
                            </div>
                        </div>

                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
};

export default Page;
