import { randomUUID } from "crypto";
import { appDataSource } from "../../../../../shared/infra/db/data-source";
import { AccountEntity } from "../../../../../shared/infra/db/entities/account.entity";
import { AccountDTO, NewAccountDTO } from "../../dtos";

export class AccountRepository {
  private _repository = appDataSource.getRepository(AccountEntity);

  private mapEntity(entity: AccountEntity) {
    return {
      id: entity.id,
      balance: entity.balance,
      limit: entity.limit,
      open: entity.open,
      clientID: entity.clientID
    }
  }

  async saveAcc(acc: NewAccountDTO): Promise<AccountDTO> {

    const account = this._repository.create({
      id: randomUUID(),
      balance: acc.balance,
      limit: acc.limit,
      open: true,
      clientID: acc.clientID
    })

    await this._repository.save(account);

    return this.mapEntity(account)
  }

  async getAcc(id: string): Promise<AccountDTO | null> {
    const acc = await appDataSource.manager.findOne(AccountEntity, {
      where: {
        clientID: id
      }
    })

    if (!acc) {
      return null
    }

    return acc
  }
}