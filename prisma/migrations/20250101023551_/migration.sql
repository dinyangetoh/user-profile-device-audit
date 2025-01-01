/*
  Warnings:

  - A unique constraint covering the columns `[deviceId]` on the table `UserDevice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserDevice_deviceId_key" ON "UserDevice"("deviceId");
