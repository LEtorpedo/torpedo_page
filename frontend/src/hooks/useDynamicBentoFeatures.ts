import { useState, useEffect, useMemo } from 'react';
import {
  bentoFeaturesData as staticBentoFeatures,
  moodIcons,
  // type BentoFeatureCardConfig, // Removed as it's not directly used here
  type IconType,
} from '@/config/homeBentoFeatures';
import { Smile } from 'lucide-react'; // Default fallback icon if moodIcons.default is somehow undefined

export const useDynamicBentoFeatures = () => {
  const [currentMoodKey, setCurrentMoodKey] = useState<string>('default');

  // TODO: 后续这里会替换为从后端API获取真实心情的逻辑
  // 示例：模拟心情在不同状态间切换，方便测试动态图标
  useEffect(() => {
    const moods = Object.keys(moodIcons).filter(key => key !== 'default');
    let moodIndex = 0;
    const intervalId = setInterval(() => {
      moodIndex = (moodIndex + 1) % moods.length;
      setCurrentMoodKey(moods[moodIndex]);
    }, 5000); // 每5秒切换一次心情

    return () => clearInterval(intervalId); // 清理interval
  }, []);

  const processedBentoFeatures = useMemo(() => {
    return staticBentoFeatures.map((feature) => {
      if (feature.name === 'PersonalStatusCard') {
        // 安全性：确保currentMoodKey存在于moodIcons中，否则使用默认图标
        // 进一步确保moodIcons.default存在，否则使用最终的硬编码回退图标Smile
        const SelectedIcon = moodIcons[currentMoodKey as keyof typeof moodIcons] || moodIcons.default || Smile;
        return {
          ...feature,
          Icon: SelectedIcon as IconType, // 确保类型正确传递
        };
      }
      return feature;
    });
  }, [currentMoodKey]);

  return processedBentoFeatures;
}; 