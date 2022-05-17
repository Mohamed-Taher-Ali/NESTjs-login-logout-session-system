import { User } from "src/user-module/user.model";

export enum repositories {
    USERS_REPOSITORY = 'USERS_REPOSITORY',
};

export const repositoriesModel = [
    {
        provide: repositories.USERS_REPOSITORY,
        useValue: User
    },
];