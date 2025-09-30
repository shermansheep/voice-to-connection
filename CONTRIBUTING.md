# 協作開發指南

## 開始開發

1. **Clone 專案**：
```bash
git clone https://github.com/shermansheep/voice-to-connection.git
cd voice-to-connection
```

2. **安裝依賴**：
```bash
cd frontend
npm install
```

3. **啟動開發伺服器**：
```bash
npm run dev
```

## 開發流程

### 1. 創建功能分支
```bash
git checkout -b feature/功能名稱
# 例如：git checkout -b feature/user-profile
```

### 2. 開發並提交
```bash
git add .
git commit -m "feat: 添加用戶個人資料頁面"
```

### 3. 推送分支
```bash
git push origin feature/功能名稱
```

### 4. 創建 Pull Request
- 前往 GitHub 倉庫
- 點擊 "Compare & pull request"
- 填寫 PR 描述
- 請求代碼審查

## 提交訊息規範

使用以下格式：
- `feat:` 新功能
- `fix:` 修復錯誤
- `docs:` 文檔更新
- `style:` 代碼格式調整
- `refactor:` 代碼重構
- `test:` 測試相關

例如：
```
feat: 添加語音錄製功能
fix: 修復手機響應式問題
docs: 更新 README 文檔
```

## 分支策略

- `main`：主分支，穩定版本
- `develop`：開發分支
- `feature/*`：功能分支
- `hotfix/*`：緊急修復分支

## 代碼審查

- 所有代碼必須通過 Pull Request
- 至少需要一人審查通過
- 確保代碼符合專案風格
- 測試功能是否正常運作

## 專案結構

```
voice-to-connection/
├── frontend/           # React 前端
│   ├── src/
│   │   ├── components/ # 組件
│   │   ├── pages/      # 頁面
│   │   ├── store/      # 狀態管理
│   │   └── services/   # API 服務
├── backend/            # Serverless 後端
└── infrastructure/     # AWS 基礎設施
```

## 聯絡方式

如有問題，請：
1. 創建 GitHub Issue
2. 在 Pull Request 中討論
3. 聯絡專案負責人