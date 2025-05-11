"use client"

import { useEffect } from "react"
import { socket } from "./SConnection"

export const useSocketLogin = (id: string) => {
    useEffect(() => {
        console.log(id)
        if (!id) return

        if (!socket.connected) socket.connect()

        const handleConnect = () => {
            socket.emit("user-online", id)
        }

        socket.on("connect", handleConnect)

        if (socket.connected) {
            handleConnect()
            }

        return () => {
            socket.off("connect", handleConnect)
        }

    }, [id])
}