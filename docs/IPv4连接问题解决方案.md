# 🌐 IPv4 连接问题解决方案

## 发现的关键问题

### 问题 1：密码占位符
连接字符串中显示 `[YOUR_PASSWORD]`，需要替换为实际密码。

### 问题 2：IPv4 不兼容 ⚠️
Supabase 显示 "Not IPv4 compatible"，这是**关键问题**！

**原因：**
- Direct connection（直接连接）只支持 IPv6
- Vercel 可能使用 IPv4 网络
- 导致无法连接数据库

## 解决方案：使用 Session Pooler

### 步骤 1：切换到 Session Pooler

在 Supabase 连接字符串页面：

1. **Method 下拉菜单**
   - 当前：`Direct connection`（不支持 IPv4）
   - 改为：`Session Pooler` 或 `Transaction Pooler`（支持 IPv4）

2. **选择后，连接字符串会改变**
   - 主机名可能会变为 `pooler.supabase.com` 或类似
   - 端口通常是 `6543`

### 步骤 2：获取新的连接字符串

选择 Session Pooler 后：

1. **复制新的连接字符串**
   - 格式可能类似：`postgresql://postgres.[ref]:[password]@pooler.supabase.com:6543/postgres`

2. **替换密码**
   - 将 `[YOUR_PASSWORD]` 替换为 `SbMooyu123`

### 步骤 3：在 Vercel 中更新

1. Settings → Environment Variables
2. 更新 `DATABASE_URL`
3. 使用 Session Pooler 的连接字符串
4. 保存并重新部署

---

## 预期的连接字符串格式

使用 Session Pooler 后，可能得到：

### 格式 A：
```
postgresql://postgres.amqaeolouwkpsqndrubk:SbMooyu123@aws-0-[region].pooler.supabase.com:6543/postgres
```

### 格式 B：
```
postgresql://postgres:SbMooyu123@db.amqaeolouwkpsqndrubk.supabase.co:6543/postgres?pgbouncer=true
```

---

## 如果找不到 Session Pooler 选项

可以尝试：
1. 点击 "Pooler settings" 按钮
2. 启用 Connection Pooling
3. 使用 Pooler 的连接字符串

---

## 验证步骤

1. ✅ 使用 Session Pooler（不是 Direct connection）
2. ✅ 替换 `[YOUR_PASSWORD]` 为 `SbMooyu123`
3. ✅ 在 Vercel 中更新 `DATABASE_URL`
4. ✅ 保存并重新部署
5. ✅ 检查是否连接成功

---

**关键点：必须使用 Session Pooler，因为 Direct connection 不支持 IPv4！**

