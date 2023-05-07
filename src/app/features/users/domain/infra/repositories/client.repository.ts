import { randomUUID } from "crypto";
import { appDataSource } from "../../../../../shared/infra/db/data-source";
import { ClientEntity } from "../../../../../shared/infra/db/entities";
import { ClientDTO, ClientDetailDTO } from "../../dtos";
import { ILike } from "typeorm";

type GetUserByEmailOptions = {
  withPassword: boolean;
};

export class ClientRepository {
  private _repository = appDataSource.getRepository(ClientEntity);

  private mapEntity(entity: ClientEntity, options?: GetUserByEmailOptions) {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      profile: entity.profile,
      cpf: entity.cpf,
      managerID: entity.managerID,
      password: options != null && options.withPassword ? entity.password : undefined
    }
  }

  async saveUser(user: ClientDTO): Promise<ClientDetailDTO> {

    const ClientEntity = this._repository.create({
      id: randomUUID(),
      name: user.name,
      email: user.email,
      password: user.password,
      profile: user.profile,
      cpf: user.cpf,
      managerID: user.managerID
    })

    await this._repository.save(ClientEntity);

    return this.mapEntity(ClientEntity)
  }

  async verifyEmail(email: string): Promise<boolean> {
    const exist = await appDataSource.manager.exists(ClientEntity, {
      where: {
        email,
      }
    })
    return exist;
  }

  async verifyCPF(cpf: string): Promise<boolean> {
    const exist = await appDataSource.manager.exists(ClientEntity, {
      where: {
        cpf,
      }
    })
    return exist;
  }

  async verifyID(id: string): Promise<ClientDetailDTO | null> {
    const user = await appDataSource.manager.findOne(ClientEntity, {
      where: {
        id,
      }
    })

    if (!user) {
      return null
    }

    return user;
  }

  async getAllUsers(name?: string): Promise<ClientDetailDTO[]> {
    const usersEntity = await appDataSource.manager.find(
      ClientEntity,
      {
        where: {
          name: ILike(`%${name ?? ""}%`)
        }
      }
    )

    const users = usersEntity.map<ClientDetailDTO>(
      (user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        profile: user.profile,
        managerID: user.managerID
      })
    )

    return users;
  }

  async getUsersByID(id?: string): Promise<ClientDetailDTO[]> {
    const usersEntity = await appDataSource.manager.find(
      ClientEntity,
      {
        where: {
          id,
        }
      }
    );


    const users = usersEntity.map<ClientDetailDTO>(
      (user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        profile: user.profile,
        managerID: user.managerID,
        cpf: user.cpf
      })
    )

    return users;
  }

  async deleteUserByID(id: string) {
    await appDataSource.manager.delete(ClientEntity, {
      id,
    });

    return true;
  }

  async setAccount(id: string, accountId: string) {
    await appDataSource.manager.update(ClientEntity, id, {
      accountID: accountId
    })

    return true;
  }

  async getUserByEmail(email: string, options?: GetUserByEmailOptions): Promise<ClientDetailDTO | null> {
    const user = await appDataSource.manager.findOne(
      ClientEntity,
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
}