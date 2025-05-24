-- AlterTable
ALTER TABLE "User" ADD COLUMN     "analyticsReports" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "audienceDesc" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "company" TEXT,
ADD COLUMN     "contentReminders" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "emailNotifications" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "industry" TEXT,
ADD COLUMN     "keywords" TEXT,
ADD COLUMN     "niche" TEXT,
ADD COLUMN     "role" TEXT;

-- CreateTable
CREATE TABLE "UserAudience" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "audience" TEXT NOT NULL,

    CONSTRAINT "UserAudience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBrandVoice" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "voice" TEXT NOT NULL,

    CONSTRAINT "UserBrandVoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInterest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "interest" TEXT NOT NULL,

    CONSTRAINT "UserInterest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAudience_userId_audience_key" ON "UserAudience"("userId", "audience");

-- CreateIndex
CREATE UNIQUE INDEX "UserBrandVoice_userId_voice_key" ON "UserBrandVoice"("userId", "voice");

-- CreateIndex
CREATE UNIQUE INDEX "UserInterest_userId_interest_key" ON "UserInterest"("userId", "interest");

-- AddForeignKey
ALTER TABLE "UserAudience" ADD CONSTRAINT "UserAudience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBrandVoice" ADD CONSTRAINT "UserBrandVoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInterest" ADD CONSTRAINT "UserInterest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
