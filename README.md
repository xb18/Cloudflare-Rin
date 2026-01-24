# Rin

<div align="center">

![Cover](https://repository-images.githubusercontent.com/803866357/958bc2c1-1703-4127-920c-853291495bdc)

A minimal, serverless blog platform built with Cloudflare Workers.

[![GitHub License](https://img.shields.io/github/license/openRin/Rin?style=for-the-badge)](LICENSE)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=for-the-badge&logo=cloudflare)](https://workers.cloudflare.com)
[![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun)](https://bun.sh)

**[English](./README.md) | [简体中文](./README_zh_CN.md)**

</div>

---

## About

Rin is a lightweight, serverless blog platform powered by Cloudflare's edge ecosystem. Deploy instantly with zero configuration required beyond a domain name pointing to Cloudflare.

### Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Cloudflare Workers + Elysia
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 (S3-compatible)
- **Package Manager**: Bun

---

## Features

- ✍️ **Rich Text Editor** - Markdown support with live preview
- 🔐 **GitHub OAuth** - Secure authentication with GitHub
- 📱 **Responsive Design** - Optimized for all devices
- 🖼️ **Image Upload** - S3-compatible storage support
- 💬 **Comments** - Built-in commenting system
- 🔗 **Friends Links** - Blogroll with health monitoring
- 🏷️ **Tags & Hashtags** - Organize your content
- 📊 **Analytics** - Visit tracking and RSS feeds
- 🔔 **Webhooks** - Comment notifications

---

## Quick Deploy

### 1. Fork & Setup

Fork this repository on GitHub, then clone it:

```bash
git clone https://github.com/YOUR_USERNAME/Rin.git
cd Rin
```

### 2. Configure Secrets & Variables

Go to your repository **Settings > Secrets and Variables > Actions**:

**Repository Secrets (encrypted)**:
```
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_API_TOKEN
```

**Variables (plain text)**:
```
DB_NAME=rin
WORKER_NAME=rin-server
FRONTEND_URL=https://your-domain.com
S3_BUCKET=your-r2-bucket-name
S3_REGION=auto
S3_ENDPOINT=https://your-account.r2.cloudflarestorage.com
S3_ACCESS_HOST=https://images.your-domain.com
```

### 3. Trigger Deployment

Push any change to trigger GitHub Actions, or manually run the workflow from the Actions tab.

See [Deployment Guide](docs/DEPLOY.md) for detailed instructions.

---

## Local Development

For contributors who want to develop locally, see [Development Guide](docs/DEPLOY.md#local-development).

---

## Documentation

- [Deployment Guide](docs/DEPLOY.md)
- [Environment Variables](docs/ENV.md)
- [RSS Feed Configuration](docs/RSS.md)
- [SEO Optimization](docs/SEO.md)

Full documentation available at [docs.openrin.org](https://docs.openrin.org)

---

## Demo

Visit [xeu.life](https://xeu.life) to see Rin in action.

---

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

---

## Community

- [Discord](https://discord.gg/JWbSTHvAPN)
- [Telegram](https://t.me/openRin)

---

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=openRin/Rin&type=Date)](https://star-history.com/#openRin/Rin&Date)

---

## License

MIT License © 2024 [Xeu](https://github.com/openRin)

See [LICENSE](LICENSE) for details.
