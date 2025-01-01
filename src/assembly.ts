import AppService from './app/services/AppService';
import UserService from './app/services/UserService';
import UserRepository from './app/repositories/UserRepository';
import { PrismaClient, User } from '@prisma/client';
import ProfileService from './app/services/ProfileService';
import UserProfileRepository from './app/repositories/UserProfileRepository';
import EventEmitter from 'node:events';
import DeviceRepository from './app/repositories/DeviceRepository';
import { EVENTS } from './constants';
import { sendEmailVerification } from './app/services/notificationService';
import { plainToInstance } from 'class-transformer';
import { UpdateUserProfileDto } from './app/dto/UpdateUserProfile.dto';

export const appService = new AppService();

const prisma = new PrismaClient();
const eventEmitter = new EventEmitter();

const userRepository = new UserRepository(prisma);
const userProfileRepository = new UserProfileRepository(prisma);
const deviceRepository = new DeviceRepository(prisma);

export const userService = new UserService(userRepository, eventEmitter, deviceRepository);
export const profileService = new ProfileService(userProfileRepository);

eventEmitter.on(EVENTS.USER_CREATED, async ({ id: userId, email, verifyToken }: Partial<User>) => {
    // Send email notification
    sendEmailVerification(email, verifyToken);

    // Create profile
    const [username] = email.split('@');
    const updateProfileDto = plainToInstance(UpdateUserProfileDto, { userId, username });
    await profileService.updateProfile(updateProfileDto);
});
