import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { jwtConfig } from '../../../config/jwt.config';
import { TokenError } from '../domain/errors';

interface Token {
    sign(data: any): string;
    verify(token: string): any;
}

export class JwtToken implements Token {
    sign(data: any): string {
        return jwt.sign(data, jwtConfig.key, { expiresIn: jwtConfig.expireIn });
    }

    verify(token: string): any {
        try {
            return jwt.verify(token, jwtConfig.key);
        } catch (error) {
            if(error instanceof JsonWebTokenError){
                throw new TokenError(error.message)
            }
            throw error
        }
    }
}
