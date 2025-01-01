import { sendFailApiResponse } from '../helpers/apiResponse';
import { verifyToken } from '../helpers/jwt.helper';

export async function authenticate(req, res, next) {
    const bearerToken = req.header('Authorization');
    if (!bearerToken) {
        return sendFailApiResponse(res, 'User not authorized', [], 401);
    }
    try {
        const [, token] = bearerToken.split(' ');
        const decoded = await verifyToken(token);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return sendFailApiResponse(res, `Unauthorized, reason ${error.message}`, [], 401);
    }
}

export default authenticate;
