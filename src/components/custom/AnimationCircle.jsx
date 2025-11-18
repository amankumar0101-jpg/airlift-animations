import React from "react";

const AnimationCircle = ({
  score = "76%",
  size = 70,
  strokeWidth = 12,
  progressColor = "#312E81",
  trackColor = "#FAFAFA",
  scale = 1, // use scale to animate visual size (transform)
  className = "",
  opacity = 0.6,
}) => {
  // Get numeric value from score
  let value = parseInt(String(score).replace("%", ""), 10);

  // Normalize value for all below 100 to avoid rounded ends touching
  if (value < 100) {
    value = Math.max(0, value - 7); // subtract a few percent for visual gap
  }

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        display: "inline-block",
        transformOrigin: "50% 50%",
        transform: `scale(${scale})`,
        transition: "transform 320ms cubic-bezier(.2,.9,.2,1)",
        opacity: opacity,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ display: "block" }}
      >
        {/* Background Circle (track) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-30 ${size / 2} ${size / 2})`}
        />
      </svg>
    </div>
  );
};

export default AnimationCircle;
