# 服装销售智能平台 - 前端模块

## 项目概述

服装销售智能平台是一个基于AI驱动的服装行业销售预测和定价策略优化系统。本平台利用Facebook开发的Prophet时间序列预测模型，为服装企业提供精准的销售预测、智能定价策略和库存管理建议，帮助企业提升销售业绩和库存周转率。

前端模块采用现代化的React框架和组件库构建，提供直观的数据可视化和用户友好的交互界面，使企业管理者能够轻松获取和理解销售数据分析结果，做出更明智的经营决策。

## 技术栈

- **框架**: Next.js 15.1.0
- **语言**: TypeScript
- **UI组件库**: 
  - Radix UI (对话框、下拉菜单、标签页等)
  - shadcn/ui (基于Radix UI的组件集合)
- **样式**: Tailwind CSS
- **数据可视化**: Recharts
- **状态管理**: React Hooks
- **表单处理**: React Hook Form + Zod

## 功能模块

### 1. 首页 (Landing Page)
- 产品介绍和功能概述
- 用户引导和导航
- 客户案例展示

### 2. 数据看板 (Dashboard)
- 销售数据概览
- 类别销售分布
- 热销产品排行
- 实时销售数据更新 (模拟SSE技术)

### 3. 销售预测 (Forecast)
- 基于Prophet模型的销售趋势预测
- 季节性分析
- 预测准确性评估
- 可调整的预测周期和置信区间

### 4. 定价策略 (Pricing)
- 价格优化建议
- 价格弹性分析
- 利润率和销量目标设置
- 季节性定价调整

### 5. 库存管理 (Inventory)
- 库存概览
- 周转率分析
- 库存优化建议
- 库存预警系统

## 安装与运行

### 环境要求
- Node.js 18.0.0 或更高版本
- pnpm 8.0.0 或更高版本

### 安装步骤

1. 克隆项目仓库
```bash
git clone https://github.com/yourusername/clothing-sales-platform.git
cd clothing-sales-platform/frontend
```

2. 安装依赖
```bash
pnpm install
```

3. 启动开发服务器
```bash
pnpm dev
```

4. 构建生产版本
```bash
pnpm build
```

5. 运行生产版本
```bash
pnpm start
```

## 开发说明

### 目录结构
```
frontend/
├── app/                 # Next.js App Router 页面
│   ├── dashboard/       # 数据看板页面
│   ├── forecast/        # 销售预测页面
│   ├── inventory/       # 库存管理页面
│   ├── pricing/         # 定价策略页面
│   ├── settings/        # 设置页面
│   ├── layout.tsx       # 应用布局
│   └── page.tsx         # 首页
├── components/          # 可复用组件
│   ├── ui/              # 基础UI组件
│   └── ...              # 业务组件
├── hooks/               # 自定义React Hooks
├── lib/                 # 工具函数和库
├── public/              # 静态资源
└── styles/              # 全局样式
```

### 数据模拟

当前版本使用模拟数据进行展示。在实际部署时，需要将模拟数据替换为后端API调用。主要的模拟数据组件包括：

- `sales-forecast-chart.tsx` - 销售预测图表
- `forecast-accuracy-metrics.tsx` - 预测准确性指标
- `realtime-sales-updates.tsx` - 实时销售更新
- `price-elasticity-chart.tsx` - 价格弹性图表
- `inventory-level-chart.tsx` - 库存水平图表

## 后续开发计划

1. 集成实际后端API，替换模拟数据
2. 添加用户认证和权限管理
3. 实现多语言支持
4. 优化移动端体验
5. 添加更多高级数据分析功能

## 贡献指南

1. Fork 项目仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建Pull Request

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 LICENSE 文件