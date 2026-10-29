# 运行与真实性审查 — 2026-10-29

## 恢复前后端构建，区分演示数据和真实服务

修复npm锁文件；Next.js 14更新至14.2.35；开启TypeScript构建错误检查。修正React Hook顺序、Prisma关系字段、推荐金额字段及JWT有效期类型。真实API失败不再悄悄显示mock成功；演示模式显示横幅。静态导出加入本地预览服务器。删除缺JAR的假Gradle wrapper，改用明确的Gradle 8.6入口。

## 本次执行证据

Next.js静态导出构建通过（显式演示环境）；Prisma客户端生成和后端TypeScript编译通过。

```text
npm ci
NEXT_PUBLIC_USE_MOCK=true npm run build
cd server
npm ci
npx prisma generate
npm run build
```

Python检查使用Linux/Python 3.12。测试结果是本次本地执行记录，不代表GitHub Actions已通过，也不是独立认证。

## 仍未验证的范围

尚未验证PostgreSQL/Redis、登录支付完整链路、Android APK编译或设备安装。依赖升级不代表全仓库无安全问题。

删除仅针对已确认失效、重复说明或可再生成产物。源码、必要资产和不同版本保留；更改可从Git提交历史恢复。
