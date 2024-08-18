"use client";

import React, { useState } from 'react';
import styles from '@/styles/AboutPage.module.css';

interface FAQ {
  title: string;
  answer: string;
}

interface FaqSectionProps {
  faqSection: {
    title: string;
    faqs: FAQ[];
  };
}

const FaqSection: React.FC<FaqSectionProps> = ({ faqSection }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqSection}>
      <h2 className={`${styles.title} ${styles.faqTitle}`}>{faqSection.title}</h2>
      {faqSection.faqs.map((faq, index) => (
        <div key={index} className={styles.faqItem}>
          <div
            className={styles.faqQuestion}
            onClick={() => toggleFaq(index)}
          >
            {faq.title}
          </div>
          {openIndex === index && (
            <div className={styles.faqAnswer}>{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqSection;