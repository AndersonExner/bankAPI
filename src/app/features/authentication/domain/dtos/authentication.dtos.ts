import { Profile } from "../../../../shared/infra/db/domain/enums/profile.enum";

export interface LoginDTO{
  email: string;
  password: string;
}

export interface LoginDetailDTO {
  id: string;
  name: string;
  email: string;
  profile: Profile;    
  token: string;
} 