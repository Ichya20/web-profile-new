
import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetween = 2000,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentFullText = texts[currentIndex];

      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentFullText.length) {
          setTimeout(() => setIsDeleting(true), delayBetween);
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    };

    const timeout = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, texts, typingSpeed, deletingSpeed, delayBetween]);

  return (
    <span className="mono font-medium text-blue-400">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default Typewriter;
