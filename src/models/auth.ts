export interface AuthInfoUser {
    email: string,
    fullname: string,
    id: string,
    role: string,
}

export interface AuthLogin {
    email: string,
    password: string,
}