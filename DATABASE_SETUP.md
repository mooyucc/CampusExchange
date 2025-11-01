# 🔧 数据库连接设置指南

## 问题：无法连接到 Supabase 数据库

### 原因分析

Supabase 的 PostgreSQL 连接有两种方式：
1. **直接连接** - 需要配置 IP 白名单（通常用于本地开发）
2. **连接池连接** - 推荐用于 Vercel 部署（使用不同的端口和 URL）

### 解决方案

#### 选项 1：使用连接池 URL（推荐用于生产环境）

在 Supabase 项目中：

1. 进入 **Settings > Database**
2. 找到 **Connection Pooling** 部分
3. 复制 **Connection string** 中的 **URI**（使用端口 **6543** 而不是 5432）
4. 格式类似：`postgresql://postgres:[YOUR-PASSWORD]@db.amqaeolouwkpsqndrubk.supabase.co:6543/postgres?pgbouncer=true`

**更新您的连接字符串：**
```env
DATABASE_URL="postgresql://postgres:Sbmooyu123@db.amqaeolouwkpsqndrubk.supabase.co:6543/postgres?pgbouncer=true"
```

#### 选项 2：配置 IP 白名单（用于直接连接）

1. 进入 Supabase 项目 **Settings > Database**
2. 找到 **Connection string** 部分
3. 在下方找到 **Network Restrictions** 或 **IP Whitelist**
4. 添加您的 IP 地址，或选择 "Allow all IPs"（仅用于开发）

#### 选项 3：检查连接字符串格式

确保连接字符串格式正确：

✅ **正确格式：**
```
postgresql://postgres:PASSWORD@HOST:PORT/DATABASE
```

❌ **错误格式：**
```
postgres://...（某些情况下可能不支持）
file:./dev.db（SQLite 格式）
```

### 测试连接

更新 `.env.local` 文件后，运行：

```bash
# 生成 Prisma Client
npm run db:generate

# 测试连接并推送 schema
npm run db:push
```

### 如果仍然失败

1. **检查 Supabase 项目状态**
   - 确认项目没有暂停
   - 检查项目是否在运行

2. **检查网络连接**
   - 尝试在浏览器中访问 Supabase 项目
   - 检查防火墙设置

3. **使用 Supabase Dashboard**
   - 在 Supabase 项目中使用 SQL Editor 测试连接
   - 确认数据库密码正确

4. **联系 Supabase 支持**
   - 检查 Supabase 服务状态页面
   - 查看是否有服务中断

---

## 临时解决方案：跳过本地测试，直接在 Vercel 上部署

如果本地连接有问题，您可以直接部署到 Vercel：

1. 在 Vercel 项目设置中添加环境变量：
   - `DATABASE_URL`: 使用连接池 URL（端口 6543）
   - `NEXTAUTH_SECRET`: 您生成的密钥
   
2. 部署后，使用 Vercel CLI 或 Supabase SQL Editor 初始化数据库表

3. 使用 Supabase SQL Editor 手动创建表结构（如果 Prisma migrate 失败）

