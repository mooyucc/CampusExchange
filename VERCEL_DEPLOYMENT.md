# Vercel 部署指南

本指南将帮助您将校园二手交换平台部署到 Vercel。

## 📋 前置要求

1. ✅ GitHub 账号（代码已在 GitHub 上）
2. ✅ Vercel 账号（免费注册）
3. ✅ 数据库（需要 PostgreSQL，见下文）

## 🚀 部署步骤

### 步骤 1：注册 Vercel 账号

1. 访问 [vercel.com](https://vercel.com)
2. 点击右上角 "Sign Up"
3. 选择 "Continue with GitHub" 使用 GitHub 账号登录

### 步骤 2：创建数据库（重要！）

**⚠️ 重要提示：** Vercel 不支持 SQLite（基于文件的数据库），必须使用 PostgreSQL。

#### 选项 A：使用 Vercel Postgres（推荐）⭐

1. 在 Vercel 项目中，进入 **Storage** 标签页
2. 点击 **Create Database**
3. 选择 **Postgres**
4. 选择免费套餐或付费套餐
5. 创建后会自动生成 `POSTGRES_URL` 环境变量

#### 选项 B：使用其他免费 PostgreSQL 服务

- **Supabase** (推荐)：https://supabase.com
  - 免费 500MB 数据库
  - 注册后创建项目，在 Settings > Database 获取连接字符串
  
- **Neon**：https://neon.tech
  - 免费 PostgreSQL
  - 自动暂停功能节省资源

- **Railway**：https://railway.app
  - 提供免费的 PostgreSQL

#### 步骤 2.1：更新 Prisma Schema（如果使用 PostgreSQL）

如果使用 PostgreSQL，需要更新 `prisma/schema.prisma`：

```prisma
datasource db {
  provider = "postgresql"  // 从 "sqlite" 改为 "postgresql"
  url      = env("DATABASE_URL")
}
```

### 步骤 3：导入项目到 Vercel

1. 登录 Vercel 后，点击 **Add New...** > **Project**
2. 在 GitHub 仓库列表中找到 `CampusExchange`（或您的仓库名）
3. 点击 **Import**

### 步骤 4：配置项目设置

在导入页面：

1. **Framework Preset**: 自动识别为 Next.js（无需修改）
2. **Root Directory**: 保持 `./`（根目录）
3. **Build Command**: `npm run build`（已自动设置）
4. **Output Directory**: `.next`（已自动设置）
5. **Install Command**: `npm install`（已自动设置）

### 步骤 5：配置环境变量

在 **Environment Variables** 部分，添加以下变量：

#### 必须的环境变量：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `DATABASE_URL` | `postgresql://...` | PostgreSQL 连接字符串 |
| `NEXTAUTH_SECRET` | 随机字符串 | 运行 `openssl rand -base64 32` 生成 |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` | **暂时留空，Vercel 会自动设置** |

#### 设置步骤：

1. 点击 **Environment Variables**
2. 添加每个变量：
   - **Name**: `DATABASE_URL`
   - **Value**: 您的 PostgreSQL 连接字符串
   - **Environment**: 选择 `Production`, `Preview`, `Development`（全选）
3. 重复添加 `NEXTAUTH_SECRET`
4. `NEXTAUTH_URL` 可以暂时不设置，Vercel 会自动使用部署后的 URL

### 步骤 6：部署

1. 点击 **Deploy** 按钮
2. 等待构建完成（通常 2-3 分钟）
3. 构建成功后，Vercel 会提供一个 URL（如 `your-app.vercel.app`）

### 步骤 7：初始化数据库

部署成功后，需要运行数据库迁移：

#### 方法 1：使用 Vercel CLI（推荐）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 链接项目
vercel link

# 运行 Prisma 迁移
npx prisma migrate deploy
```

#### 方法 2：使用 Vercel 环境变量 + 本地运行

1. 在 Vercel 项目设置中复制 `DATABASE_URL`
2. 在本地 `.env.local` 中设置：
   ```bash
   DATABASE_URL="postgresql://..." # 从 Vercel 复制
   ```
3. 运行迁移：
   ```bash
   npx prisma migrate deploy
   ```

#### 方法 3：使用 Vercel 的 Terminal（如果有）

在 Vercel 项目页面使用 Terminal 功能运行：
```bash
npx prisma migrate deploy
```

### 步骤 8：更新 NEXTAUTH_URL

部署完成后：

1. 复制您的 Vercel URL（如 `https://your-app.vercel.app`）
2. 在 Vercel 项目设置 > Environment Variables
3. 添加或更新 `NEXTAUTH_URL` 为您的完整 URL
4. 重新部署（或等待自动重新部署）

### 步骤 9：验证部署

1. 访问您的 Vercel URL
2. 测试注册和登录功能
3. 测试物品发布功能
4. 检查控制台是否有错误

## 🔄 后续更新

每次推送到 GitHub 的 `main` 分支，Vercel 会自动：

1. 检测到代码变更
2. 自动触发构建
3. 运行 `npm run build`
4. 部署新版本
5. 提供预览 URL（Pull Request 时）

## 📊 监控和日志

- **Analytics**: Vercel 提供免费的分析功能
- **Logs**: 在项目页面查看实时日志
- **Functions**: 查看 API 路由的执行情况

## 🔧 常见问题

### 问题 1：构建失败

**解决方案：**
- 检查构建日志中的错误信息
- 确保所有环境变量都已设置
- 检查 `package.json` 中的脚本是否正确

### 问题 2：数据库连接失败

**解决方案：**
- 确认 `DATABASE_URL` 格式正确
- 检查数据库是否允许 Vercel 的 IP 访问（大多数托管服务默认允许）
- 确认数据库服务正在运行

### 问题 3：NextAuth 认证失败

**解决方案：**
- 确认 `NEXTAUTH_SECRET` 已设置
- 确认 `NEXTAUTH_URL` 指向正确的域名
- 检查浏览器控制台的错误信息

### 问题 4：Prisma Client 未生成

**解决方案：**
在构建命令中添加 Prisma 生成：
```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

或更新 Vercel 的 Build Command 为：
```bash
prisma generate && npm run build
```

## 💡 优化建议

1. **数据库连接池**：Vercel 是无服务器环境，考虑使用连接池
2. **缓存策略**：使用 Vercel Edge Functions 优化性能
3. **图片优化**：使用 Next.js Image 组件和 Vercel 的图片优化
4. **环境变量管理**：使用 Vercel 的 Environment Variables 管理不同环境

## 📚 相关资源

- [Vercel 文档](https://vercel.com/docs)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Prisma 部署指南](https://www.prisma.io/docs/guides/deployment)
- [NextAuth.js 部署](https://next-auth.js.org/configuration/options#nextauth_url)

## ✅ 检查清单

部署前确认：

- [ ] Vercel 账号已创建
- [ ] PostgreSQL 数据库已创建
- [ ] Prisma schema 已更新为 PostgreSQL（如果之前使用 SQLite）
- [ ] `DATABASE_URL` 环境变量已设置
- [ ] `NEXTAUTH_SECRET` 环境变量已设置
- [ ] 代码已推送到 GitHub
- [ ] 项目已导入到 Vercel
- [ ] 构建成功完成
- [ ] 数据库迁移已运行
- [ ] `NEXTAUTH_URL` 已更新
- [ ] 功能测试通过

---

**🎉 完成！** 您的应用现在应该可以通过 Vercel URL 访问了。

如有问题，请查看 Vercel 的构建日志或联系支持。

