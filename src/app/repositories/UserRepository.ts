import { PrismaClient, User } from '@prisma/client';

export default class UserRepository {
    constructor(private readonly prisma: PrismaClient) {}

    public async createUser(email: string, passwordHash: string, verifyToken: string): Promise<User> {
        try {
            const user = await this.prisma.user.create({ data: { email, passwordHash, verifyToken } });
            this.prisma.$disconnect();
            return user;
        } catch (error) {
            this.prisma.$disconnect();
            console.error(error);
            throw new Error('data access error');
        }
    }

    public async updateUser(userId: string, user: Partial<User>): Promise<void> {
        try {
            await this.prisma.user.update({ data: { ...user }, where: { id: userId } });
            this.prisma.$disconnect();
        } catch (error) {
            this.prisma.$disconnect();
            console.error(error);
            throw new Error('data access error');
        }
    }

    public async getUser(userId: string): Promise<User> {
        return this.prisma.user.findFirst({ where: { id: userId }, include: { UserDevice: true, UserProfile: true } });
    }

    public async getUserByEmail(email: string): Promise<User> {
        return this.prisma.user.findFirst({ where: { email } });
    }
}
