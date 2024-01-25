import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { Role, Branch } from "@app/types/severTypes"
import { userDTO, staffDTO, facilityDTO, roleDTO } from "@/types/entitiesDTO";
import { extend } from "dayjs";


interface httpUserResponse extends userDTO {
  role: roleDTO;
  staff: staffDTO;
  facility: facilityDTO;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string,
      username: string,
      passwordResetRequired: boolean,
      createdAt: string,
      updatedAt: string,
      role: roleDTO
    } & DefaultSession;
  }
  interface User extends DefaultUser, httpUserResponse {

  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userId: string,
    expires: string;
    accessToken: string;
    refreshToken: string;
  }
}
