# ✅ Vercel 部署检查清单

## 📋 部署前准备

### 已完成的配置 ✅
- [x] Prisma schema 已更新为 PostgreSQL
- [x] package.json 已更新（包含 postinstall 和 build 脚本）
- [x] vercel.json 配置文件已创建
- [x] .vercelignore 已创建
- [x] 代码已提交到本地 Git

### 需要准备的信息

#### 1. 数据库连接字符串
**您已有的：**
```
postgresql://postgres:Sbmooyu123@db.amqaeolouwkpsqndrubk.supabase.co:5432/postgres
```

**推荐用于 Vercel（连接池）：**
在 Supabase 项目中：
- 进入 **Settings > Database**
- 找到 **Connection Pooling** 部分
- 复制连接字符串（端口 **6543**）
- 格式：`postgresql://postgres:Sbmooyu123@db.amqaeolouwkpsqndrubk.supabase.co:6543/postgres?pgbouncer=true`

#### 2. NextAuth Secret
**已生成：**
```
+puVPV8IYSYWMccjC/NUggK2mTRo3KTKHNwYUzyaU6U=
```

#### 3. NextAuth URL
部署后会自动获得，格式：`https://your-app-name.vercel.app`

---

## 🚀 Vercel 部署步骤

### 步骤 1：登录 Vercel
1. 访问：https://vercel.com
2. 点击 **Sign Up** 或 **Log In**
3. 选择 **Continue with GitHub**
4. 授权 GitHub 访问

### 步骤 2：导入项目
1. 登录后，点击 **Add New...** 按钮
2. 选择 **Project**
3. 在仓库列表中找到 **CampusExchange**（或您的仓库名）
4. 点击 **Import**

### 步骤 3：配置项目设置
保持默认设置即可（Vercel 会自动检测 Next.js）：
- **Framework Preset**: Next.js（自动）
- **Root Directory**: `./`（根目录）
- **Build Command**: `npm run build`（自动）
- **Output Directory**: `.next`（自动）
- **Install Command**: `npm install`（自动）

### 步骤 4：添加环境变量 ⚠️ 重要

点击 **Environment Variables** 展开，添加以下变量：

#### 变量 1: DATABASE_URL
- **Key**: `DATABASE_URL`
- **Value**: 
  ```
  postgresql://postgres:Sbmooyu123@db.amqaeolouwkpsqndrubk.supabase.co:6543/postgres?pgbouncer=true
  ```
  （如果找不到连接池 URL，也可以先用 5432 端口试试）
- **Environment**: 全选（Production, Preview, Development）

#### 变量 2: NEXTAUTH_SECRET
- **Key**: `NEXTAUTH_SECRET`
- **Value**: `+puVPV8IYSYWMccjC/NUggK2mTRo3KTKHNwYUzyaU6U=`
- **Environment**: 全选（Production, Preview, Development）

#### 变量 3: NEXTAUTH_URL
- **Key**: `NEXTAUTH_URL`
- **Value**: （暂时留空，部署后会自动获得）
- **Environment**: 全选（Production, Preview, Development）

**添加方法：**
1. 在 **Environment Variables** 部分点击 **Add**
2. 输入 Key 和 Value
3. 选择环境（建议全选）
4. 点击 **Save**
5. 重复添加其他变量

### 步骤 5：部署
1. 确认所有环境变量都已添加
2. 点击右下角的 **Deploy** 按钮
3. 等待构建完成（约 2-3 分钟）

### 步骤 6：查看部署结果
部署成功后：
1. 您会看到一个绿色的 **Success** 消息
2. 页面会显示您的应用 URL（格式：`https://campus-exchange.vercel.app`）
3. 点击 **Visit** 访问您的应用

---

## 🗄️ 初始化数据库（部署后必须做）

### 方法 1：使用 Vercel CLI（推荐）

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录 Vercel
vercel login

# 3. 在项目目录链接到 Vercel 项目
cd "/Users/kevinx/Documents/Ai Project/ExchangePlatform"
vercel link

# 4. 运行数据库迁移
npx prisma migrate deploy
```

### 方法 2：使用 Supabase SQL Editor

如果 CLI 方法失败，可以在 Supabase 中手动创建表：

1. 访问 Supabase 项目
2. 点击左侧 **SQL Editor**
3. 运行以下 SQL（根据您的 schema 生成）：

```sql
-- 创建 User 表
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "grade" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

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
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Item_ownerId_idx" ON "Item"("ownerId");

ALTER TABLE "Item" ADD CONSTRAINT "Item_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- 创建 ExchangeRequest 表
CREATE TABLE "ExchangeRequest" (
    "id" TEXT NOT NULL,
    "requesterId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExchangeRequest_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ExchangeRequest_requesterId_idx" ON "ExchangeRequest"("requesterId");
CREATE INDEX "ExchangeRequest_receiverId_idx" ON "ExchangeRequest"("receiverId");
CREATE INDEX "ExchangeRequest_itemId_idx" ON "ExchangeRequest"("itemId");

ALTER TABLE "ExchangeRequest" ADD CONSTRAINT "ExchangeRequest_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ExchangeRequest" ADD CONSTRAINT "ExchangeRequest_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ExchangeRequest" ADD CONSTRAINT "ExchangeRequest_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

---

## 🔄 更新 NEXTAUTH_URL（部署后）

1. 复制您的 Vercel URL（如：`https://campus-exchange.vercel.app`）
2. 在 Vercel 项目设置中，进入 **Environment Variables**
3. 更新 `NEXTAUTH_URL` 为您的完整 URL
4. 重新部署（或等待自动重新部署）

---

## ✅ 验证部署

部署完成后，测试以下功能：
- [ ] 访问网站首页
- [ ] 注册新用户
- [ ] 登录
- [ ] 发布物品
- [ ] 浏览物品列表

---

## 🆘 遇到问题？

### 构建失败
- 检查 Vercel 构建日志
- 确认所有环境变量已正确设置
- 确认代码已推送到 GitHub

### 数据库连接失败
- 确认 `DATABASE_URL` 格式正确
- 尝试使用连接池 URL（端口 6543）
- 检查 Supabase 项目是否正常运行

### NextAuth 认证失败
- 确认 `NEXTAUTH_SECRET` 已设置
- 确认 `NEXTAUTH_URL` 指向正确的域名
- 重新部署应用

---

**准备好了吗？** 访问 https://vercel.com 开始部署！

