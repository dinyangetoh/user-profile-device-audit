/*
  Warnings:

  - Added the required column `details` to the `UserDevice` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserDevice" (
    "deviceId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserDevice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserDevice" ("createdAt", "deviceId", "userId") SELECT "createdAt", "deviceId", "userId" FROM "UserDevice";
DROP TABLE "UserDevice";
ALTER TABLE "new_UserDevice" RENAME TO "UserDevice";
CREATE UNIQUE INDEX "UserDevice_deviceId_key" ON "UserDevice"("deviceId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
