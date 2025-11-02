# 🎯 接下来要做什么？

您已经完成了：
- ✅ 获得 Supabase PostgreSQL 连接字符串
- ✅ 更新 Prisma schema 为 PostgreSQL

## 下一步操作

### 步骤 1：设置本地环境变量（用于测试）

**重要提示：** Supabase 建议在生产环境使用**连接池**（端口 6543）而不是直接连接（端口 5432）。

在项目根目录创建 `.env.local` 文件（如果还没有）：

```bash
# 在项目根目录运行
touch .env.local
```

编辑 `.env.local`，添加：

**选项 A：使用连接池（推荐，用于 Vercel 部署）：**
```env
DATABASE_URL="postgresql://postgres:Sbmooyu123@db.amqaeolouwkpsqndrubk.supabase.co:6543/postgres?pgbouncer=true"
NEXTAUTH_SECRET="+puVPV8IYSYWMccjC/NUggK2mTRo3KTKHNwYUzyaU6U="
NEXTAUTH_URL="http://localhost:3000"
```

**选项 B：直接连接（需要配置 IP 白名单）：**
```env
DATABASE_URL="postgresql://postgres:Sbmooyu123@db.amqaeolouwkpsqndrubk.supabase.co:5432/postgres"
NEXTAUTH_SECRET="+puVPV8IYSYWMccjC/NUggK2mTRo3KTKHNwYUzyaU6U="
NEXTAUTH_URL="http://localhost:3000"
```

**注意：** `NEXTAUTH_SECRET` 已为您生成，如上所示。

### 步骤 2：测试数据库连接并创建表结构

```bash
# 1. 生成 Prisma Client
npm run db:generate

# 2. 推送 schema 到数据库（创建表结构）
npm run db:push
```

如果成功，您应该看到类似这样的输出：
```
✔ Generated Prisma Client
✔ The database is now in sync with your Prisma schema.
```

### 步骤 3：部署到 Vercel

#### 3.1 访问 Vercel 并导入项目

1. 访问 https://vercel.com
2. 使用 GitHub 账号登录
3. 点击 **Add New...** > **Project**
4. 找到并导入您的 `CampusExchange` 仓库
5. 点击 **Import**

#### 3.2 配置环境变量

在 Vercel 项目设置页面，添加以下环境变量：

| 变量名 | 值 |
|--------|-----|
| `DATABASE_URL` | `postgresql://postgres:Sbmooyu123@db.amqaeolouwkpsqndrubk.supabase.co:5432/postgres` |
| `NEXTAUTH_SECRET` | （使用刚才生成的密钥，与 `.env.local` 中的相同） |
| `NEXTAUTH_URL` | （暂时留空，部署后会自动设置） |

**设置步骤：**
1. 在项目设置页面，找到 **Environment Variables** 部分
2. 点击 **Add** 按钮
3. 输入变量名和值
4. 在 **Environment** 选项中，选择 **Production**, **Preview**, **Development**（全选）
5. 重复添加其他变量

#### 3.3 部署

1. 确保所有环境变量都已添加
2. 点击 **Deploy** 按钮
3. 等待构建完成（约 2-3 分钟）

### 步骤 4：初始化生产数据库

部署完成后，需要运行数据库迁移来创建表结构：

#### 方法 1：使用 Vercel CLI（推荐）

```bash
# 安装 Vercel CLI（如果还没有）
npm i -g vercel

# 登录 Vercel
vercel login

# 链接到您的项目（在项目目录运行）
vercel link

# 运行数据库迁移
npx prisma migrate deploy
```

#### 方法 2：在本地使用 Vercel 的环境变量

```bash
# 1. 从 Vercel 项目设置中复制 DATABASE_URL
# 2. 在本地设置环境变量
export DATABASE_URL="postgresql://postgres:Sbmooyu123@db.amqaeolouwkpsqndrubk.supabase.co:5432/postgres"

# 3. 运行迁移
npx prisma migrate deploy
```

### 步骤 5：更新 NEXTAUTH_URL

部署成功后：

1. 复制您的 Vercel URL（格式：`https://your-app-name.vercel.app`）
2. 在 Vercel 项目设置 > Environment Variables
3. 添加或更新 `NEXTAUTH_URL` 为完整的 URL（如：`https://your-app-name.vercel.app`）
4. 重新部署（或等待自动重新部署）

### 步骤 6：验证部署

1. 访问您的 Vercel URL
2. 测试注册功能
3. 测试登录功能
4. 测试发布物品功能

## 🎉 完成！

如果一切正常，您的应用现在应该可以正常工作了！

---

## ⚠️ 常见问题

### 问题：`npm run db:push` 失败

**解决方案：**
- 检查连接字符串是否正确
- 确认 Supabase 项目正在运行
- 检查网络连接

### 问题：Vercel 构建失败

**解决方案：**
- 检查 Vercel 日志中的错误信息
- 确认所有环境变量都已正确设置
- 确认 `package.json` 中的构建脚本正确

### 问题：数据库迁移失败

**解决方案：**
- 确认 `DATABASE_URL` 环境变量已设置
- 尝试使用 `prisma db push` 代替 `prisma migrate deploy`
- 检查 Supabase 数据库是否允许连接

---

需要帮助？请查看 `VERCEL_DEPLOYMENT.md` 获取详细说明。

