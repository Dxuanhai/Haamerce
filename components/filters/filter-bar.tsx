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
import { ChevronLeft, ChevronRight, ChevronsLeft } from "lucide-react";

interface Props {
  data: Color[];
  queryString: string[] | undefined;
  id: string;
}

function Filterbar({ data, queryString, id }: Props) {
  const router = useRouter();

  const [selectedColors, setSelectedColors] = useState<string[]>(
    queryString || []
  );
  const [onFilterBar, setOnFilterBar] = useState(true);

  const origin = useOrigin();
  const url = qs.stringifyUrl({
    url: `${origin}/category/${id}`,
    query: {
      colors: selectedColors,
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
    router.push(url);
  };
  const toggleHiddenBar = () => {
    document.querySelector(".filter-bar")?.classList.add("hidden");
    setOnFilterBar(true);
  };
  const toggleApperBar = () => {
    document.querySelector(".filter-bar")?.classList.remove("hidden");
    setOnFilterBar(false);
  };

  return (
    <>
      {onFilterBar && (
        <div
          className="block md:hidden z-100  fixed top-1/2 left-0 rounded-tr-lg rounded-br-lg   -translate-y-1/2 bg-neutral-100 bg-gradient-to-b  dark:bg-[#120c12] dark:text-[#c59f60] text-slate-800 
      "
          onClick={() => toggleApperBar()}
        >
          <ChevronRight className="w-[30px] h-[80px] " />
        </div>
      )}
      <div className=" filter-bar  hidden md:block absolute md:relative z-20 w-[220px]  md:w-[270px]  md:h-full rounded-lg border-r-2 p-[20px] dark:border-zinc-500 bg-neutral-100 bg-gradient-to-b  dark:bg-[#120c12] dark:text-[#c59f60] text-slate-800 ">
        <div
          className=" filter-bar-nav  block md:hidden  absolute top-1/2 -right-7 rounded-tr-lg rounded-br-lg   -translate-y-1/2 bg-neutral-100 bg-gradient-to-b  dark:bg-[#120c12] dark:text-[#c59f60] text-slate-800 
      "
          onClick={() => toggleHiddenBar()}
        >
          <ChevronLeft className="w-[30px] h-[80px] " />
        </div>
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

        <Separator className="my-10" />
        <Button
          onClick={() => handleFilter()}
          variant="ghost"
          className="tracking-widest text-lg"
        >
          Lọc
        </Button>
      </div>
    </>

  );
}

export default Filterbar;
