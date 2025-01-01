import UserRepository from '../repositories/UserRepository';
import { RegisterUserDto } from '../dto/RegisterUser.dto';
import { comparePassword, hashPassword } from '../helpers/password.helper';
import { LoginDto } from '../dto/Login.dto';
import jwt from 'jsonwebtoken';
import { EVENTS, JWT_EXPIRES, JWT_SECRET } from '../../constants';
import { generateToken, verifyToken } from '../helpers/jwt.helper';
import EventEmitter from 'node:events';
import DeviceRepository from '../repositories/DeviceRepository';
import { RequestOriginDevice } from '../entities/RequestOriginDevice';
import { v5 as uuidV5 } from 'uuid';
import { UserDevice } from '@prisma/client';

export default class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly eventEmitter: EventEmitter,
        private readonly deviceRepository: DeviceRepository,
    ) {}

    public async registerUser(registerUserDto: RegisterUserDto): Promise<void> {
        const { email, password } = registerUserDto;

        const passwordHash = await hashPassword(password);
        const verifyToken = await generateToken(email);

        try {
            const user = await this.userRepository.createUser(email, passwordHash, verifyToken);
            this.eventEmitter.emit(EVENTS.USER_CREATED, {
                ...user,
                passwordHash: undefined,
            });
        } catch (error) {
            throw error;
        }
    }

    public async login(loginDto: LoginDto, requestOriginDevice: RequestOriginDevice): Promise<{ token }> {
        const { email, password } = loginDto;

        try {
            const user = await this.userRepository.getUserByEmail(email);

            const isValidPassword = await comparePassword(password, user?.passwordHash || '');

            if (!user || !isValidPassword) {
                throw new Error('Invalid email or password');
            }

            const token = jwt.sign(
                {
                    userId: user.id,
                    email: email,
                },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES },
            );

            const deviceId = uuidV5(JSON.stringify(requestOriginDevice), user.id);

            await this.deviceRepository.addDevice(user.id, deviceId, JSON.stringify(requestOriginDevice));

            return { token };
        } catch (error) {
            throw error;
        }
    }

    public async verifyUser(token: string): Promise<void> {
        try {
            const tokenParams = await verifyToken(token);
            if (!tokenParams?.email) {
                throw new Error('Invalid token');
            }

            const user = await this.userRepository.getUserByEmail(tokenParams.email);
            if (!user) {
                throw new Error('Invalid user');
            }

            if (user.isVerified) {
                throw new Error('User already verified');
            }

            await this.userRepository.updateUser(user.id, { isVerified: true });
        } catch (error) {
            throw error;
        }
    }

    public async deviceLogout(userId: string, deviceId: string): Promise<void> {
        try {
            await this.deviceRepository.removeDevice(userId, deviceId);
        } catch (error) {
            throw error;
        }
    }

    public async getDevices(userId: string): Promise<UserDevice[]> {
        try {
            return this.deviceRepository.getUserDevices(userId);
        } catch (error) {
            throw error;
        }
    }
}
