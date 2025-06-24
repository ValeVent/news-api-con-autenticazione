export interface ILoginInfo {
 email: string;
 password: string;
}

export interface ILoginResponse {
 accessToken: string
 user: User
}

export interface User {
 email: string
 id: number
}