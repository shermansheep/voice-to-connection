# Voice-to-Connection 長者社會服務配對平台

## 專案概述

Voice-to-Connection 是一個專為長者設計的社會服務配對平台，透過語音技術簡化操作流程，讓長者能夠輕鬆發出服務請求，並與志工進行配對。

## 技術架構

### 前端
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** - Mobile-first 響應式設計
- **Zustand** - 輕量級狀態管理
- **AWS Amplify** - 認證與API整合

### 後端
- **AWS Lambda** - 無伺服器函數
- **API Gateway** - RESTful API
- **DynamoDB** - NoSQL 數據庫
- **S3** - 語音檔案存儲
- **Cognito** - 用戶認證
- **Transcribe** - 語音轉文字
- **Polly** - 文字轉語音

## 快速開始

### 前端開發

```bash
cd frontend
npm install
npm run dev
```

### 後端部署

```bash
cd backend
npm install
npm run deploy:dev
```

## 主要功能

### 🎤 語音優先交互
- 語音錄製與播放
- 語音轉文字 (AWS Transcribe)
- 文字轉語音 (AWS Polly)
- 多語言支援

### 👥 智能配對系統
- 地理位置配對
- 技能與需求匹配
- 時間可用性檢查
- 配對分數計算

### 📱 Mobile-First 設計
- 響應式介面
- 觸控友善操作
- 大字體支援
- 高對比度模式

### ♿ 無障礙設計
- 螢幕閱讀器支援
- 鍵盤導航
- ARIA 標籤
- 焦點管理

## 項目結構

```
voice-to-connection/
├── frontend/           # React 前端應用
│   ├── src/
│   │   ├── components/ # UI 組件
│   │   ├── pages/      # 頁面組件
│   │   ├── store/      # 狀態管理
│   │   ├── services/   # API 服務
│   │   └── types/      # TypeScript 類型
├── backend/            # AWS Lambda 後端
│   ├── src/
│   │   ├── functions/  # Lambda 函數
│   │   ├── models/     # 數據模型
│   │   └── utils/      # 工具函數
├── infrastructure/     # AWS 基礎設施
└── docs/              # 文檔
```

## 環境配置

### 前端環境變數
複製 `.env.example` 為 `.env` 並填入相應的 AWS 配置：

```bash
cp .env.example .env
```

### AWS 服務配置
1. 創建 Cognito 用戶池
2. 設置 DynamoDB 表
3. 配置 S3 存儲桶
4. 部署 Lambda 函數

## 開發指南

### 代碼規範
- 使用 TypeScript 嚴格模式
- 遵循 ESLint 規則
- 組件採用函數式寫法
- 使用 Tailwind CSS 類名

### 測試
```bash
# 前端測試
cd frontend
npm run test

# 後端測試
cd backend
npm run test
```

### 部署
```bash
# 開發環境
npm run deploy:dev

# 生產環境
npm run deploy:prod
```

## 貢獻指南

1. Fork 專案
2. 創建功能分支
3. 提交變更
4. 發起 Pull Request

## 授權

MIT License

## 聯絡資訊

如有問題或建議，請聯絡開發團隊。