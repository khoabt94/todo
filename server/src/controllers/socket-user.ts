interface UserWithSocket {
    socket_id: string
    user_id: string
}

export const usersWithSocket: UserWithSocket[] = []


export const saveUserSocket = ({ socket_id, user_id }: { socket_id: string, user_id: string }) => {
    const checkExist = usersWithSocket.find(u => u.socket_id === socket_id && u.user_id === user_id)
    if (!checkExist) {
        usersWithSocket.push({ socket_id, user_id })
    }
}

export const findUserSocket = (user_id: string) => {
    const checkExist = usersWithSocket.find(u => u.user_id === user_id)
    return checkExist ? checkExist.socket_id : null
}


export const removeUserSocket = (socket_id: string) => {
    const checkExist = usersWithSocket.findIndex(u => u.socket_id === socket_id)
    if (checkExist !== -1) {
        usersWithSocket.splice(checkExist, 1)
    }
}