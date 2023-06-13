import { FC, useState, useEffect, useRef } from 'react';
import './TextLine.scss';

type Props = {
  text: string;
};

export const TextLine: FC<Props> = ({ text }) => {
  const [position, setPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const containerWidth = containerRef.current?.offsetWidth ?? 0;
    const textWidth = textRef.current?.offsetWidth ?? 0;
    let animationFrame: number;

    const moveText = () => {
      let newPosition = position - 1;
      if (newPosition + textWidth <= 0) {
        newPosition = containerWidth;
      }

      setPosition(newPosition);
      animationFrame = requestAnimationFrame(moveText);
    };

    animationFrame = requestAnimationFrame(moveText);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [position]);

  return (
    <div className="moving-text-container" ref={containerRef}>
      <span
        className="moving-text"
        ref={textRef}
        style={{ transform: `translateX(${position}px)` }}
      >
        {text}
      </span>
    </div>
  );
};
