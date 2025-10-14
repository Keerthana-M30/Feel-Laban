import { useState, useEffect } from "react";

const VisualEffects = () => {
  const [stars, setStars] = useState<
    Array<{
      id: number;
      left: number;
      top: number;
      size: number;
      duration: number;
      delay: number;
    }>
  >([]);
  const [foodIcons, setFoodIcons] = useState<
    Array<{
      id: number;
      top: number;
      duration: number;
      delay: number;
      drop: number;
    }>
  >([]);

  useEffect(() => {
    // Generate stars
    const newStars = [];
    for (let i = 0; i < 100; i++) {
      newStars.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
      });
    }
    setStars(newStars);

    // Generate food icons
    const newFoodIcons = [];
    const foodIconTypes = [
      "ice-cream",
      "cake",
      "cookie",
      "coffee",
      "milk",
      "donut",
    ];

    for (let i = 0; i < 8; i++) {
      newFoodIcons.push({
        id: i,
        top: Math.random() * 100,
        duration: Math.random() * 20 + 20, // Longer duration for smoother movement
        delay: Math.random() * 5,
        drop: (Math.random() - 0.5) * 100,
      });
    }
    setFoodIcons(newFoodIcons);
  }, []);

  return (
    <>
      {/* Twinkling Stars */}
      <div className="stars-container">
        {stars.map((star) => (
          <div
            key={`star-${star.id}`}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Food Icons */}
      {foodIcons.map((icon) => (
        <div
          key={`food-icon-${icon.id}`}
          className="food-icon"
          style={
            {
              top: `${icon.top}%`,
              animationDuration: `${icon.duration}s`,
              animationDelay: `${icon.delay}s`,
              "--drop": `${icon.drop}px`,
            } as React.CSSProperties
          }
        >
          {/* Simple food-related SVG icons with white outlines */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          >
            {/* Ice cream icon */}
            <path d="M12 3C13.5 3 14 5 15 6C16 7 17 8 17 10C17 14 12 17 12 17C12 17 7 14 7 10C7 8 8 7 9 6C10 5 10.5 3 12 3Z" />
            <path d="M12 17V20" />
            <path d="M9 20H15" />
            <path d="M8 23H16" />
          </svg>
        </div>
      ))}
    </>
  );
};

export default VisualEffects;
