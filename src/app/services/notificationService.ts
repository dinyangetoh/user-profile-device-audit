import path from 'node:path';
import { FRONTEND_URL } from '../../constants';
import * as fs from 'node:fs';

export function sendEmailVerification(userEmail: string, verificationToken: string) {
    console.log('Sending email verification token');
    const basePath = path.resolve('./');
    const verifyUrl = `${FRONTEND_URL}/verify/${verificationToken}`;
    const notificationId = `${userEmail}-${Date.now()}`;
    const mailPath = path.resolve(basePath, `mailbox/${notificationId}.json`);

    const emailContent = JSON.stringify({
        subject: 'Verify Email',
        sender: 'admin@example.com',
        receiver: userEmail,
        verifyUrl,
    });

    fs.writeFileSync(mailPath, emailContent);
    console.log('Verification email sent');
}
