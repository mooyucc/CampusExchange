-- 初始化数据库表结构
-- 在 Supabase SQL Editor 中运行此脚本

-- 创建 User 表
CREATE TABLE IF NOT EXISTS "User" (
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
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

-- 创建 Item 表
CREATE TABLE IF NOT EXISTS "Item" (
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
CREATE INDEX IF NOT EXISTS "Item_ownerId_idx" ON "Item"("ownerId");

-- 创建外键约束
ALTER TABLE "Item" 
ADD CONSTRAINT IF NOT EXISTS "Item_ownerId_fkey" 
FOREIGN KEY ("ownerId") 
REFERENCES "User"("id") 
ON DELETE CASCADE 
ON UPDATE CASCADE;

-- 创建 ExchangeRequest 表
CREATE TABLE IF NOT EXISTS "ExchangeRequest" (
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
CREATE INDEX IF NOT EXISTS "ExchangeRequest_requesterId_idx" ON "ExchangeRequest"("requesterId");
CREATE INDEX IF NOT EXISTS "ExchangeRequest_receiverId_idx" ON "ExchangeRequest"("receiverId");
CREATE INDEX IF NOT EXISTS "ExchangeRequest_itemId_idx" ON "ExchangeRequest"("itemId");

-- 创建外键约束
ALTER TABLE "ExchangeRequest" 
ADD CONSTRAINT IF NOT EXISTS "ExchangeRequest_requesterId_fkey" 
FOREIGN KEY ("requesterId") 
REFERENCES "User"("id") 
ON DELETE CASCADE 
ON UPDATE CASCADE;

ALTER TABLE "ExchangeRequest" 
ADD CONSTRAINT IF NOT EXISTS "ExchangeRequest_receiverId_fkey" 
FOREIGN KEY ("receiverId") 
REFERENCES "User"("id") 
ON DELETE CASCADE 
ON UPDATE CASCADE;

ALTER TABLE "ExchangeRequest" 
ADD CONSTRAINT IF NOT EXISTS "ExchangeRequest_itemId_fkey" 
FOREIGN KEY ("itemId") 
REFERENCES "Item"("id") 
ON DELETE CASCADE 
ON UPDATE CASCADE;

