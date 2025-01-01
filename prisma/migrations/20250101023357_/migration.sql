/*
  Warnings:

  - The primary key for the `UserDevice` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserDevice" (
    "deviceId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserDevice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserDevice" ("createdAt", "deviceId", "userId") SELECT "createdAt", "deviceId", "userId" FROM "UserDevice";
DROP TABLE "UserDevice";
ALTER TABLE "new_UserDevice" RENAME TO "UserDevice";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
