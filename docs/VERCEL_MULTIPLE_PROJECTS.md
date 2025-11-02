# 🔧 处理多个 Vercel 项目

## 为什么会有两个 campus-exchange 项目？

您看到有两个项目：
1. **campus-exchange-l9xd** → `campus-exchange-l9xd.vercel.app`
2. **campus-exchange** → `campus-exchange-theta.vercel.app`

两个项目都连接到同一个 GitHub 仓库 `mooyucc/CampusExchange`。

## 原因

可能是在导入项目时，Vercel 创建了多个实例，或者您在不同时间导入了两次。

## 建议操作

### 方案 1：保留一个项目（推荐）⭐

**保留：** `campus-exchange`（URL 更简洁）

**删除另一个：**
1. 点击进入 `campus-exchange-l9xd` 项目
2. 进入 **Settings**（设置）
3. 滚动到底部，找到 **Danger Zone**（危险区域）
4. 点击 **Delete Project**（删除项目）
5. 确认删除

**注意：** 删除前，确保要保留的项目（campus-exchange）所有功能正常！

### 方案 2：保留两个项目（高级用法）

如果您想保留两个：
- **campus-exchange**：用作生产环境
- **campus-exchange-l9xd**：用作测试/预览环境

**但需要：**
- 确保两个项目的环境变量都正确配置
- 两个项目会部署相同的代码（因为它们连接同一个仓库）

## 推荐操作步骤

1. **先测试两个项目是否都工作正常**
   - 访问两个 URL，确保都能正常打开

2. **选择一个作为主项目**
   - 推荐保留：`campus-exchange`（名称更简洁）

3. **删除多余的项目**
   - 进入 `campus-exchange-l9xd` → Settings → Danger Zone → Delete

4. **设置自定义域名（可选）**
   - 在主项目中设置您的域名

## 当前状态

两个项目都会：
- ✅ 自动部署同一个 GitHub 仓库的代码
- ✅ 使用相同的环境变量（如果已配置）
- ⚠️ 占用两个项目的配额（如果是免费计划）

**建议：** 删除 `campus-exchange-l9xd`，只保留 `campus-exchange`。

