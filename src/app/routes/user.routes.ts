import { RequestHandler, Router } from 'express';
import { getDevices, login, logout, registerUser, verifyUser } from '../controllers/user.controller';

export default (router: Router, requestMiddlewares: RequestHandler[]): void => {
    router.post('/login', login);
    router.post('/verify', verifyUser);
    router.post('/user', registerUser);
    router.post('/device/logout', requestMiddlewares, logout);
    router.get('/user/devices', requestMiddlewares, getDevices);
};
