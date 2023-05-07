import { randomUUID } from "crypto";
import { appDataSource } from "../../../../../shared/infra/db/data-source";
import { ManagerEntity } from "../../../../../shared/infra/db/entities/manager.entity";
import { ManagerDTO, ManagerDetailDTO } from "../../dto";
import { ILike, UpdateResult } from "typeorm";
import { ClientDTO, ClientDetailDTO } from "../../../../users/domain/dtos";
import { ClientEntity } from "../../../../../shared/infra/db/entities";
import { AccountEntity } from "../../../../../shared/infra/db/entities/account.entity";


type GetUserByEmailOptions = {
  withPassword: boolean;
};


export class ManagerRepository {
  private _repository = appDataSource.getRepository(ManagerEntity);

  private mapEntity(entity: ManagerEntity, options?: GetUserByEmailOptions) {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      profile: entity.profile,
      cpf: entity.cpf,
      password: options != null && options.withPassword ? entity.password : undefined
    }
  }

  async saveManager(user: ManagerDTO): Promise<ManagerDetailDTO> {

    const userEntity = this._repository.create({
      id: randomUUID(),
      name: user.name,
      email: user.email,
      password: user.password,
      profile: user.profile,
      cpf: user.cpf
    })

    await this._repository.save(userEntity);

    return this.mapEntity(userEntity)
  }

  async verifyEmail(email: string): Promise<boolean> {
    const exist = await appDataSource.manager.exists(ManagerEntity, {
      where: {
        email,
      }
    })
    return exist;
  }

  async verifyCPF(cpf: string): Promise<boolean> {
    const exist = await appDataSource.manager.exists(ManagerEntity, {
      where: {
        cpf,
      }
    })
    return exist;
  }

  async getUserByEmail(email: string, options?: GetUserByEmailOptions): Promise<ManagerDetailDTO | null> {
    const user = await appDataSource.manager.findOne(
      ManagerEntity,
      {
        where: {
          email,
        }
      }
    );

    if (!user) {
      return null;
    }

    return user
  }

  async listClients(id: string): Promise<ClientDetailDTO[]> {
    const clientsList = await appDataSource.manager.find(ClientEntity, {
      where: {
        managerID: id,
      }
    })

    const clients = clientsList.map<ClientDetailDTO>(
      (user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        account_id: user.accountID,

      })
    )

    return clients
  }

  async changeClientLimit(id: string, newLimit: number): Promise<number | undefined> {
    const sucess = await appDataSource.manager.update(AccountEntity,
      { clientID: id },
      { limit: newLimit }
    )

    return sucess.affected
  }
}