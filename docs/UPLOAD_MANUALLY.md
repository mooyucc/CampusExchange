# 手动上传文件指南（如果 git push 失败）

如果无法使用 `git push`，可以通过 GitHub 网页界面手动上传关键文件。

## 需要上传的文件

### 1. 修改的文件

**`package.json`**
- 位置：项目根目录
- 修改内容：添加了 `postinstall` 脚本和更新了 `build` 脚本

**`prisma/schema.prisma`**
- 位置：`prisma/` 目录
- 修改内容：将 `provider` 从 `"sqlite"` 改为 `"postgresql"`

### 2. 新增的文件

**`vercel.json`**
- 位置：项目根目录
- 内容：Vercel 部署配置

**`.vercelignore`**
- 位置：项目根目录
- 内容：排除不需要部署的文件

### 3. 文档文件（可选）

以下文档文件可以稍后添加，不影响部署：
- `VERCEL_DEPLOYMENT.md`
- `DEPLOYMENT_QUICK_START.md`
- `NEXT_STEPS.md`
- `DATABASE_SETUP.md`
- `GITHUB_PAGES_DEPLOYMENT.md`

## 手动上传步骤

1. 访问您的 GitHub 仓库：https://github.com/mooyucc/CampusExchange
2. 点击需要更新的文件（如 `package.json`）
3. 点击右上角的 **✏️ Edit** 按钮
4. 粘贴新内容
5. 点击 **Commit changes**

## 或者使用 GitHub Desktop

如果您安装了 GitHub Desktop：
1. 打开应用
2. 选择您的仓库
3. 会看到所有待提交的更改
4. 点击 **Push origin** 推送

## 注意

⚠️ **不要上传以下文件：**
- `.env` 或 `.env.local`（包含敏感信息）
- `node_modules/`
- `.next/`
- `prisma/dev.db`

这些文件已在 `.gitignore` 中，但手动上传时请注意。

