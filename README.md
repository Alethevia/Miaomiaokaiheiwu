# 喵喵电竞 — 应用原型

Next.js 前端、Express/Prisma 后端和 Android WebView 壳。当前包含界面演示及外部服务接入代码；不宣称已经运营真实教练平台，或完成支付、短信、RTC、AI战绩分析的端到端验证。

## 前端

```bash
npm ci
npm run dev
npm run build
```

只有显式设置 `NEXT_PUBLIC_USE_MOCK=true` 才使用演示数据；真实后端失败会返回错误，不再自动伪装成模拟成功。演示构建会显示标识。静态构建输出到 `out/`，可运行 `npm run preview` 查看。

## 后端

```bash
cd server
npm ci
npm run db:generate
npm run build
```

实际启动还需要 `.env.example` 中的数据库与服务配置。数据库初始化、短信、收付款、实名验证、存储及音视频依赖外部服务，尚未在此次检查中完成联调。

## Android

需要 JDK 17、Android SDK 和 Gradle 8.6。仓库没有完整 Gradle Wrapper JAR，所以使用安装好的 Gradle：

```bash
npm run build:android
cd android
gradle assembleDebug
```

GitHub Actions 也使用 Gradle 8.6。APK 构建及真机行为未在本地验证。包名以 `android/app/build.gradle` 为准。此次修复及验证见 [AUDIT.md](AUDIT.md)。

Android Debug APK compilation also passed in [GitHub Actions run 40862219692](https://github.com/Alethevia/Miaomiaokaiheiwu/actions/runs/40862219692). Device installation and real service/payment flows remain unverified.
