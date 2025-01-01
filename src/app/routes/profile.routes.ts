import { RequestHandler, Router } from 'express';
import { updateProfile } from '../controllers/profile.controller';

export default (router: Router, requestMiddlewares: RequestHandler[]): void => {
    router.post('/profile', requestMiddlewares, updateProfile);
};
