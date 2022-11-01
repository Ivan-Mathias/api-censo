import UserRolesEnum from "./user-roles";

interface JWTUserType {
    id: number;
    role: UserRolesEnum;
    ownsToken: (token: string) => boolean;
}

export default JWTUserType
