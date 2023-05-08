import { Profile } from "../../../../shared/infra/db/domain/enums/profile.enum";

export interface ClientDTO {
  name: string;
  email: string;
  password: string;
  profile: Profile;
  cpf: string;
  account_id?: string;
  managerID: string;
}

export interface ClientDetailDTO {
  id: string;
  name: string;
  email: string;
  cpf?: string;
  accountID?: string;
  password?: string;
  profile?: Profile;
  managerID?: string;
}