"use client";

import { Color } from "@/types";
interface Props {
  data: Color;
  colorsSelect: string[] | undefined;
  handleSelectedColor: (data: string) => void;
}
function ColorFilter({ data, handleSelectedColor, colorsSelect }: Props) {
  let isSelected = colorsSelect && colorsSelect.includes(data.name);
  return (
    <div
      onClick={() => handleSelectedColor(data.name)}
      className={`h-[50px] w-[50px] rounded-md cursor-pointer hover:opacity-50 ${
        isSelected && "border-4 border-blue-400"
      }`}
      style={{ backgroundColor: `${data.value}` }}
    ></div>
  );
}

export default ColorFilter;
