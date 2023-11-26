import React from "react";

interface Props {
  color: string;
  changeColor: () => void;
  colorAcctive: boolean;
}

function ColorCard({ color, changeColor, colorAcctive }: Props) {
  return (
    <div
      onClick={changeColor}
      className={`${
        colorAcctive ? "w-8 " : ""
      }h-5 w-5 rounded-full cursor-pointer`}
      style={{
        backgroundColor: color,
      }}
    ></div>
  );
}

export default ColorCard;
