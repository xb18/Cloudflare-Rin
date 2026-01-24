# Rin

<div align="center">

![封面](https://repository-images.githubusercontent.com/803866357/958bc2c1-1703-4127-920c-853291495bdc)

一款轻量级、无服务器的博客平台，基于 Cloudflare Workers 构建。

[![GitHub 许可证](https://img.shields.io/github/license/openRin/Rin?style=for-the-badge)](LICENSE)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=for-the-badge&logo=cloudflare)](https://workers.cloudflare.com)
[![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun)](https://bun.sh)

**[English](./README.md) | 简体中文**

</div>

---

## 介绍

Rin 是一款轻量级、无服务器的博客平台，基于 Cloudflare 边缘生态系统构建。只需一个解析到 Cloudflare 的域名，即可快速部署，无需管理服务器。

### 技术栈

- **前端**: React + TypeScript + Vite
- **后端**: Cloudflare Workers + Elysia
- **数据库**: Cloudflare D1 (SQLite)
- **存储**: Cloudflare R2 (S3 兼容)
- **包管理器**: Bun

---

## 功能特性

- ✍️ **富文本编辑器** - 支持 Markdown 和实时预览
- 🔐 **GitHub OAuth** - 使用 GitHub 安全登录
- 📱 **响应式设计** - 适配所有设备
- 🖼️ **图片上传** - 支持 S3 兼容存储
- 💬 **评论系统** - 内置评论功能
- 🔗 **友链管理** - 博客链接健康监控
- 🏷️ **标签系统** - 内容分类管理
- 📊 **数据统计** - 访问追踪和 RSS 订阅
- 🔔 **Webhooks** - 评论通知

---

## 快速部署

### 1. Fork 并设置

在 GitHub 上 Fork 本仓库，然后克隆：

```bash
git clone https://github.com/YOUR_USERNAME/Rin.git
cd Rin
```

### 2. 配置密钥和变量

进入仓库 **Settings > Secrets and Variables > Actions**：

**Repository Secrets（加密）**:
```
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_API_TOKEN
```

**Variables（明文）**:
```
DB_NAME=rin
WORKER_NAME=rin-server
FRONTEND_URL=https://你的域名.com
S3_BUCKET=你的R2存储桶名称
S3_REGION=auto
S3_ENDPOINT=https://你的账号.r2.cloudflarestorage.com
S3_ACCESS_HOST=https://images.你的域名.com
```

### 3. 触发部署

推送任何更改即可触发 GitHub Actions，或手动从 Actions 标签运行工作流。

详细部署指南请参考[部署文档](docs/DEPLOY.md)。

---

## 本地开发

对于想要本地开发的贡献者，请参考[开发指南](docs/DEPLOY.md#本地开发)。

---

## 文档

- [部署指南](docs/DEPLOY.md)
- [环境变量](docs/ENV.md)
- [RSS 配置](docs/RSS.md)
- [SEO 优化](docs/SEO.md)

完整文档请访问 [docs.openrin.org](https://docs.openrin.org)

---

## 演示

访问 [xeu.life](https://xeu.life) 查看 Rin 的实际效果。

---

## 贡献

欢迎贡献！请阅读[贡献指南](CONTRIBUTING_zh_CN.md)了解更多详情。

---

## 社区

- [Discord](https://discord.gg/JWbSTHvAPN)
- [Telegram](https://t.me/openRin)

---

## Star 历史

[![Star History Chart](https://api.star-history.com/svg?repos=openRin/Rin&type=Date)](https://star-history.com/#openRin/Rin&Date)

---

## 许可证

MIT License © 2024 [Xeu](https://github.com/openRin)

详见 [LICENSE](LICENSE) 文件。
