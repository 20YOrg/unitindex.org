// components/DocumentationCards.tsx
import React from 'react';
import styles from '@/styles/DocumentationCards.module.css';

interface Card {
  id: string;
  title: string;
  description: string;
  link: string;
  icon: string;
}

interface DocumentationCardsProps {
  cards: Card[];
}

const DocumentationCards: React.FC<DocumentationCardsProps> = ({ cards }) => {
  return (
    <div className={styles.cardsContainer}>
      {cards.map((card) => (
        <div key={card.id} className={styles.card}>
          <div className={styles.cardIcon}>
            <img src={card.icon} alt={card.title} />
          </div>
          <h2 className={styles.cardTitle}>{card.title}</h2>
          <p className={styles.cardDescription}>{card.description}</p>
          <a href={card.link} className={styles.cardLink}>
            Learn More
          </a>
        </div>
      ))}
    </div>
  );
};

export default DocumentationCards;