"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  urlImage: string;
}

function ImageMagnifier({ urlImage }: Props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: any) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 80;
    const y = ((e.pageY - top) / height) * 80;
    setPosition({ x, y });
    setCursorPosition({ x: e.pageX - left, y: e.pageY - top });
  };
  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={urlImage}
        alt="product"
        width={400}
        height={500}
        className="h-full w-full object-fill rounded-md absolute"
      />
      <div
        className={`absolute  w-full h-full z-10 pointer-events-none 
       `}
      >
        {showMagnifier && (
          <div
            className="w-full h-full border-2 "
            style={{
              backgroundImage: `url(${urlImage})`,
              backgroundPosition: `${position.x}% ${position.y}%`,
            }}
          ></div>
        )}
      </div>
    </div>
  );
}

export default ImageMagnifier;
