-- 初始化数据库表结构（修复版）
-- 在 Supabase SQL Editor 中运行此脚本

-- 删除旧表（如果存在）
DROP TABLE IF EXISTS "ExchangeRequest" CASCADE;
DROP TABLE IF EXISTS "Item" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;

-- 创建 User 表
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "grade" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- 创建唯一索引
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- 创建 Item 表
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'available',
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- 创建索引
CREATE INDEX "Item_ownerId_idx" ON "Item"("ownerId");

-- 创建外键约束（注意：不能用 IF NOT EXISTS）
ALTER TABLE "Item" 
ADD CONSTRAINT "Item_ownerId_fkey" 
FOREIGN KEY ("ownerId") 
REFERENCES "User"("id") 
ON DELETE CASCADE 
ON UPDATE CASCADE;

-- 创建 ExchangeRequest 表
CREATE TABLE "ExchangeRequest" (
    "id" TEXT NOT NULL,
    "requesterId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExchangeRequest_pkey" PRIMARY KEY ("id")
);

-- 创建索引
CREATE INDEX "ExchangeRequest_requesterId_idx" ON "ExchangeRequest"("requesterId");
CREATE INDEX "ExchangeRequest_receiverId_idx" ON "ExchangeRequest"("receiverId");
CREATE INDEX "ExchangeRequest_itemId_idx" ON "ExchangeRequest"("itemId");

-- 创建外键约束（注意：不能用 IF NOT EXISTS）
ALTER TABLE "ExchangeRequest" 
ADD CONSTRAINT "ExchangeRequest_requesterId_fkey" 
FOREIGN KEY ("requesterId") 
REFERENCES "User"("id") 
ON DELETE CASCADE 
ON UPDATE CASCADE;

ALTER TABLE "ExchangeRequest" 
ADD CONSTRAINT "ExchangeRequest_receiverId_fkey" 
FOREIGN KEY ("receiverId") 
REFERENCES "User"("id") 
ON DELETE CASCADE 
ON UPDATE CASCADE;

ALTER TABLE "ExchangeRequest" 
ADD CONSTRAINT "ExchangeRequest_itemId_fkey" 
FOREIGN KEY ("itemId") 
REFERENCES "Item"("id") 
ON DELETE CASCADE 
ON UPDATE CASCADE;

