import { Request, Response } from "express";
import { AccountRepository } from "../../domain/infra/repositories";
import { NewAccountDTO } from "../../domain/dtos";
import { badRequest, ok } from "../../../../shared/presentation/http-helper";
import { ClientRepository } from "../../../users/domain/infra/repositories";

export class AccountController {
  async createAccount(req: Request, res: Response) {
    const { balance, limit, clientID } = req.body

    const repository = new AccountRepository();

    const acc: NewAccountDTO = {
      balance,
      limit,
      open: true,
      clientID: clientID
    }

    const account = await repository.saveAcc(acc);

    await new ClientRepository().setAccount(clientID, account.id)

    return ok(res, { success: true, data: acc })
  }
}