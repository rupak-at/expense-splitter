"use client"

import { useEffect } from "react"
import { socket } from "./SConnection"

export const useSocketLogin = (id: string, groupId: string) => {
    useEffect(() => {
        if (!id) return

        if (!socket.connected) socket.connect()

        const handleConnect = () => {
            socket.emit("user-online", id)
            if (groupId !== "") {
                socket.emit("join-group", groupId)
            }
        }

        socket.on("connect", handleConnect)
        

        if (socket.connected) {
            handleConnect()
            }

        return () => {
            socket.off("connect", handleConnect)
        }

    }, [id, groupId])
}