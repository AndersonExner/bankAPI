import 'dotenv/config';

export const jwtConfig = {
    key: process.env.JWT_KEY as string,
    expireIn: process.env.JWT_EXPIRE_IN as string | number,
    maxAge: process.env.JWT_MAX_AGE as string | number,
};
