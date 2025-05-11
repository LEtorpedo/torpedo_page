import React from 'react';
import HeroSection from '../components/home/HeroSection';
import SelfIntroSection from '../components/home/SelfIntroSection';
import ProjectHighlightsSection from '../components/home/ProjectHighlightsSection';
import LatestArticlesSection from '../components/home/LatestArticlesSection';
import SocialLinksSection from '../components/home/SocialLinksSection';

const HomePage: React.FC = () => {
  return (
    <div className="homepage-container p-4"> {/* Added some padding for visibility */}
      <HeroSection />
      <SelfIntroSection />
      <ProjectHighlightsSection />
      <LatestArticlesSection />
      <SocialLinksSection />
      {/* We will work on the Bento Grid layout next */}
    </div>
  );
};

export default HomePage; 