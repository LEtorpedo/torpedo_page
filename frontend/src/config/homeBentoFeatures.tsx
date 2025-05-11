import React from 'react'; // Add React import for JSX
import type { LucideIcon } from 'lucide-react'; // 或者直接使用 React.ElementType
import type { ReactNode } from 'react';
// 从 lucide-react 导入实际要用的图标
import { 
  UserCircle, 
  Lightbulb, 
  Newspaper, 
  Share2,
  Music2, 
  Smile, // Default mood icon
  Frown,    // Example: Sad mood
  Laugh,    // Example: Joyful mood
  Coffee,   // Example: Busy/Coding mood
  Github    // Example: Thinking/Project mood (can be any relevant icon)
} from 'lucide-react';

// 定义我们配置对象中 Icon 的类型，可以是 LucideIcon 组件，或者其他 React 组件类型
export type IconType = LucideIcon | React.ElementType;

export interface BentoFeatureCardConfig {
  name: string;
  className: string; // 用于控制 col-span 和 row-span
  background?: ReactNode; // ReactNode 允许任何可渲染内容作为背景
  Icon: IconType;
  title?: string; // 卡片内主要标题 (如果 name 字段不足以作为标题)
  description: string | ReactNode; // 描述可以是简单字符串或更复杂的 JSX
  href?: string;
  cta?: string;
}

// --- 示例背景组件 (可以放在 utils 或 components/ui) ---
// 您可以创建更多自定义背景组件或直接在配置中使用 JSX
export const PlaceholderStaticCardBackground = ({ bgColorClass = 'bg-muted/30 dark:bg-muted-dark/30' }: { bgColorClass?: string }) => (
  <div
    className={`pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10 ${bgColorClass}`}
  />
);

export const GradientCardBackground = ({ fromColor = 'from-brand-primary-light/20', toColor = 'to-brand-secondary-light/20' }: { fromColor?: string, toColor?: string }) => (
  <div
    className={`absolute inset-0 bg-gradient-to-br ${fromColor} ${toColor} opacity-50 transition-opacity duration-300 group-hover:opacity-70`}
  />
);
// --- End of示例背景组件 ---

// 心情图标映射表
export const moodIcons: { [key: string]: IconType } = {
  default: Smile, // 默认或未知心情时显示的图标
  happy: Laugh, 
  sad: Frown,
  coding: Coffee,
  thinking: Github, //  您可以根据实际情况选择更合适的图标，比如 Brain, MessageSquareText 等
  // 您可以在这里添加更多的心情和对应的图标
};

// TODO: 从 lucide-react 导入实际要用的图标 (已完成)
// import { UserCircle, Lightbulb, Newspaper, Share2, Clock, Music2, Palette, Compass, Smile } from 'lucide-react';
// 下面暂时用字符串占位，实际使用时 HomePage.tsx 中需要映射或直接在这里用组件 (不再需要占位符)
// const UserCircle = 'UserCircle';
// const Lightbulb = 'Lightbulb';
// const Newspaper = 'Newspaper';
// const Share2 = 'Share2';
// const Clock = 'Clock';
// const Music2 = 'Music2';
// const Palette = 'Palette';
// const Compass = 'Compass'; 
// const Smile = 'Smile';


export const bentoFeaturesData: BentoFeatureCardConfig[] = [
  {
    name: "AboutMeCard", // 给一个唯一的 name，用于 React key
    className: "md:col-span-2 md:row-span-1",
    Icon: UserCircle, // 直接使用导入的组件
    title: "关于我",
    description: "一个热爱探索新技术的开发者，乐于分享与创造。目前专注于构建美观且实用的 Web 应用。",
    href: "/academic",
    cta: "认识我",
    background: <GradientCardBackground />,
  },
  {
    name: "PersonalStatusCard",
    className: "md:col-span-1 md:row-span-1",
    Icon: Smile,
    title: "当前状态",
    description: "努力学习，保持好奇！🚀",
    // background: <PlaceholderStaticCardBackground bgColorClass="bg-blue-500/10" />,
  },
  {
    name: "FeaturedProjectCard",
    className: "md:col-span-1 md:row-span-2",
    Icon: Lightbulb, // 直接使用导入的组件
    title: "项目精选: Torpedo_Page",
    description: "这个站点本身就是一个持续迭代的 React + FastAPI 项目！",
    href: "https://github.com/LEtorpedo/torpedo_page",
    cta: "查看源码",
    background: <PlaceholderStaticCardBackground bgColorClass="bg-brand-accent-light/10 dark:bg-brand-accent-dark/10" />,
    // TODO: 这部分可以考虑使用GitHub API获取项目信息
  },
  {
    name: "LatestPostCard",
    className: "md:col-span-1 md:row-span-2",
    Icon: Newspaper, // 直接使用导入的组件
    title: "最新博文",
    description: "TODO: 获取并显示最新1-2篇博文标题和摘要。", // TODO: 实现动态获取博文
    href: "/blog",
    cta: "前往博客",
    // background: <GradientCardBackground fromColor="from-green-500/10" toColor="to-teal-500/10" />,
  },
  {
    name: "NowPlayingCard",
    className: "md:col-span-1 md:row-span-1",
    Icon: Music2, // 直接使用导入的组件
    title: "爱听的歌",
    description: "TODO: 显示当前正在听的歌曲 (Spotify/Last.fm)。", // TODO: 实现动态获取歌曲
    // background: <PlaceholderStaticCardBackground bgColorClass="bg-purple-500/10" />,
  },
  {
    name: "SocialLinksCard", // New card for contact information
    className: "md:col-span-1 md:row-span-1",
    Icon: Share2,
    title: "联系我",
    description: "如果你认为我很有意思，可以联系我！",
    href: "#", // Or a link to a contact page/modal
    cta: "Links",
    background: <PlaceholderStaticCardBackground />,
  },
  // TechStackCard, ExploreCard, PersonalStatusCard 均已移除或合并
  // 您可以取消注释或添加更多卡片
  // The ExploreCard previously commented here is now active and moved above.
  // Ensure this section is clean or remove any lingering ExploreCard comment if it was separate.
]; 

// TODO: 这些内容后续可能需要从数据库中读取