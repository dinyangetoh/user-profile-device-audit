export const APP_PORT = Number(process.env.APP_PORT) || 3001;

export const JWT_SECRET = process.env.JWT_SECRET || 'Random_Secret';
export const JWT_EXPIRES = process.env.JWT_EXPIRES || '100d';

export const EVENTS = {
    USER_CREATED: 'user-created',
    SEND_EMAIL_VERIFICATION: 'send-email-verification',
    PROFILE_UPDATED: 'profile-updated',
};

export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
