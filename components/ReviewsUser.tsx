"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "./reviews.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Rating, ThinStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
const myStyles = {
  itemShapes: ThinStar,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#fbf1a9",
};
const ReviewsUser = () => {
  return (
    <div>
      <div className="w-full py-12 text-center text-2xl font-bold">
        PHẢN HỒI CỦA CHÚNG TÔI
      </div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper  "
      >
        <SwiperSlide className=" !opacity-90 !bg-transparent ">
          <div className="flex flex-col items-between p-6 gap-y-8  h-[460px]">
            <div className="flex justify-between ">
              <div className="flex flex-col gap-y-2">
                <h3 className="font-bold">ELON MUSK</h3>
                <Rating
                  style={{ maxWidth: 140 }}
                  value={5}
                  itemStyles={myStyles}
                  readOnly
                />
              </div>
              <Avatar className="w-20 h-20">
                <AvatarImage src="elon-musk.jpg" />
                <AvatarFallback>Elon Musk</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-left">
              Tôi đang rao bán công ty Tesla để dồn hết nguồn lực vào những vào
              sản phẩm của bạn, tôi cảm thấy đây là cơ hội mà tôi không thể bỏ
              lỡ, sản phẩm rất tuyệt vời
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className=" !opacity-90 !bg-transparent ">
          <div className="flex flex-col items-between p-6 gap-y-8 h-[460px]">
            <div className="flex justify-between">
              <div className="flex flex-col gap-y-2">
                <h3 className="font-bold">BILLIE EILISH</h3>
                <Rating
                  style={{ maxWidth: 140 }}
                  value={5}
                  itemStyles={myStyles}
                  readOnly
                />
              </div>
              <Avatar className="w-20 h-20">
                <AvatarImage src="billieeilish.jpeg" />
                <AvatarFallback>BILLIE EILISH</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-left">
              Trust me, your fashion items are 🔥. They fit like a glove, look
              chic, and are practically indestructible. 10/10 stars
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className=" !opacity-90 !bg-transparent">
          <div className="flex flex-col items-between p-6 gap-y-8 h-[460px]">
            <div className="flex justify-between">
              <div className="flex flex-col gap-y-2">
                <h3 className="font-bold">KIM JISOO</h3>
                <Rating
                  style={{ maxWidth: 140 }}
                  value={5}
                  itemStyles={myStyles}
                  readOnly
                />
              </div>
              <Avatar className="w-20 h-20">
                <AvatarImage src="jisso.jpg" />
                <AvatarFallback>KIM JISOO</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-left">
              Tôi vừa mua một chiếc quần jeans skinny cạp cao và chúng khiến tôi
              cảm thấy rất tự tin và thoải mái. Tôi yêu chúng
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className=" !opacity-90 !bg-transparent">
          <div className="flex flex-col items-between p-6 gap-y-8 h-[460px]">
            <div className="flex justify-between">
              <div className="flex flex-col gap-y-2">
                <h3 className="font-bold">GIGA CHAD</h3>
                <Rating
                  style={{ maxWidth: 140 }}
                  value={1}
                  itemStyles={myStyles}
                  readOnly
                />
              </div>
              <Avatar className="w-20 h-20">
                <AvatarImage src="/gigachad.jpg" />
                <AvatarFallback>Giga Chad</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-left">
              Sản phẩm của bạn? Tệ thật. Thay vì chi hàng ngàn đô la cho những
              thứ *** về thời trang, hãy đến phòng tập thể dục và nâng tạ. Bạn
              sẽ hấp dẫn hơn và cơ thể bạn sẽ tự nói lên điều đó. Không cần phải
              trả nhiều tiền hơn để trông giống một người đàn ông.
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className=" !opacity-90 !bg-transparent">
          <div className="flex flex-col items-between p-6 gap-y-8 h-[460px]">
            <div className="flex justify-between">
              <div className="flex flex-col gap-y-2">
                <h3 className="font-bold uppercase">Taylor Swift</h3>
                <Rating
                  style={{ maxWidth: 140 }}
                  value={5}
                  itemStyles={myStyles}
                  readOnly
                />
              </div>
              <Avatar className="w-20 h-20">
                <AvatarImage src="taylor.jpg" />
                <AvatarFallback>Taylor Swift</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-left">
              Thoải mái và phong cách, tôi thích sự kết hợp giữa sự thoải mái và
              phong cách mà quần áo của bạn mang lại. Chất liệu vải mềm mại giúp
              bạn dễ dàng di chuyển mà vẫn trông thời trang.
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className=" !opacity-90 !bg-transparent">
          <div className="flex flex-col items-between p-6 gap-y-8 h-[460px]">
            <div className="flex justify-between">
              <div className="flex flex-col gap-y-2">
                <h3 className="font-bold uppercase">Lionel Messi</h3>
                <Rating
                  style={{ maxWidth: 140 }}
                  value={5}
                  itemStyles={myStyles}
                  readOnly
                />
              </div>
              <Avatar className="w-20 h-20">
                <AvatarImage src="mess.jpg" />
                <AvatarFallback>Lionel Messi</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-left">
              Vợ tôi rất thích, cô ấy đã hết giận tôi nếu không tôi đã phải ngủ
              ngoài đường. Sản phẩm quá tuyệt khiến tôi ước tôi là ... à không
              có gì.
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className=" !opacity-90 !bg-transparent">
          <div className="flex flex-col items-between p-6 gap-y-8 h-[460px]">
            <div className="flex justify-between">
              <div className="flex flex-col gap-y-2">
                <h3 className="font-bold uppercase">幾田りら</h3>
                <Rating
                  style={{ maxWidth: 140 }}
                  value={5}
                  itemStyles={myStyles}
                  readOnly
                />
              </div>
              <Avatar className="w-20 h-20">
                <AvatarImage src="ikura.jpeg" />
                <AvatarFallback>幾田りら</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-left">
              とても美しくて可愛い、日本人にぴったりの商品です。ところで、アイドルになりたいですか？
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ReviewsUser;
