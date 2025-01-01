import { PrismaClient, UserProfile } from '@prisma/client';

export default class UserProfileRepository {
    constructor(private readonly prisma: PrismaClient) {}

    public async updateProfile(profile: Partial<UserProfile>): Promise<void> {
        const { userId, username, firstName, lastName } = profile;
        try {
            await this.prisma.userProfile.upsert({
                create: { userId, username, firstName, lastName },
                update: { username, firstName, lastName },
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
