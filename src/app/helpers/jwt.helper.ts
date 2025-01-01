import { JWT_SECRET } from '../../constants';
import jwt, { JwtPayload } from 'jsonwebtoken';

type AuthUser = JwtPayload & { userId: string; email: string };

export async function verifyToken(token: string): Promise<AuthUser> {
    return jwt.verify(token, JWT_SECRET) as AuthUser;
}

export async function generateToken(params: string | Record<string, string>): Promise<string> {
    return jwt.sign(params, JWT_SECRET);
}
