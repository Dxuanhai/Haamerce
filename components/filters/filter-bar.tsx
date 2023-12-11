"use client";

import { Color } from "@/types";
import ColorFilter from "./colorFilter";
import { useState } from "react";
import { Button } from "../ui/button";
import { useOrigin } from "@/hooks/use-origin";
import qs from "query-string";
import Link from "next/link";
import { Separator } from "../ui/separator";

interface Props {
  data: Color[];
  queryString: string[] | undefined;
  params: { categoryId: string };
}

function Filterbar({ data, queryString, params }: Props) {
  const [selectedColors, setSelectedColors] = useState<string[]>(
    queryString || []
  );

  const origin = useOrigin();
  const url = qs.stringifyUrl({
    url: `${origin}/category/${params.categoryId}`,
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

  return (
    <div className=" w-[320px] border-r-2 p-[20px] dark:border-zinc-500">
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
      <Button>
        <Link href={url}> Filter</Link>
      </Button>
    </div>
  );
}

export default Filterbar;
