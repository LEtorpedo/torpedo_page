import React, { useState } from 'react';
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import { useDynamicBentoFeatures } from '@/hooks/useDynamicBentoFeatures'; // Import the custom hook
import HeroSection from '../components/home/HeroSection';
import { ChoiceModal, type ModalChoice } from '@/components/common/ChoiceModal'; // Import ChoiceModal and its types
// Define the type for the state holding modal details directly
interface CurrentModalData {
  title: string;
  description?: string;
  choices: ModalChoice[]; // Use ModalChoice[] from ChoiceModal for consistency
}

const HomePage: React.FC = () => {
  const features = useDynamicBentoFeatures(); // Call the hook to get dynamic features
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Ensure currentModalDetails can be null or of type CurrentModalData
  const [currentModalDetails, setCurrentModalDetails] = useState<CurrentModalData | null>(null);

  // The details parameter should match the structure of feature.modalDetails from config
  // which aligns with CurrentModalData if feature.modalDetails is not undefined.
  const handleOpenModal = (details: NonNullable<typeof features[0]['modalDetails']>) => {
    if (details) {
      // The structure of 'details' here is { title, description?, choices }
      // and details.choices should be compatible with ModalChoice[]
      setCurrentModalDetails(details as CurrentModalData); 
      setIsModalOpen(true);
    }
  };

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
            cta={feature.cta} // Pass CTA always
            // Conditional props for navigation or modal trigger
            href={feature.modalDetails ? undefined : feature.href || "#"} 
            onCtaClick={feature.modalDetails ? () => handleOpenModal(feature.modalDetails!) : undefined} // Added non-null assertion for details passed
          />
        ))}
      </BentoGrid>

      {currentModalDetails && (
        <ChoiceModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          modalTitle={currentModalDetails.title}
          modalDescription={currentModalDetails.description}
          choices={currentModalDetails.choices} // This should now correctly type-check
        />
      )}
      {/* <SelfIntroSection /> */}
      {/* <ProjectHighlightsSection /> */}
      {/* <LatestArticlesSection /> */}
      {/* <SocialLinksSection /> */}
    </div>
  );
};

export default HomePage; 