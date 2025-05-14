import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import {
  UserCircle,
  Lightbulb,
  Newspaper,
  Share2,
  Music2,
  Smile, 
  Frown, 
  Laugh, 
  Coffee, 
  Github,
  BookOpen,
} from 'lucide-react';
import type { PointerProps } from '@/components/magicui/pointer';

export type IconType = LucideIcon | React.ElementType;

type ButtonVariant = string; 

export interface BentoFeatureCardConfig {
  name: string;
  className: string;
  background?: ReactNode;
  Icon: IconType;
  title?: string;
  description: string | ReactNode;
  href?: string;
  cta?: string;
  modalDetails?: {
    title: string;
    description?: string;
    choices: Array<{
      id: string;
      text: string;
      href: string;
      variant?: ButtonVariant;
      Icon: IconType;
      iconSize?: number | string;
      pointerConfig?: Partial<PointerProps> & {
        customPointerVisual?: React.ReactNode;
      };
      target?: string;
      rel?: string;
    }>;
  };
}

export const moodIcons: { [key: string]: IconType } = {
  default: Smile,
  happy: Laugh,
  sad: Frown,
  coding: Coffee,
  thinking: Github,
};

export const bentoFeaturesData: BentoFeatureCardConfig[] = [
  {
    name: "AboutMeCard",
    className: "md:col-span-2 md:row-span-1",
    Icon: UserCircle,
    title: "关于我",
    description: "一个热爱探索新技术的开发者，乐于分享与创造。目前专注于构建美观且实用的 Web 应用。",
    cta: "了解更多",
    modalDetails: {
      title: "你想进一步了解我的哪方面？",
      choices: [
        {
          id: "personal-choice",
          text: "个人生活与兴趣",
          href: "/about",
          Icon: UserCircle,
          iconSize: 56,
          variant: "outline",
          pointerConfig: {
            customPointerVisual: <div style={{ fontSize: '2rem' }}>😊</div>,
          },
        },
        {
          id: "academic-choice",
          text: "学术与专业背景",
          href: "/academic",
          Icon: BookOpen,
          iconSize: 56,
          variant: "outline",
          pointerConfig: {
            customPointerVisual: <div style={{ fontSize: '2rem' }}>🎓</div>,
          },
        },
      ],
    },
    // background: <GradientCardBackground /> an example, if GradientCardBackground is moved here too.
    // However, to keep components separate, background components should stay in the .tsx file
    // and be imported here if needed, or passed in from the component using this data.
    // For now, assuming bentoFeaturesData doesn't directly instantiate these background components.
    // If it does, those components would need to be imported from the .tsx file.
  },
  {
    name: "PersonalStatusCard",
    className: "md:col-span-1 md:row-span-1",
    Icon: Smile,
    title: "当前状态",
    description: "超超超喜欢你@L",
  },
  {
    name: "FeaturedProjectCard",
    className: "md:col-span-1 md:row-span-2",
    Icon: Lightbulb,
    title: "项目精选: Torpedo_Page",
    description: "这个站点本身就是一个持续迭代的 React + FastAPI 项目！",
    href: "https://github.com/LEtorpedo/torpedo_page",
    cta: "查看源码",
  },
  {
    name: "LatestPostCard",
    className: "md:col-span-1 md:row-span-2",
    Icon: Newspaper,
    title: "最新博文",
    description: "TODO: 获取并显示最新1-2篇博文标题和摘要。",
    href: "/blog",
    cta: "前往博客",
  },
  {
    name: "NowPlayingCard",
    className: "md:col-span-1 md:row-span-1",
    Icon: Music2,
    title: "爱听的歌",
    description: "TODO: 显示当前正在听的歌曲 (Spotify/Last.fm)。",
  },
  {
    name: "SocialLinksCard",
    className: "md:col-span-1 md:row-span-1",
    Icon: Share2,
    title: "联系我",
    description: "如果你认为我很有意思，可以联系我！",
    href: "/contact",
    cta: "Links",
  },
]; 