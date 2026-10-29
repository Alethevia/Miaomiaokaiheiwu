'use client';

import { useMemo } from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { Toast, ErrorBoundary, PageTransition } from '@/components/ui';
import { TabBar } from '@/components/layout';

// Auth
import { Onboarding, Login } from '@/components/auth';

// Main Tabs
import { HomePage } from '@/components/home';
import { VideoFeed } from '@/components/discover';
import { LiveList, LiveRoom } from '@/components/live';
import { MessageList, Chat, VoiceCall, VideoCall } from '@/components/message';
import { Profile, Settings, Favorites } from '@/components/profile';

// Other Pages
import { CoachDetail } from '@/components/coach';
import { OrderCreate, Payment, OrderList, OrderDetail, Review } from '@/components/order';
import { Wallet, Recharge, VIP, Transactions } from '@/components/wallet';
import { AIAnalysis, AIReport } from '@/components/ai';
import { Search } from '@/components/search';

// Tab页面列表
const tabPages = ['home', 'discover', 'live', 'messages', 'profile'];

function AppContent() {
  const { currentPage, isLoggedIn, hasSeenOnboarding } = useApp();

  // 页面配置：决定过渡动画类型
  const pageConfig = useMemo(() => {
    // Tab页面使用快速淡入淡出
    if (tabPages.includes(currentPage)) {
      return { animation: 'fade' as const, duration: 150 };
    }
    // 弹窗类页面使用从下往上滑动
    if (['chat', 'voice-call', 'video-call', 'live-room'].includes(currentPage)) {
      return { animation: 'slideUp' as const, duration: 300 };
    }
    // 其他页面使用从右往左滑动
    return { animation: 'slideLeft' as const, duration: 250 };
  }, [currentPage]);


  // 未完成引导
  if (!hasSeenOnboarding) {
    return <Onboarding />;
  }

  // 未登录
  if (!isLoggedIn) {
    return <Login />;
  }

  const showTabBar = tabPages.includes(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      // 主Tab页面
      case 'home':
        return <HomePage />;
      case 'discover':
        return <VideoFeed />;
      case 'live':
        return <LiveList />;
      case 'messages':
        return <MessageList />;
      case 'profile':
        return <Profile />;

      // 教练相关
      case 'coach-detail':
        return <CoachDetail />;

      // 订单相关
      case 'order-create':
        return <OrderCreate />;
      case 'payment':
        return <Payment />;
      case 'orders':
        return <OrderList />;
      case 'order-detail':
        return <OrderDetail />;
      case 'review':
        return <Review />;

      // 钱包相关
      case 'wallet':
        return <Wallet />;
      case 'recharge':
        return <Recharge />;
      case 'vip':
        return <VIP />;
      case 'transactions':
        return <Transactions />;

      // 消息相关
      case 'chat':
        return <Chat />;
      case 'voice-call':
        return <VoiceCall />;
      case 'video-call':
        return <VideoCall />;

      // 直播
      case 'live-room':
        return <LiveRoom />;

      // AI分析
      case 'ai-analysis':
        return <AIAnalysis />;
      case 'ai-report':
        return <AIReport />;

      // 搜索
      case 'search':
        return <Search />;

      // 设置
      case 'settings':
        return <Settings />;

      // 收藏
      case 'favorites':
        return <Favorites />;

      default:
        return <HomePage />;
    }
  };

  return (
    <ErrorBoundary>
      <PageTransition
        pageKey={currentPage}
        animation={pageConfig.animation}
        duration={pageConfig.duration}
      >
        {renderPage()}
      </PageTransition>
      {showTabBar && <TabBar />}
      <Toast />
    </ErrorBoundary>
  );
}

export default function Home() {
  return (
    <AppProvider>
      {process.env.NEXT_PUBLIC_USE_MOCK === "true" && <div role="status" style={{position: "fixed", top: 0, left: 0, right: 0, zIndex: 99999, textAlign: "center", background: "#78350f", color: "white", padding: 6}}>演示模式：人物、订单、余额和分析为模拟内容，不会产生真实交易。</div>}
      <AppContent />
    </AppProvider>
  );
}
