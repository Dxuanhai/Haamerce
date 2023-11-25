import React from "react";

interface Props {
  color: string;
  changeColor: () => void;
}

function ColorCard({ color, changeColor }: Props) {
  return (
    <div
      onClick={changeColor}
      className="h-6 w-6 rounded-full cursor-pointer"
      style={{
        backgroundColor: color,
      }}
    ></div>
  );
}

export default ColorCard;
