import React from 'react';
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
// import { bentoFeaturesData } from "@/config/homeBentoFeatures"; // No longer directly importing static data
import { useDynamicBentoFeatures } from '@/hooks/useDynamicBentoFeatures'; // Import the custom hook
import HeroSection from '../components/home/HeroSection';
// import SelfIntroSection from '../components/home/SelfIntroSection';
// import ProjectHighlightsSection from '../components/home/ProjectHighlightsSection';
// import LatestArticlesSection from '../components/home/LatestArticlesSection';
// import SocialLinksSection from '../components/home/SocialLinksSection';

const HomePage: React.FC = () => {
  const features = useDynamicBentoFeatures(); // Call the hook to get dynamic features

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <BentoGrid className="lg:grid-rows-3">
        {features.map((feature) => ( // Use the features from the hook
          <BentoCard
            key={feature.name}
            name={feature.title || feature.name} // title is optional in config, name is mandatory
            className={feature.className}
            background={feature.background}
            Icon={feature.Icon}
            description={feature.description} // Pass description as ReactNode directly
            href={feature.href || "#"}
            cta={feature.cta || "Learn more"}
          />
        ))}
      </BentoGrid>
      {/* <SelfIntroSection /> */}
      {/* <ProjectHighlightsSection /> */}
      {/* <LatestArticlesSection /> */}
      {/* <SocialLinksSection /> */}
    </div>
  );
};

export default HomePage; 