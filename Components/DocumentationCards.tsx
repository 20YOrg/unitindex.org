// components/DocumentationCards.tsx
import React from 'react';
import styles from '@/styles/DocumentationCards.module.css';

interface DocumentationCard {
  id: string;
  title: string;
  icon: string;
  link: string;
  button: string;
  description: string;
}

interface DocumentationCardsProps {
  cards: DocumentationCard[];
}

const DocumentationCards: React.FC<DocumentationCardsProps> = ({ cards }) => {
  return (
    <div className={styles.cardsContainer}>
      {cards.map((card) => (
        <div key={card.id} className={styles.card}>
          <a href={card.link} className={styles.cardLinkWrapper}>
            <div className={styles.cardIcon}>
              <img src={card.icon} alt={card.title} />
            </div>
            <h2 className={styles.cardTitle}>{card.title}</h2>
            <p className={styles.cardDescription} dangerouslySetInnerHTML={{ __html: card.description }}></p>
            {card.button && (
              <div className={styles.cardButtonContainer}>
                <span className={styles.cardButton}>{card.button}</span>
              </div>
            )}
          </a>
        </div>
      ))}
    </div>
  );
};

export default DocumentationCards;