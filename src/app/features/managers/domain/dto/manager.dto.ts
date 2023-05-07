import { Profile } from "../../../../shared/infra/db/domain/enums/profile.enum";
import { ClientEntity } from "../../../../shared/infra/db/entities";

export interface ManagerDTO {
  name: string;
  email: string;
  password: string;
  profile: Profile;
  cpf: string;
}

export interface ManagerDetailDTO {
  id: string;
  name: string;
  email: string;
  profile: Profile;
  password?: string;
}