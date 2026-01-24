#!/bin/bash
set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Rin 开发环境启动器${NC}"
echo -e "${BLUE}=====================${NC}\n"

# 检查 Bun
if ! command -v bun &> /dev/null; then
    echo -e "${RED}❌ Bun 未安装${NC}"
    echo "   请先安装 Bun: https://bun.sh/docs/installation"
    exit 1
fi

BUN_VERSION=$(bun --version)
echo -e "${GREEN}✓ Bun 版本: ${BUN_VERSION}${NC}"

# 检查配置
if [ ! -f ".env" ]; then
    echo -e "\n${YELLOW}⚠️  未找到 .env 文件${NC}"
    echo "   正在从模板创建..."

    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "\n${GREEN}✅ 已创建 .env 文件${NC}"
        echo -e "${YELLOW}📝 请编辑 .env 文件配置必要的环境变量:${NC}"
        echo "   - RIN_GITHUB_CLIENT_ID"
        echo "   - RIN_GITHUB_CLIENT_SECRET"
        echo "   - JWT_SECRET"
        echo ""
        exit 1
    else
        echo -e "${RED}❌ 未找到 .env.example 模板文件${NC}"
        exit 1
    fi
fi

# 检查必要配置
check_required_env() {
    local key=$1
    local value=$(grep "^${key}=" .env 2>/dev/null | cut -d'=' -f2-)
    if [ -z "$value" ]; then
        echo -e "${RED}❌ 缺少必要配置: ${key}${NC}"
        return 1
    fi
    return 0
}

echo -e "\n${GREEN}✓ 检查配置...${NC}"
if ! check_required_env "RIN_GITHUB_CLIENT_ID"; then
    echo -e "${YELLOW}   请在 .env 中配置 GitHub OAuth${NC}"
fi
if ! check_required_env "RIN_GITHUB_CLIENT_SECRET"; then
    echo -e "${YELLOW}   请在 .env 中配置 GitHub OAuth Secret${NC}"
fi
if ! check_required_env "JWT_SECRET"; then
    echo -e "${YELLOW}   请在 .env 中配置 JWT_SECRET${NC}"
fi

# 同步配置
echo -e "\n${GREEN}📋 同步配置...${NC}"
bun run config:sync

# 确保 data 目录存在
if [ ! -d "data" ]; then
    mkdir -p data
    echo -e "${GREEN}✓ 创建 data 目录${NC}"
fi

# 安装依赖
echo -e "\n${GREEN}📦 检查依赖...${NC}"
bun install

# 数据库迁移
echo -e "\n${GREEN}🗄️  检查数据库迁移...${NC}"
if [ -f "scripts/dev-migrator.ts" ]; then
    bun run db:migrate 2>/dev/null || echo -e "${YELLOW}   迁移检查完成（或跳过）${NC}"
fi

echo -e "\n${GREEN}🌐 启动服务...${NC}"
echo -e "   前端: http://localhost:5173"
echo -e "   后端: http://localhost:11498"
echo ""

# 启动前端开发服务器
echo -e "${GREEN}→ 启动前端开发服务器${NC}"
bun run dev:client &
CLIENT_PID=$!

# 启动后端开发服务器
echo -e "${GREEN}→ 启动后端开发服务器${NC}"
bun run dev:server &
SERVER_PID=$!

echo -e "\n${GREEN}✅ 开发环境已启动！${NC}"
echo -e "   按 ${RED}Ctrl+C${NC} 停止所有服务\n"

# 等待用户中断
cleanup() {
    echo -e "\n${YELLOW}🛑 正在停止服务...${NC}"
    kill $CLIENT_PID 2>/dev/null || true
    kill $SERVER_PID 2>/dev/null || true
    echo -e "${GREEN}✅ 服务已停止${NC}"
}

trap cleanup EXIT
wait
