# ZBS 项目

## 项目简介
ZBS是一个综合分析平台，包含生信平台、代谢平台、蛋白平台等多个功能模块，提供丰富的分析工具和资源。

## 布置方法

### 1. 环境准备
确保您的系统已安装以下软件：
- Node.js (版本 16.x 或更高)
- npm 或 yarn

### 2. 克隆项目
```bash
git clone [项目仓库地址]
cd AI
```

### 3. 安装依赖
使用npm或yarn安装项目依赖：
```bash
# 使用npm
npm install

# 或使用yarn
yarn install
```

### 4. 配置项目
1. 复制环境变量示例文件：
```bash
cp src/.env.example src/.env
```

2. 根据实际情况修改 `src/.env` 文件中的配置项

### 5. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

开发服务器启动后，可以在浏览器中访问 `http://localhost:3000` 查看项目

### 6. 构建生产版本
```bash
npm run build
# 或
yarn build
```

构建后的文件将生成在 `dist` 目录中，可以部署到任何静态文件服务器

## 项目结构
- `src/components/` - 包含所有组件
- `src/pages/` - 页面组件
- `src/layouts/` - 布局组件
- `src/hooks/` - 自定义钩子
- `src/lib/` - 工具库
- `src/configs/` - 配置文件

## 功能模块
- 生信平台 - 基因组学分析工具
- 代谢平台 - 代谢组学分析与代谢物鉴定平台
- 蛋白平台 - 蛋白质组学与蛋白质结构分析平台
- 个人数据中心 - 个人数据管理
- 综合资源 - 共享资源库
- 综合报表 - 数据分析报表

## 技术栈
- React
- TypeScript
- Tailwind CSS
- Vite