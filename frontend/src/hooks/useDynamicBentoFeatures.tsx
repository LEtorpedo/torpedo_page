import { useMemo } from 'react';
import type { ReactNode, CSSProperties } from 'react'; // Import CSSProperties
import {
  bentoFeaturesData as staticBentoFeatures,
  type BentoFeatureCardConfig,
  type IconType,
} from '@/config/homeBentoFeatures.data';
import LoveStatusIcon from '@/components/icons/LoveStatusIcon';

// Removed local definition of LoveStatusIcon as it's now imported
// const LoveStatusIcon = (props: { className?: string }) => (
//   <span 
//     {...props} 
//     // text-base is roughly 16px, matching the typical 1rem size of icons in BentoCard
//     // props.className will likely carry color information e.g., text-slate-500
//     className={`flex items-center justify-center text-base ${props.className || ''}`}
//   >
//     🥰
//   </span>
// );

interface DescriptionSegment {
  text: string;
  styleKey: 'normal' | 'cursive_main';
}

export const useDynamicBentoFeatures = (): BentoFeatureCardConfig[] => {
  const processedBentoFeatures = useMemo(() => {
    return staticBentoFeatures.map((feature: BentoFeatureCardConfig): BentoFeatureCardConfig => {
      if (feature.name === 'PersonalStatusCard') {
        const descriptionSegments: DescriptionSegment[] = [
          { text: "超超超喜欢你", styleKey: "normal" },
          { text: "@", styleKey: "normal" }, 
          { text: "L", styleKey: "cursive_main" }
        ];

        const styledDescription: ReactNode = (
          <>
            {descriptionSegments.map((segment, index) => {
              let segmentStyle: CSSProperties = {};
              if (segment.styleKey === 'cursive_main') {
                segmentStyle = { fontFamily: '"Dancing Script Custom", cursive' };
              }
              // 'normal' styleKey doesn't need specific style object unless overriding defaults
              return <span key={index} style={segmentStyle}>{segment.text}</span>;
            })}
          </>
        );

        return {
          ...feature,
          Icon: LoveStatusIcon as IconType,
          description: styledDescription,
        };
      }
      return feature;
    });
  }, []); // Dependency array is empty as currentMoodKey is removed

  return processedBentoFeatures;
}; 