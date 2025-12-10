# 在本地构建带任务栏歌词的 Windows 客户端

下面的步骤帮助你在 Windows 11 上打包当前仓库的客户端，包含最新的任务栏歌词提示功能。

## 环境要求

- Windows 11（版本号 22000 及以上）以便任务栏歌词正常显示。
- Node.js 20+ 与 Git。
- 推荐使用 [pnpm](https://pnpm.io/)（仓库使用 `pnpm-lock.yaml`）。
- 安装 Visual Studio 2022 的 **Desktop development with C++** 工作负载，确保 `node-gyp` 能够编译 `node-taglib-sharp` 等原生依赖。

## 准备配置

1. 克隆仓库并进入根目录。
2. 复制 `.env.example` 为 `.env`，把 `VITE_API_URL` 改成可访问的网易云 API 地址：

   ```bash
   copy .env.example .env
   # 编辑 .env 填入接口地址
   ```

## 安装依赖

在仓库根目录运行：

```bash
pnpm install
```

如果你必须使用 npm，也可以执行 `npm install --legacy-peer-deps`，但推荐使用 pnpm 以保持与锁文件一致。

## 构建客户端安装包

1. 运行打包命令：

   ```bash
   pnpm run build:win
   ```

   该命令会先执行类型检查，再使用 `electron-builder` 生成安装版和便携版。

2. 构建成功后，在 `dist/` 下可以找到：
   - `SPlayer-<version>-<arch>-setup.exe`：安装版
   - `SPlayer-<version>-<arch>-portable.exe`：便携版

   双击安装版或直接运行便携版即可体验带有任务栏歌词的新客户端。

## 开发模式快速验证

如果只想快速验证任务栏歌词是否工作，可在准备好 `.env` 后运行：

```bash
pnpm dev
```

这会启动 Electron 开发环境，无需打包即可观察任务栏缩略图的歌词提示。
