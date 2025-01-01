import { Request, Response } from 'express';
import { appService } from '../../assembly';
import { sendSuccessApiResponse } from '../helpers/apiResponse';
import { getRequestOriginDevice } from '../helpers/request.helper';

export function getWelcome(req: Request, res: Response): Response {
    const welcomeMessage = appService.getWelcomeMessage();

    const requestOriginDevice = getRequestOriginDevice(req.headers);
    console.log('Device Params', requestOriginDevice);
    return sendSuccessApiResponse(res, { message: welcomeMessage });
}
