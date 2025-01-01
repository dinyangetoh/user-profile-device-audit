import { PrismaClient, UserProfile } from '@prisma/client';

export default class UserProfileRepository {
    constructor(private readonly prisma: PrismaClient) {}

    public async updateProfile(profile: Partial<UserProfile>): Promise<void> {
        const { userId, username, ...otherDetails } = profile;

        try {
            await this.prisma.userProfile.upsert({
                create: { userId, username: username || userId, ...otherDetails },
                update: otherDetails,
                where: { userId },
            });

            this.prisma.$disconnect();
        } catch (error) {
            this.prisma.$disconnect();
            console.error(error);
            throw new Error('data access error');
        }
    }

    public async getProfile(userId: string): Promise<UserProfile | null> {
        return this.prisma.userProfile.findFirst({ where: { userId }, include: { user: true } });
    }
}
