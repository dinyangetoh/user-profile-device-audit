import { PrismaClient, UserDevice } from '@prisma/client';

export default class DeviceRepository {
    constructor(private readonly prisma: PrismaClient) {}

    public async addDevice(userId: string, deviceId: string, details: string): Promise<void> {
        try {
            await this.prisma.userDevice.upsert({
                create: { userId, deviceId, details },
                update: { details },
                where: { deviceId },
            });
            this.prisma.$disconnect();
        } catch (error) {
            this.prisma.$disconnect();
            console.error(error);
            throw new Error('data access error');
        }
    }

    public async removeDevice(userId: string, deviceId: string): Promise<void> {
        try {
            await this.prisma.userDevice.delete({ where: { userId, deviceId } });
            this.prisma.$disconnect();
        } catch (error) {
            this.prisma.$disconnect();
            console.error(error);
            throw new Error('data access error');
        }
    }

    public async getDevice(deviceId: string): Promise<UserDevice> {
        try {
            const device = await this.prisma.userDevice.findFirst({ where: { deviceId } });
            this.prisma.$disconnect();
            return device;
        } catch (error) {
            this.prisma.$disconnect();
            console.error(error);
            throw new Error('data access error');
        }
    }

    public async getUserDevices(userId: string): Promise<UserDevice[]> {
        try {
            const devices = await this.prisma.userDevice.findMany({ where: { userId } });
            this.prisma.$disconnect();
            return devices;
        } catch (error) {
            this.prisma.$disconnect();
            console.error(error);
            throw new Error('data access error');
        }
    }
}
