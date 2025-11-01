# 🚀 Vercel 快速部署指南

## 3 分钟快速开始

### 步骤 1：准备数据库（5 分钟）

1. **注册 Supabase**（免费）：https://supabase.com
2. 创建新项目
3. 在 **Settings > Database** 复制连接字符串（格式：`postgresql://...`）

### 步骤 2：更新 Prisma Schema

编辑 `prisma/schema.prisma`，将第 9 行改为：

```prisma
provider = "postgresql"  // 从 "sqlite" 改为 "postgresql"
```

### 步骤 3：部署到 Vercel（2 分钟）

1. 访问 https://vercel.com，用 GitHub 登录
2. 点击 **Add New...** > **Project**
3. 导入您的 GitHub 仓库
4. 在环境变量中添加：
   - `DATABASE_URL`: 从 Supabase 复制的连接字符串
   - `NEXTAUTH_SECRET`: 运行 `openssl rand -base64 32` 生成
5. 点击 **Deploy**

### 步骤 4：初始化数据库

部署成功后，在本地运行（使用 Vercel 的 DATABASE_URL）：

```bash
# 设置环境变量
export DATABASE_URL="postgresql://..." # 从 Vercel 环境变量复制

# 运行迁移
npx prisma migrate deploy
```

### 步骤 5：更新 NEXTAUTH_URL

1. 复制您的 Vercel URL（如 `https://your-app.vercel.app`）
2. 在 Vercel 项目设置中添加环境变量：
   - `NEXTAUTH_URL`: `https://your-app.vercel.app`
3. 重新部署

## ✅ 完成！

现在您的应用可以通过 Vercel URL 访问了。

---

**详细说明请查看 `VERCEL_DEPLOYMENT.md`**

