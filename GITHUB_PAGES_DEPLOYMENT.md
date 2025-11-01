# GitHub Pages 部署说明

## ⚠️ 重要提示

**当前项目的 GitHub Pages 设置存在兼容性问题。**

从截图中看到您的 GitHub Pages 设置：
- ✅ Source: Deploy from a branch
- ✅ Branch: main
- ✅ Root: / (root)

**这个设置本身是正确的**，但是**无法适用于当前的 Next.js 应用**。

## 问题原因

GitHub Pages 只能托管**静态网站**（HTML/CSS/JavaScript），不支持：

1. ❌ **服务器端渲染（SSR）** - 您的应用使用了 Server Components
2. ❌ **API 路由** - `/api/auth`, `/api/items`, `/api/exchange` 等无法运行
3. ❌ **数据库连接** - Prisma 和 SQLite 需要服务器环境
4. ❌ **NextAuth 服务器端认证** - 需要服务器端会话管理

## 解决方案

### 方案 1：使用 Vercel（推荐）⭐

Vercel 是 Next.js 的官方部署平台，完全支持您的应用：

**部署步骤：**
1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 导入您的仓库
4. 添加环境变量：
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`（自动设置）
5. 点击部署

**优点：**
- ✅ 免费额度充足
- ✅ 自动 HTTPS
- ✅ 自动 CI/CD
- ✅ 完全支持 Next.js 所有功能
- ✅ 全球 CDN 加速

### 方案 2：使用 Netlify

类似 Vercel，也支持 Next.js：

1. 访问 [netlify.com](https://netlify.com)
2. 连接 GitHub 仓库
3. 构建命令：`npm run build`
4. 发布目录：`.next`
5. 添加环境变量

### 方案 3：使用 Render 或 Railway

这些平台支持全栈应用：

- [Render.com](https://render.com) - 免费 PostgreSQL，支持 Node.js
- [Railway.app](https://railway.app) - 现代化部署平台

### 方案 4：改造为纯静态应用（不推荐）

如果要使用 GitHub Pages，需要：

1. ❌ 移除所有 Server Components
2. ❌ 移除所有 API 路由
3. ❌ 移除数据库，改用静态 JSON 或外部 API
4. ❌ 使用客户端认证方案
5. ✅ 配置静态导出：`output: 'export'` 在 `next.config.js`
6. ✅ 配置 basePath（如果需要子路径）

**这个方案需要大量代码重构，不推荐。**

## 推荐行动

**立即行动：使用 Vercel 部署**

1. 访问 https://vercel.com
2. 使用 GitHub 登录
3. 导入 `CampusExchange` 仓库
4. 配置环境变量
5. 一键部署

部署时间约 2-3 分钟，比改造代码快得多。

## 如果坚持使用 GitHub Pages

如果确实需要使用 GitHub Pages，您需要：

1. 创建全新的纯静态版本
2. 使用外部 API 服务（如 Firebase、Supabase）
3. 完全重写为客户端应用

这需要数周的开发工作。

---

**总结：GitHub Pages 设置是正确的，但不适用于当前的 Next.js 全栈应用。建议使用 Vercel 等支持 Next.js 的平台。**

