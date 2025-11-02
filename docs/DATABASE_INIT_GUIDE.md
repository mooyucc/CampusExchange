# 🗄️ 数据库初始化指南

## ✅ 部署成功后的下一步

构建成功后，需要初始化数据库表结构。有两种方法：

---

## 方法 1：使用 Supabase SQL Editor（推荐，最简单）⭐

### 步骤：

1. **访问 Supabase 项目**
   - 打开 https://supabase.com/dashboard
   - 登录您的账号
   - 选择您的项目

2. **打开 SQL Editor**
   - 点击左侧菜单的 **SQL Editor**（数据库图标）
   - 点击 **New query**（新建查询）

3. **运行 SQL 脚本**
   - 打开项目中的 `prisma/init-database.sql` 文件
   - 复制全部内容
   - 粘贴到 Supabase SQL Editor
   - 点击右上角的 **Run** 按钮（或按 `Ctrl/Cmd + Enter`）

4. **验证表是否创建成功**
   - 在左侧菜单点击 **Table Editor**
   - 应该能看到三个表：
     - `User`（用户表）
     - `Item`（物品表）
     - `ExchangeRequest`（交换请求表）

---

## 方法 2：使用 Vercel CLI（如果需要）

如果您安装了 Vercel CLI，可以在本地运行迁移：

```bash
# 1. 安装 Vercel CLI（如果还没有）
npm i -g vercel

# 2. 登录 Vercel
vercel login

# 3. 链接到项目（在项目目录运行）
cd "/Users/kevinx/Documents/Ai Project/ExchangePlatform"
vercel link

# 4. 设置环境变量（使用 Vercel 的 DATABASE_URL）
export DATABASE_URL="postgresql://postgres:Sbmooyu123@db.amqaeolouwkpsqndrubk.supabase.co:6543/postgres?pgbouncer=true"

# 5. 运行数据库迁移
npx prisma migrate deploy
```

---

## 方法 3：使用本地环境（备选）

如果您想在本地测试连接：

```bash
# 1. 确保 .env.local 文件存在并包含：
DATABASE_URL="postgresql://postgres:Sbmooyu123@db.amqaeolouwkpsqndrubk.supabase.co:6543/postgres?pgbouncer=true"

# 2. 运行
npm run db:push
```

---

## ✅ 验证数据库初始化

初始化完成后，验证表是否创建成功：

### 在 Supabase 中验证：

1. 进入 **Table Editor**
2. 检查以下表是否存在：
   - ✅ `User`
   - ✅ `Item`
   - ✅ `ExchangeRequest`

### 通过应用验证：

1. 访问您的 Vercel URL（如：`https://campus-exchange.vercel.app`）
2. 尝试注册一个新用户
3. 如果注册成功，说明数据库工作正常！

---

## 🎉 完成后的检查清单

- [ ] 数据库表已创建（3 个表：User, Item, ExchangeRequest）
- [ ] 可以访问 Vercel 部署的网站
- [ ] 可以注册新用户
- [ ] 可以登录
- [ ] 可以发布物品

---

## ⚠️ 如果遇到问题

### 问题 1：SQL 执行失败

**错误：** "relation already exists"
- **解决：** 表可能已经存在，可以忽略，或先删除表再重新创建

**错误：** 权限错误
- **解决：** 确认使用的是 Supabase 项目的正确连接字符串

### 问题 2：应用无法连接数据库

- **检查：** Vercel 环境变量中的 `DATABASE_URL` 是否正确
- **检查：** 是否使用了连接池 URL（端口 6543）
- **检查：** Supabase 项目是否正常运行

### 问题 3：注册用户时出错

- **检查：** 数据库表是否已创建
- **检查：** Vercel 日志中的错误信息
- **检查：** `NEXTAUTH_SECRET` 环境变量是否设置

---

**准备好了吗？** 按照方法 1（Supabase SQL Editor）开始初始化数据库！

