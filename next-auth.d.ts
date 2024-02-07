import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { Role, Branch } from "@app/types/severTypes"
import { userDTO, staffDTO, facilityDTO, roleDTO } from "@/types/entitiesDTO";
import { extend } from "dayjs";


export interface httpUserResponse extends userDTO {
  role: roleDTO;
}

declare module "next-auth" {
  interface Session {
    user: userDTO & httpUserResponse &
    {
      accessToken: string
      refreshToken: string
      name: string
      email: string
    }
    ;
  }

  interface User extends DefaultUser, httpUserResponse {
    id: number,
    accessToken: string,
    refreshToken: string,
  }

}

declare module "next-auth/jwt" {
  interface User extends DefaultUser, httpUserResponse {
    accessToken: string,
    refreshToken: string,
  }
  interface JWT extends DefaultJWT {
    userId: number,
    expires: string;
    accessToken: string;
    refreshToken: string;
    user: User;
  }
}
