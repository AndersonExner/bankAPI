import { Request, Response } from "express";
import { badRequest, ok } from "../../../../shared/presentation/http-helper";
import { BCryptPassword } from "../../../../shared/adapters/crypto";
import { ClientDTO } from "../../domain/dtos";
import { Profile } from "../../../../shared/infra/db/domain/enums/profile.enum";
import { ClientRepository } from "../../domain/infra/repositories";

export class ClientController {
  async createClient(req: Request, res: Response) {
    const { name, email, cpf, password } = req.body;
    const managerID = req.user.id as string

    const bcrypt = new BCryptPassword();
    const repository = new ClientRepository();

    const hashPassword = await bcrypt.hashPassword(password);

    const user: ClientDTO = {
      name,
      email,
      password: hashPassword,
      profile: Profile.CLIENT,
      cpf,
      managerID,
    }

    await repository.saveUser(user)

    return ok(res, { success: true, data: user })
  }
}