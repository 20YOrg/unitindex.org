// Components/page-builder.tsx
import FAQ from './Blocks/FAQ';
import Hero from './Blocks/Hero'; // Correct casing

const PageBuilder = ({ blocks }) => {
  return (
    <div>
      {blocks.map((block, index) => {
        switch (block.collection) {
          case 'block_faqs':
            return <FAQ key={index} block={block} />;
          case 'block_hero':
            return <Hero key={index} block={block} />;
          default:
            return <div key={index}>Unknown block type</div>;
        }
      })}
    </div>
  );
};

export default PageBuilder;