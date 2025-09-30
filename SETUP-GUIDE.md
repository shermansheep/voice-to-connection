# 環境設置指南

## 問題診斷
您的系統目前沒有安裝 Node.js，這是運行此專案的必要環境。

## 解決方案

### 方法1: 安裝 Node.js (推薦)

1. **下載 Node.js**
   - 前往 https://nodejs.org/
   - 下載 LTS 版本 (推薦 18.x 或更新版本)
   - 執行安裝程式

2. **驗證安裝**
   ```bash
   node --version
   npm --version
   ```

3. **安裝專案依賴**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### 方法2: 使用 Docker (替代方案)

如果無法安裝 Node.js，可以使用 Docker：

1. **安裝 Docker Desktop**
   - 下載：https://www.docker.com/products/docker-desktop

2. **使用 Docker 運行專案**
   ```bash
   # 在專案根目錄執行
   docker run -it --rm -v %cd%:/app -w /app/frontend -p 3000:3000 node:18 bash
   npm install
   npm run dev
   ```

### 方法3: 使用線上開發環境

使用 GitHub Codespaces 或 Gitpod：
- 將專案推送到 GitHub
- 使用 GitHub Codespaces 開啟
- 環境會自動配置

## 快速驗證

安裝完成後，執行以下命令驗證：

```bash
# 檢查版本
node --version  # 應該顯示 v18.x.x 或更新
npm --version   # 應該顯示 9.x.x 或更新

# 進入前端目錄
cd frontend

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

## 常見問題

### Q: npm install 很慢
A: 使用淘寶鏡像：
```bash
npm config set registry https://registry.npmmirror.com
```

### Q: 權限錯誤
A: 以管理員身份運行命令提示字元

### Q: 網路問題
A: 檢查防火牆設置，或使用公司網路時聯絡IT部門

## 下一步

環境設置完成後：
1. 啟動前端開發伺服器
2. 配置 AWS 服務
3. 部署後端 Lambda 函數
4. 測試完整功能