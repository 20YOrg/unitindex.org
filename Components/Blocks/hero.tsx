import React from 'react';

interface HeroProps {
  headline: string;
  content: string;
  image: string; // Assuming you have the image URL
  image_position: string;
  button_group: string; // You may want to fetch button group details separately
}

const Hero: React.FC<HeroProps> = ({ headline, content, image, image_position, button_group }) => (
  <div className={`hero-block ${image_position}`}>
    <div dangerouslySetInnerHTML={{ __html: headline }}></div>
    <p>{content}</p>
    {image && <img src={image} alt="Hero" />}
    {/* Placeholder for buttons */}
    {button_group && <div>Button Group: {button_group}</div>}
  </div>
);

export default Hero;