import { Request, Response } from 'express';
import { sendFailApiResponse, sendSuccessApiResponse } from '../helpers/apiResponse';
import { RegisterUserDto } from '../dto/RegisterUser.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { userService } from '../../assembly';
import { LoginDto } from '../dto/Login.dto';
import { getRequestOriginDevice } from '../helpers/request.helper';

export async function registerUser(req: Request, res: Response): Promise<Response> {
    const { body: newUser } = req;

    const registerUserDto = plainToInstance(RegisterUserDto, newUser);

    const errors = await validate(registerUserDto);
    if (errors.length) {
        return sendFailApiResponse(
            res,
            'Input validation failed',
            errors.map((error) => `${error.property} field not valid`),
        );
    }

    try {
        await userService.registerUser(newUser);
        return sendSuccessApiResponse(res, { message: 'User registered' }, 201);
    } catch (err) {
        // console.error(err);
        return sendFailApiResponse(res, err.message || 'User registration failed');
    }
}

export async function login(req: Request, res: Response): Promise<Response> {
    const { body: loginParams, headers } = req;
    const deviceParams = getRequestOriginDevice(headers);

    const loginDto = plainToInstance(LoginDto, loginParams);

    const errors = await validate(loginDto);
    if (errors.length) {
        return sendFailApiResponse(
            res,
            'Input validation failed',
            errors.map((error) => `${error.property} field not valid`),
        );
    }

    try {
        const { token } = await userService.login(loginDto, deviceParams);
        return sendSuccessApiResponse(res, { token });
    } catch (err) {
        return sendFailApiResponse(res, err.message || 'Login failed');
    }
}

export async function verifyUser(req: Request, res: Response): Promise<Response> {
    const token = req.query.token as string;

    if (!token) {
        return sendFailApiResponse(res, 'invalid token');
    }

    try {
        await userService.verifyUser(token);
        return sendSuccessApiResponse(res, { message: 'User verified' });
    } catch (err) {
        return sendFailApiResponse(res, err.message || 'User verification failed');
    }
}

export async function devicelogout(req: Request, res: Response): Promise<Response> {
    const deviceId = req.body.deviceId;

    if (!deviceId) {
        return sendFailApiResponse(res, 'Device ID required');
    }

    const userId = req['userId'];
    if (!userId) {
        return sendFailApiResponse(res, 'User not found');
    }

    try {
        await userService.deviceLogout(userId, deviceId);
        return sendSuccessApiResponse(res, { message: 'User logged out' });
    } catch (err) {
        return sendFailApiResponse(res, err.message || 'Logout failed');
    }
}

export async function getDevices(req: Request, res: Response): Promise<Response> {
    const userId = req['userId'];
    if (!userId) {
        return sendFailApiResponse(res, 'User not found');
    }

    try {
        const devices = await userService.getDevices(userId);
        return sendSuccessApiResponse(res, devices);
    } catch (err) {
        return sendFailApiResponse(res, err.message || 'Error fetching devices');
    }
}
