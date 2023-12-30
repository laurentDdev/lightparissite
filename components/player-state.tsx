"use client"

import React, {useEffect, useLayoutEffect, useState} from 'react';

import {Poppins} from 'next/font/google'
const poppins = Poppins({weight: "500", subsets: ['latin']})
type TserverInfo = {
    players: string[],
    sv_maxclients: number
}

const PlayerState = () => {

    const [serverInfo, setServerInfo] = useState<TserverInfo | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://servers-frontend.fivem.net/api/servers/single/kklxrv", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                setServerInfo(data.Data);
            } catch (error) {
                console.error("Error fetching server info:", error);
                // Handle the error as needed, e.g., show an error message to the user
            }
        };

        fetchData(); // Appel de la fonction asynchrone directement dans useEffect
    }, []);

    return (
        <div>
            {serverInfo ? ( <p className={poppins.className}>Connectés {serverInfo?.players.length} / {serverInfo?.sv_maxclients}</p>) : (<p className={poppins.className}>Serveur offline</p>)}
        </div>
    );
};

export default PlayerState;
