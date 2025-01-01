import UserProfileRepository from '../repositories/UserProfileRepository';
import { UpdateUserProfileDto } from '../dto/UpdateUserProfile.dto';
import { UserProfile } from '@prisma/client';

export default class ProfileService {
    constructor(private readonly userProfileRepository: UserProfileRepository) {}

    public async updateProfile(updateUserProfileDto: UpdateUserProfileDto): Promise<void> {
        try {
            await this.userProfileRepository.updateProfile(updateUserProfileDto);
        } catch (error) {
            throw error;
        }
    }

    public async getProfile(userId: string): Promise<UserProfile> {
        try {
            return this.userProfileRepository.getProfile(userId);
        } catch (error) {
            throw error;
        }
    }
}
