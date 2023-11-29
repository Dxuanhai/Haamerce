import React from "react";

interface Props {
  colorValue: string;

  changeColor?: () => void;
  colorAcctive: boolean;
}

function ColorCard({ colorValue, changeColor, colorAcctive }: Props) {
  return (
    <div
      onClick={changeColor}
      className={`${colorAcctive ? "w-14 md:w-8 " : ""} ${
        colorValue === "#ffffff" &&
        "border-[1px] dark:border-none border-slate-800 "
      } h-10 w-10  md:h-5 md:w-5 rounded-full cursor-pointer`}
      style={{
        backgroundColor: colorValue,
      }}
    ></div>
  );
}

export default ColorCard;
