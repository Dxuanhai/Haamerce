"use client";

import { Color } from "@/types";
import ColorFilter from "./colorFilter";
import { useState } from "react";
import { Button } from "../ui/button";
import { useOrigin } from "@/hooks/use-origin";
import qs from "query-string";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  data: Color[];
  queryString: string[] | undefined;
  params: { categoryId: string };
}

function Filterbar({ data, queryString, params }: Props) {
  const router = useRouter();

  const [selectedColors, setSelectedColors] = useState<string[]>(
    queryString || []
  );
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10000000);

  const origin = useOrigin();
  const url = qs.stringifyUrl({
    url: `${origin}/category/${params.categoryId}`,
    query: {
      colors: selectedColors,
      min: min.toString(),
      max: max.toString(),
    },
  });

  const handleSelectedColor = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };
  const handleFilter = () => {
    if (min >= max) {
      return toast.error("Min price must be less than max price");
    }
    router.push(url);
  };
  return (
    <div className=" w-[270px] h-full rounded-lg border-r-2 p-[20px] dark:border-zinc-500 bg-neutral-100 bg-gradient-to-b  dark:from-neutral-950 dark:via-slate-700 dark:to-neutral-950 dark:text-zinc-300 text-slate-800 ">
      <div className="grid grid-cols-3 gap-2">
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <ColorFilter
              key={item.id}
              data={item}
              colorsSelect={selectedColors}
              handleSelectedColor={handleSelectedColor}
            />
          ))}
      </div>
      <Separator className="my-10" />
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center gap-x-2 w-full">
          <span>MIN</span>
          <Input
            onChange={(e: any) => setMin(parseInt(e.target.value))}
            type="number"
            placeholder="0 ₫"
            className="w-2/3 focus-visible:ring-transparent"
          />
        </div>
        <div className="flex justify-between items-center gap-x-2 w-full">
          <span>MAX</span>
          <Input
            onChange={(e: any) => setMax(parseInt(e.target.value))}
            placeholder="10.000.000 ₫"
            type="number"
            className="w-2/3 focus-visible:ring-transparent"
          />
        </div>
      </div>
      <Separator className="my-10" />
      <Button
        onClick={() => handleFilter()}
        variant="ghost"
        className="tracking-widest"
      >
        Filter
      </Button>
    </div>
  );
}

export default Filterbar;
