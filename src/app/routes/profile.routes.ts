import { RequestHandler, Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profile.controller';

export default (router: Router, requestMiddlewares: RequestHandler[]): void => {
    router.post('/profile', requestMiddlewares, updateProfile);
    router.get('/profile', requestMiddlewares, getProfile);
};
