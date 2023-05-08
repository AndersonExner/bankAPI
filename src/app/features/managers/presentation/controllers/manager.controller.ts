import { Request, Response } from "express";
import { badRequest, ok } from "../../../../shared/presentation/http-helper";
import { BCryptPassword } from "../../../../shared/adapters/crypto";
import { Profile } from "../../../../shared/infra/db/domain/enums/profile.enum";
import { ManagerRepository } from "../../domain/infra/repositories";
import { ManagerDTO } from "../../domain/dto";


export class ManagerController {
  async createManager(req: Request, res: Response) {
    const { name, email, cpf, password, adminPass } = req.body;

    const repository = new ManagerRepository();
    const bcrypt = new BCryptPassword();

    const hashPassword = await bcrypt.hashPassword(password);

    const user: ManagerDTO = {
      name,
      email,
      password: hashPassword,
      profile: Profile.MANAGER,
      cpf
    }

    await repository.saveManager(user)

    return ok(res, { success: true, data: user })
  }

  async getClients(req: Request, res: Response) {
    const managerID = req.user.id as string

    const repository = await new ManagerRepository().listClients(managerID)

    if (repository.length === 0) {
      return badRequest(res, { success: false, error: "Manager has no clients" })
    }

    return ok(res, { success: true, data: repository })
  }

  async changeClientLimit(req: Request, res: Response) {
    const { newLimit, id } = req.body

    if (newLimit < 0) {
      return badRequest(res, { success: false, error: "Limit must be over 0" })
    }

    const sucess = await new ManagerRepository().changeClientLimit(id, newLimit)

    if (!sucess) {
      return badRequest(res, { success: false, error: "No user found" })
    }

    return ok(res, { success: true })
  }

  async deleteAcc(req: Request, res: Response) {
    const { id } = req.body

    if (!id) {
      return badRequest(res, { success: false, error: "Inform client id" })
    }

    const sucess = await new ManagerRepository().deleteClientAcc(id)

    if (!sucess) {
      return badRequest(res, { success: false, error: "No user found" })
    }

    return ok(res, { success: true })
  }
}
