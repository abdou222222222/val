import React, { useMemo } from "react";
import { Heart } from "lucide-react";

interface FloatingHeartsProps {
  /** Number of hearts to render */
  count?: number;
}

const colors = [
  "text-red-600",
  "text-pink-600",
  "text-white",
  "text-violet-500",
];

const FloatingHearts: React.FC<FloatingHeartsProps> = ({ count = 40 }) => {
  const hearts = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 32 + 8; // very tiny
      const left = Math.random() * 100;
      const delay = Math.random() * 20;
      const duration = Math.random() * 20 + 20;
      const color = colors[Math.floor(Math.random() * colors.length)];

      return {
        id: i,
        size,
        left,
        delay,
        duration,
        color,
      };
    });
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className={`absolute ${heart.color} opacity-0 `}
          style={{
            left: `${heart.left}%`,
            width: heart.size,
            height: heart.size,
            bottom: "-10px",
            animation: `floatUp ${heart.duration}s linear infinite`,
            animationDelay: `${heart.delay}s`,
          }}
        />
      ))}

      <style>
        {`
          @keyframes floatUp {
            0% {
              transform: translateY(0) translateX(0);
              opacity: 0;
            }
            10% {
              opacity: 0.2;
            }
            50% {
              transform: translateY(-50vh) translateX(10px);
            }
            100% {
              transform: translateY(-110vh) translateX(-10px);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default FloatingHearts;

