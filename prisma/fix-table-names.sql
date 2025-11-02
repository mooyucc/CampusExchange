-- 修复表名：将小写表名改为与 Prisma 期望的 PascalCase 表名匹配
-- 在 Supabase SQL Editor 中运行此脚本

-- 如果表名已经是正确的，这个脚本不会做任何更改（使用了 IF EXISTS 检查）
-- 如果表名是小写的，需要先重命名

-- 重命名 users 表为 User（如果存在）
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users' AND table_name != 'User') THEN
        ALTER TABLE "users" RENAME TO "User";
    END IF;
END $$;

-- 重命名 items 表为 Item（如果存在）
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'items' AND table_name != 'Item') THEN
        ALTER TABLE "items" RENAME TO "Item";
    END IF;
END $$;

-- 重命名 exchange_requests 表为 ExchangeRequest（如果存在）
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'exchange_requests' AND table_name != 'ExchangeRequest') THEN
        ALTER TABLE "exchange_requests" RENAME TO "ExchangeRequest";
    END IF;
END $$;

-- 验证表名
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('User', 'Item', 'ExchangeRequest');

