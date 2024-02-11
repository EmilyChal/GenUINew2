export interface User {
    username: string;
    email: string;
    token: string;
}

export interface UserLogin {
    username: string;
    password: string;
}

export interface UserLoginResult {
    token: string,
    userId: string
}

export interface RegistrationDetails {
    contact_email: string,
    password: string,
    username: string,
}
