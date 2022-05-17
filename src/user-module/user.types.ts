import { UserRoles } from "./user.enum";
import { User } from "./user.model";

export interface IEmailPassword {
    email: string;
    password: string;
}

export interface ILoginParams extends IEmailPassword {
}

export interface IRegisterParams extends IEmailPassword {
    role: UserRoles;
    name: string;
}

export interface UserDTO {
    id: string;
    name: string;
    email: string;
    token?: string;
    role: UserRoles;
}

export interface UserWithToken extends User {
    token: string;
}