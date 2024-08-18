import React from 'react';

interface IconProps {
  src: string;
  alt: string;
  effect: string;
  linkURL?: string;
  title?: string;
}

const Icon: React.FC<IconProps> = ({ src, alt, effect, linkURL, title }) => {
  return (
    <a href={linkURL || '#'} target="_blank" rel="noopener noreferrer">
      <img src={src} alt={alt} title={title} className={`icon ${effect}`} />
    </a>
  );
};

export default Icon;