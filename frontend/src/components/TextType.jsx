import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';

const TextType = ({
  text,
  typingSpeed = 100,
  pauseDuration = 2000,
  deletingSpeed = 50,
  loop = true,
  showCursor = true,
  cursorCharacter = '|',
  initialDelay = 0,
  className = '',
  style = {},
  onComplete = null,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef(null);

  const textArray = Array.isArray(text) ? text : [text];

  useEffect(() => {
    if (isComplete) return;

    const executeTypingAnimation = () => {
      const currentText = textArray[currentTextIndex];

      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false);
          
          // Move to next text or complete if not looping
          if (currentTextIndex === textArray.length - 1 && !loop) {
            setIsComplete(true);
            if (onComplete) onComplete();
            return;
          }
          
          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
          
          timeoutRef.current = setTimeout(executeTypingAnimation, pauseDuration);
        } else {
          timeoutRef.current = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < currentText.length) {
          timeoutRef.current = setTimeout(() => {
            setDisplayedText((prev) => prev + currentText[currentCharIndex]);
            setCurrentCharIndex((prev) => prev + 1);
          }, typingSpeed);
        } else if (textArray.length > 1 && loop) {
          // Start deleting after pause
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        } else if (textArray.length > 1 && !loop) {
          // Move to next text without deleting
          if (currentTextIndex < textArray.length - 1) {
            timeoutRef.current = setTimeout(() => {
              setCurrentTextIndex((prev) => prev + 1);
              setCurrentCharIndex(0);
              setDisplayedText('');
            }, pauseDuration);
          } else {
            setIsComplete(true);
            if (onComplete) onComplete();
          }
        } else {
          // Single text, complete
          setIsComplete(true);
          if (onComplete) onComplete();
        }
      }
    };

    // Initial delay
    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeoutRef.current = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    currentTextIndex,
    textArray,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    loop,
    initialDelay,
    isComplete,
    onComplete
  ]);

  return (
    <Box as="span" className={className} style={style} {...props}>
      <Box as="span">{displayedText}</Box>
      {showCursor && (
        <Box
          as="span"
          ml="2px"
          animation="blink 1s infinite"
          color="white"
          sx={{
            '@keyframes blink': {
              '0%, 50%': { opacity: 1 },
              '51%, 100%': { opacity: 0 }
            }
          }}
        >
          {cursorCharacter}
        </Box>
      )}
    </Box>
  );
};

export default TextType;
