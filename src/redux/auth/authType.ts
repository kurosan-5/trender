export type myUser = {
    id: string,
    name: string | null,
    email: string | null,
    photoURL: string | null,
    emailVerified: boolean
}

export type reducerUser = {
    auth: {
        user: myUser | null
    }
}