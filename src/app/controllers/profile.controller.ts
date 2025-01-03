import { Request, Response } from 'express';
import { sendFailApiResponse, sendSuccessApiResponse } from '../helpers/apiResponse';
import { plainToInstance } from 'class-transformer';
import { UpdateUserProfileDto } from '../dto/UpdateUserProfile.dto';
import { validate } from 'class-validator';
import { profileService } from '../../assembly';
import path from 'node:path';
import { UploadedFile } from 'express-fileupload';

export async function updateProfile(req: Request, res: Response): Promise<Response> {
    const userId = req['userId'];
    if (!userId) {
        return sendFailApiResponse(res, 'User not found');
    }

    let uploadedPhoto: UploadedFile;

    if (req.files && Object.keys(req.files).length !== 0) {
        uploadedPhoto = req.files.photo as UploadedFile;
        console.log(uploadedPhoto);
    }

    const updateUserProfileDto = plainToInstance(UpdateUserProfileDto, { userId, ...req.body });

    const errors = await validate(updateUserProfileDto);
    if (errors.length) {
        return sendFailApiResponse(
            res,
            'Validation failed',
            errors.map((error) => `${error.property} field not valid`),
        );
    }

    try {
        let photoUrl: string;
        if (uploadedPhoto) {
            const basePath = path.resolve('./');

            photoUrl = `${basePath}/uploads/profile_images/${uploadedPhoto.name}`;
            await uploadedPhoto.mv(photoUrl);
        }
        await profileService.updateProfile({ ...updateUserProfileDto, photoUrl });
        return sendSuccessApiResponse(res, { message: 'User profile updated' });
    } catch (err) {
        return sendFailApiResponse(res, err.message || 'Profile update failed');
    }
}

export async function getProfile(req: Request, res: Response): Promise<Response> {
    const userId = req['userId'];

    if (!userId) {
        return sendFailApiResponse(res, 'User not found');
    }

    try {
        const userProfile = await profileService.getProfile(userId);
        return sendSuccessApiResponse(res, userProfile, userProfile ? 200 : 404);
    } catch (err) {
        return sendFailApiResponse(res, err.message || 'Profile not found');
    }
}
