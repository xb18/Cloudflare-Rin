#!/usr/bin/env bun
/**
 * 配置同步脚本
 * 将根目录的 .env 配置同步到各个子项目
 */

import { readFileSync, writeFileSync, existsSync } from "fs";

const ROOT_ENV = ".env";
const CLIENT_ENV = "client/.env";
const SERVER_ENV = "server/.env";
const WRANGLER_VARS = "wrangler.vars";

interface EnvConfig {
    [key: string]: string;
}

function loadEnv(path: string): EnvConfig {
    const env: EnvConfig = {};

    if (!existsSync(path)) {
        console.warn(`⚠️  配置文件不存在: ${path}`);
        return env;
    }

    try {
        const content = readFileSync(path, "utf-8");
        for (const line of content.split("\n")) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith("#")) continue;

            const equalIndex = trimmed.indexOf("=");
            if (equalIndex === -1) continue;

            const key = trimmed.slice(0, equalIndex).trim();
            const value = trimmed.slice(equalIndex + 1).trim();

            if (key) {
                env[key] = value;
            }
        }
    } catch (error) {
        console.warn(`⚠️  读取配置文件失败: ${path}`);
    }

    return env;
}

function saveEnv(path: string, env: EnvConfig): void {
    const lines = Object.entries(env)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => `${k}=${v}`);

    writeFileSync(path, lines.join("\n") + "\n");
}

function syncConfig() {
    console.log("📋 正在同步配置...\n");

    // 加载主配置
    const rootEnv = loadEnv(ROOT_ENV);

    if (Object.keys(rootEnv).length === 0) {
        console.error(`❌ 未找到主配置文件 ${ROOT_ENV}`);
        console.log("   请复制 .env.example 为 .env 并填写配置");
        process.exit(1);
    }

    // 检查必要配置
    const requiredKeys = [
        "RIN_GITHUB_CLIENT_ID",
        "RIN_GITHUB_CLIENT_SECRET",
        "JWT_SECRET",
    ];

    const missingKeys = requiredKeys.filter((key) => !rootEnv[key]);

    if (missingKeys.length > 0) {
        console.warn(`⚠️  缺少以下配置项:`);
        missingKeys.forEach((key) => console.warn(`   - ${key}`));
        console.warn("   部分功能可能无法正常工作\n");
    }

    // 同步到客户端
    console.log("→ 同步到 client/.env");
    const clientEnv: EnvConfig = {
        API_URL: rootEnv.VITE_API_URL || "http://localhost:11498",
        AVATAR: rootEnv.VITE_AVATAR || "",
        NAME: rootEnv.VITE_NAME || "",
        DESCRIPTION: rootEnv.VITE_DESCRIPTION || "",
        PAGE_SIZE: rootEnv.VITE_PAGE_SIZE || "5",
    };
    saveEnv(CLIENT_ENV, clientEnv);
    console.log("   ✅ 客户端配置已更新\n");

    // 同步到服务端
    console.log("→ 同步到 server/.env");
    const serverEnv: EnvConfig = {
        ...rootEnv,
        DB_PATH: rootEnv.DATABASE_PATH || "./data/dev.db",
        FRONTEND_URL: rootEnv.FRONTEND_URL || "http://localhost:5173",
    };
    // 移除前端专用配置
    delete serverEnv.VITE_API_URL;
    delete serverEnv.VITE_NAME;
    delete serverEnv.VITE_AVATAR;
    delete serverEnv.VITE_DESCRIPTION;
    delete serverEnv.VITE_PAGE_SIZE;
    delete serverEnv.DATABASE_PATH;
    saveEnv(SERVER_ENV, serverEnv);
    console.log("   ✅ 服务端配置已更新\n");

    // 生成 wrangler.vars（非敏感配置）
    console.log("→ 生成 wrangler.vars");
    const wranglerVars: EnvConfig = {
        FRONTEND_URL: rootEnv.FRONTEND_URL || "http://localhost:5173",
        S3_BUCKET: rootEnv.S3_BUCKET || "",
        S3_REGION: rootEnv.S3_REGION || "auto",
        S3_ENDPOINT: rootEnv.S3_ENDPOINT || "",
        S3_ACCESS_HOST: rootEnv.S3_ACCESS_HOST || "",
        S3_FOLDER: "images/",
        S3_CACHE_FOLDER: "cache/",
    };
    saveEnv(WRANGLER_VARS, wranglerVars);
    console.log("   ✅ Wrangler 配置已更新\n");

    console.log("✅ 配置同步完成！");
}

// 运行同步
syncConfig();
