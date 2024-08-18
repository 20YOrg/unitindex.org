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
      {cards.map((card, index) => (
        <div key={card.id} className={styles.card}>
          <a href={card.link} className={styles.cardLinkWrapper}>
            <div className={styles.cardIcon}>
              <img src={card.icon} alt={card.title} />
            </div>
            <h2 className={styles.cardTitle}>{card.title}</h2>
            <p className={styles.cardDescription} dangerouslySetInnerHTML={{ __html: card.description }}></p>
            {card.button && index === 0 && (
              <div className={styles.cardButtonContainer}>
                <span className={styles.cardButton}>
                  {card.button}
                  <svg
                    className={styles.arrowIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            )}
          </a>
          {index !== 0 && (
            <div className={styles.arrowContainer}>
              <svg
                className={styles.arrowIconNonFirst}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DocumentationCards;