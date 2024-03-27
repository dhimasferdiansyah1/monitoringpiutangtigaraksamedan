/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `user_info` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `user_info` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `user_info` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_info_clerkId_key" ON "user_info"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "user_info_username_key" ON "user_info"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_info_email_key" ON "user_info"("email");
