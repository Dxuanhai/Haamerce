"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useState } from "react";
import Image from "next/image";

interface Props {
  id: string;
  label: string;
  imageUrl: string;
}

const Billboard = ({ data }: { data: Props[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="rounded-xl p-4 sm:p-6 lg:p-8  h-[300px] w-full aspect-auto md:h-[800px] md:aspect-[2.4/1] overflow-hidden bg-cover flex flex-col gap-4">
      <Swiper
        style={{
          //@ts-ignore
          "--swiper-theme-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className=" rounded-xl mySwiper2 "
      >
        {data.length > 0 &&
          data.map((i) => (
            <SwiperSlide key={i.id}>
              <Image
                src={i.imageUrl}
                alt={i.label}
                fill
                style={{ objectFit: "cover" }}
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        //@ts-ignore
        onSwiper={setThumbsSwiper}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Autoplay, Navigation, Thumbs]}
        className="mySwiper "
      >
        {data.length > 0 &&
          data.map((i) => (
            <SwiperSlide key={i.id}>
              <Image
                src={i.imageUrl}
                alt={i.label}
                fill
                style={{ objectFit: "cover" }}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

// <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
//   <div
//     style={{ backgroundImage: `url(${data?.imageUrl})` }}
//     className="rounded-xl relative  aspect-[5/2] md:aspect-[2.4/1] overflow-hidden bg-cover"
//   ></div>
// </div>
export default Billboard;
