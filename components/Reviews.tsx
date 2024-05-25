"use client";

import { Review } from "@/types";
import { useUser } from "@clerk/nextjs";
import { Rating, ThinStar } from "@smastrom/react-rating";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import "@smastrom/react-rating/style.css";
import { Button } from "./ui/button";
import { getProfile } from "@/actions/profile";
import axios from "axios";

interface Props {
  data: Review[];
  productId: string;
}

const myStyles = {
  itemShapes: ThinStar,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#fbf1a9",
};

const Reviews = ({ data, productId }: Props) => {
  const { user } = useUser();

  const [profile, setProfile] = useState<any>(null); // Set initial state to null
  const [averageRating, setAverageRating] = useState(0);
  const [rating, setRating] = useState(0);
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/purchased`;
  useEffect(() => {
    if (data.length > 0) {
      const totalRating = data.reduce((sum, review) => sum + review.rating, 0);
      const avgRating = totalRating / data.length;
      setAverageRating(avgRating);
    }
    const fetchProfile = async () => {
      try {
        if (user?.id) {
          const res = await axios.get(
            `${URL}?userId=${user.id}&productId=${productId}`
          );
          if (res.data) {
            setProfile(res.data);
            console.log("🚀  / fetchProfile  / res:", res.data);
          }
        }
      } catch (error) {
        console.log("🚀  / fetchProfile  / error:", error);
      }
    };
    fetchProfile();
  }, [data, user]);

  const handleSubmit = async () => {
    // Handle submit logic here
  };

  return (
    <div className="py-10 w-full">
      <h2 className="font-bold text-2xl">ĐÁNH GIÁ SẢN PHẨM</h2>
      <div className="flex gap-x-2">
        <Rating
          style={{ maxWidth: 140 }}
          value={averageRating}
          itemStyles={myStyles}
          readOnly
        />
        <p className="mt-2"> ({data.length}) đánh giá</p>
      </div>{" "}
      {profile?.productId === productId && (
        <div className="py-6 flex gap-4 items-center">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={profile?.imageUrl || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-4 items-end w-full">
            <input
              className="w-full outline-none py-2 border-b-2 bg-none bg-transparent focus:border-b-gray-800 focus:dark:border-b-[#c59f60] placeholder:dark:text-[#c59f60]"
              placeholder="Đánh giá..."
            />
            <div className="flex justify-between w-full">
              <Rating
                style={{ maxWidth: 240 }}
                value={rating}
                itemStyles={myStyles}
                onChange={setRating}
              />
              <Button
                className="text-base font-bold px-8 py-6 rounded-tl-2xl rounded-br-2xl dark:bg-[#db924b] dark:text-[#211308] dark:hover:opacity-70"
                onClick={handleSubmit}
              >
                GỬI
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-y-6 my-10">
        {data.length > 0 &&
          data.map((item) => (
            <div key={item.id} className="flex gap-4 items-center">
              <Avatar>
                <AvatarImage
                  src={item.user.imageUrl || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-y-2">
                <div className="flex gap-x-2 items-start">
                  <div className="font-bold">
                    {item.user.name || "Khách hàng"}
                  </div>
                  <div className="font-light text-sm">
                    {formatDistanceToNow(parseISO(item.createdAt), {
                      locale: vi,
                    })}{" "}
                    trước
                  </div>
                </div>
                <div>{item.content}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Reviews;
