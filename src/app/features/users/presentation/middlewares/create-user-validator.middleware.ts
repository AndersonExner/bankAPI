import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { badRequest } from '../../../../shared/presentation/http-helper';
import { ClientRepository } from '../../domain/infra/repositories';

function defineManagerSchema(body: Request) {
  const baseSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    cpf: z.number(),
  })

  return baseSchema;
}

export const createUserValidator = async (req: Request, res: Response, next: NextFunction) => {
  let body = req.body;
  const { name, email, cpf, password } = req.body;

  const managerID = req.user.id as string

    if(!managerID){
      return badRequest(res, { success: false, error: 'manager ID not found' })
    }

    const repository = new ClientRepository();

    const validEmail = await repository.verifyEmail(email);

    if (validEmail) {
      return badRequest(res, { success: false, error: 'Invalid EMAIL' })
    }

    const validCPF = await repository.verifyCPF(cpf)

    if (validCPF) {
      return badRequest(res, { success: false, error: 'Invalid CPF' })
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