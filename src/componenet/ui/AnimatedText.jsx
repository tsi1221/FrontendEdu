import { useState, useEffect, memo } from 'react';

const AnimatedText = memo(({ texts }) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = texts[index];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
          if (displayText === currentFullText) {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));
          if (displayText === '') {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, index, texts]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
});

AnimatedText.displayName = 'AnimatedText';

export { AnimatedText };