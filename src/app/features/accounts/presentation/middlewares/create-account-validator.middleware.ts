import { NextFunction, Request, Response } from "express";
import { ZodError, string, z } from "zod";
import { badRequest } from "../../../../shared/presentation/http-helper";
import { ClientRepository } from "../../../users/domain/infra/repositories";

function defineManagerSchema(body: Request) {
  const baseSchema = z.object({
    balance: z.number().min(0),
    limit: z.number().min(0),
    clientID: z.string()
  })

  return baseSchema;
}

export const createAccountValidator = async (req: Request, res: Response, next: NextFunction) => {
  let body = req.body;
  const { balance, limit, clientID } = req.body

  if (balance < 0 || limit < 0) {
    return badRequest(res, { success: false, error: "No negative value allowed" })
  }

  const clientRepository = new ClientRepository();

  const clientExist = await clientRepository.verifyID(clientID)

  if (!clientExist) {
    return badRequest(res, { success: false, error: "invalid client ID" })
  }

  if (clientExist.accountID) {
    return badRequest(res, { success: false, error: "user already has an account" })
  }
  const scheme = defineManagerSchema(body)

  try {
    const data = scheme.parse(body);
    Object.assign(
      req.body,
      data
    );
    return next();
  } catch (error: any) {
    if (error instanceof ZodError) {
      return badRequest(res, {
        success: false,
        error: error.issues.map((issue) => ({
          campo: issue.path[0],
          mensagem: issue.message,
          codigo: issue.code
        }))
      })
    }
    throw error;
  }
}