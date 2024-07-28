import React from 'react';
import FAQ from './FAQ';
import Hero from './Hero';
// Import other blocks as needed

interface BlockProps {
  block: {
    id: string;
    type: string;
    headline?: string;
    content?: string;
    image?: string;
    image_position?: string;
    button_group?: string;
    faqs?: { title: string; answer: string }[];
    alignment?: string;
    // Add other fields as needed
  };
}

const BlockRenderer: React.FC<BlockProps> = ({ block }) => {
  switch (block.type) {
    case 'faq':
      return (
        <FAQ
          headline={block.headline || ''}
          faqs={block.faqs || []}
          alignment={block.alignment || 'left'}
        />
      );
    case 'hero':
      return (
        <Hero
          headline={block.headline || ''}
          content={block.content || ''}
          image={block.image || ''}
          image_position={block.image_position || 'left'}
          button_group={block.button_group || ''}
        />
      );
    // Add cases for other block types
    default:
      return null;
  }
};

export default BlockRenderer;