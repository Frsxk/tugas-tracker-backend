/*
  Warnings:

  - Added the required column `userId` to the `MataKuliah` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Tugas` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MataKuliah" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT,
    "sks" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MataKuliah_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MataKuliah" ("createdAt", "deskripsi", "id", "nama", "sks", "updatedAt") SELECT "createdAt", "deskripsi", "id", "nama", "sks", "updatedAt" FROM "MataKuliah";
DROP TABLE "MataKuliah";
ALTER TABLE "new_MataKuliah" RENAME TO "MataKuliah";
CREATE TABLE "new_Tugas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Not Started',
    "deadline" DATETIME NOT NULL,
    "mataKuliahId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Tugas_mataKuliahId_fkey" FOREIGN KEY ("mataKuliahId") REFERENCES "MataKuliah" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Tugas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Tugas" ("createdAt", "deadline", "deskripsi", "id", "mataKuliahId", "nama", "status", "updatedAt") SELECT "createdAt", "deadline", "deskripsi", "id", "mataKuliahId", "nama", "status", "updatedAt" FROM "Tugas";
DROP TABLE "Tugas";
ALTER TABLE "new_Tugas" RENAME TO "Tugas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
