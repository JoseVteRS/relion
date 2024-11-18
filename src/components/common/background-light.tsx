import React from "react";



interface BackgroundLightProps {
  color?: string;
  size?: string;
  position?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  random?: boolean;
}

export default function BackgroundLight({
  color = "bg-blue-500",
  size = "size-96",
  position = {
    bottom: "20",
    left: "-20"
  },
  random = false
}: BackgroundLightProps) {

  const colors = ["bg-blue-500/20", "bg-purple-500/20", "bg-pink-500/20", "bg-yellow-500/20"];
  const sizes = ["size-80", "size-96", "size-112", "size-128"];
  
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
  const positions = {
    top: ["0", "10", "20", "30", "40"],
    bottom: ["0", "-10", "-20", "-30", "-40"],
    left: ["0", "-10", "-20", "-30", "-40"],
    right: ["0", "10", "20", "30", "40"]
  };

  const randomPositionKey = Object.keys(positions)[Math.floor(Math.random() * Object.keys(positions).length)];
  const randomPositionValue = positions[randomPositionKey as keyof typeof positions][Math.floor(Math.random() * positions[randomPositionKey as keyof typeof positions].length)];
  const randomPosition = { [randomPositionKey]: randomPositionValue };

  const finalColor = random ? randomColor : color;
  const finalSize = random ? randomSize : size;
  const finalPosition = random ? randomPosition : position;

  const positionClasses = `
    ${finalPosition.top ? `top-${finalPosition.top}` : ""}
    ${finalPosition.bottom ? `bottom-${finalPosition.bottom}` : ""}
    ${finalPosition.left ? `left-${finalPosition.left}` : ""}
    ${finalPosition.right ? `right-${finalPosition.right}` : ""}
  `;

  return (
    <div 
      className={`
        absolute
        ${positionClasses}
        ${finalSize}
        ${finalColor}
        rounded-full
        blur-3xl
      `}
    />
  );
}
