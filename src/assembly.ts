import AppService from './app/services/AppService';
import UserService from './app/services/UserService';
import UserRepository from './app/repositories/UserRepository';
import { PrismaClient } from '@prisma/client';
import ProfileService from './app/services/ProfileService';
import UserProfileRepository from './app/repositories/UserProfileRepository';
import EventEmitter from 'node:events';
import DeviceRepository from './app/repositories/DeviceRepository';

export const appService = new AppService();

const prisma = new PrismaClient();
const eventEmitter = new EventEmitter();

const userRepository = new UserRepository(prisma);
const userProfileRepository = new UserProfileRepository(prisma);
const deviceRepository = new DeviceRepository(prisma);

export const userService = new UserService(userRepository, eventEmitter, deviceRepository);
export const profileService = new ProfileService(userProfileRepository);
