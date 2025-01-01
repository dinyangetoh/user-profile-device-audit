## User Profile Device Audit API

This is a POC for a robust and secure user management system with a focus on clean code, security, and best practices.
The task involves implementing features for registration, login, profile management, and device management

### Installation

```bash
  npm ci
```

To Start Development Server

```bash
 npm run dev
```

Copy `env.example` to  `.env` in root
Run migration, this uses `SQLite`

```bash
    npx prisma migrate dev
```

## Endpoints

* POST http://localhost:3001/user to register
* POST http://localhost:3001/login to login
* POST http://localhost:3001/verify to verify user after register
* POST http://localhost:3001/device/logout to logout user device
* GET http://localhost:3001/user/devices to see list of user devices
*
* POST http://localhost:3001/profile to update user profile
* GET http://localhost:3001/profile to view user profile
