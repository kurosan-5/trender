export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type User = {
    id: string,
    name: string,
    email: string,
    photoURL: string,
    emailVerified: boolean
}