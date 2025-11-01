# 校园二手交换平台

一个专为上海国际学校学生设计的校园二手物品交换网站。

## 功能特性

- 🔐 **用户认证** - 注册、登录系统
- 📦 **物品管理** - 发布、浏览、搜索物品
- 🔄 **交换功能** - 发起交换请求、接受/拒绝请求
- 🎨 **现代化UI** - 美观的用户界面设计
- 📱 **响应式设计** - 支持各种设备访问

## 技术栈

- **Next.js 14** - React框架，使用App Router
- **TypeScript** - 类型安全
- **Prisma** - ORM数据库管理
- **SQLite** - 轻量级数据库
- **NextAuth.js** - 认证系统
- **Tailwind CSS** - 样式框架
- **React Hook Form + Zod** - 表单验证

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 设置环境变量

复制 `.env.example` 为 `.env` 并填写必要的配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件，设置：
- `DATABASE_URL` - 数据库连接字符串
- `NEXTAUTH_SECRET` - 随机密钥（可运行 `openssl rand -base64 32` 生成）

### 3. 初始化数据库

```bash
npm run db:push
npm run db:generate
```

### 4. 运行开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 项目结构

```
├── app/                    # Next.js App Router页面
│   ├── api/               # API路由
│   ├── auth/              # 认证页面
│   ├── items/             # 物品相关页面
│   └── dashboard/         # 用户中心
├── components/            # React组件
├── lib/                   # 工具函数
├── prisma/               # 数据库schema
└── public/               # 静态资源
```

## 数据库模型

- **User** - 用户信息
- **Item** - 物品信息
- **ExchangeRequest** - 交换请求

## 开发命令

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run db:push` - 推送数据库schema变更
- `npm run db:studio` - 打开Prisma Studio（数据库管理界面）

## GitHub Actions 自动化

本项目配置了 GitHub Actions 工作流，用于自动处理代码上传和构建。

### 工作流说明

1. **CI 工作流** (`.github/workflows/ci.yml`)
   - 当代码推送到 `main`、`master` 或 `develop` 分支时自动运行
   - 在 Pull Request 时也会触发
   - 执行操作：
     - 安装依赖
     - 生成 Prisma Client
     - 代码检查（lint）
     - 构建项目

2. **部署工作流** (`.github/workflows/deploy.yml`)
   - 当代码推送到 `main` 或 `master` 分支时自动运行
   - 也可以手动触发（workflow_dispatch）
   - 执行操作：
     - 安装依赖
     - 生成 Prisma Client
     - 构建生产版本

### 配置 GitHub Secrets

如果需要部署功能，请在 GitHub 仓库设置中添加以下 Secrets：
- `DATABASE_URL` - 生产环境数据库连接字符串
- `NEXTAUTH_SECRET` - NextAuth 密钥
- `NEXTAUTH_URL` - 生产环境 URL

### 查看工作流状态

在 GitHub 仓库的 "Actions" 标签页可以查看所有工作流的运行状态和历史记录。

## 部署

建议使用 Vercel 或其他支持 Next.js 的平台进行部署。

## 许可证

MIT

