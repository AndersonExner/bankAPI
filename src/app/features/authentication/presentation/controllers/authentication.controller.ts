import { Request, Response } from "express";
import { AccountRepository } from "../../../accounts/domain/infra/repositories";
import { BCryptPassword } from "../../../../shared/adapters/crypto";
import { LoginUseCase } from "../../domain/usecases";
import { ok, unauthorized } from "../../../../shared/presentation/http-helper";
import { CustomError } from "../../../../shared/errors";

export class AutenthicationController{
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const useCase = new LoginUseCase();
      const data = await useCase.execute({ email, password });
      return ok(res, {
          success: true,
          data,
      });
  } catch (error: any) {
      if (error instanceof CustomError) {
          return unauthorized(res, { success: false, error: error.message });
      }
      throw error;
  }
  }
}