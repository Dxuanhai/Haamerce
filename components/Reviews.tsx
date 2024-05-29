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
import axios from "axios";
import { toast } from "react-hot-toast";

interface Props {
  productId: string;
}

const myStyles = {
  itemShapes: ThinStar,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#fbf1a9",
};

const Reviews = ({ productId }: Props) => {
  const { user } = useUser();
  const [profile, setProfile] = useState<any>(null);
  const [averageRating, setAverageRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [reviewData, setReviewData] = useState<Review[]>([]);
  const [hasReviewed, setHasReviewed] = useState(false);
  const URL = `${process.env.NEXT_PUBLIC_API_URL}`;

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/reviews?productId=${productId}`
        );
        if (res.data) {
          setReviewData(res.data);
          if (res.data.length > 0) {
            const totalRating = res.data.reduce(
              //@ts-ignore
              (sum, review) => sum + review.rating,
              0
            );
            const avgRating = totalRating / res.data.length;
            setAverageRating(avgRating);
          }
        }
      } catch (error) {
        console.error("Error fetching review data:", error);
      }
    };

    fetchReviewData();
  }, [productId]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (user?.id) {
          const res = await axios.get(
            `${URL}/purchased?userId=${user.id}&productId=${productId}`
          );
          if (res.data) {
            setProfile(res.data);
            const userReview = reviewData.find(
              (review) => review.user.userId === user.id
            );
            if (userReview) {
              setHasReviewed(true);
            }
          }
        }
      } catch (error) {
        console.log("🚀  / fetchProfile  / error:", error);
      }
    };
    fetchProfile();
  }, [reviewData, user, URL, productId]);

  const handleSubmit = async () => {
    if (!content || rating === 0) {
      toast.error("Bạn phải nhập nội dung và đánh giá.");
      return;
    }

    try {
      const res = await axios.post(`${URL}/reviews`, {
        content,
        userId: user?.id,
        productId,
        rating,
      });

      if (res.status === 200) {
        console.log("Review submitted successfully:", res.data);
        setContent(""); // Clear the input field after submission
        setRating(0); // Reset the rating after submission
        setHasReviewed(true); // Prevent further reviews
        window.location.reload(); // Reload the page to update the reviews list
      } else {
        console.error("Error submitting review:", res);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
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
        <p className="mt-2"> ({reviewData.length}) đánh giá</p>
      </div>
      {profile?.productId === productId && !hasReviewed && (
        <div className="py-6 flex gap-4 items-center">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={profile?.user?.imageUrl || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-4 items-end w-full">
            <input
              className="w-full outline-none py-2 border-b-2 bg-none bg-transparent focus:border-b-gray-800 focus:dark:border-b-[#c59f60] placeholder:dark:text-[#c59f60]"
              placeholder="Đánh giá..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
                onKeyDown={handleKeyDown}
              >
                GỬI
              </Button>
            </div>
          </div>
        </div>
      )}
      {profile?.productId !== productId && (
        <div role="alert" className="alert alert-warning my-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Mua hàng để đánh giá!</span>
        </div>
      )}
      <div className="flex flex-col gap-y-6 my-10">
        {reviewData.length > 0 &&
          reviewData.map((item) => (
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
                    {item.user.name !== "null null"
                      ? item.user.name
                      : "Khách hàng"}
                  </div>
                  <div className="font-light text-sm">
                    {formatDistanceToNow(parseISO(item.createdAt), {
                      locale: vi,
                    })}{" "}
                    trước
                  </div>
                </div>
                <Rating
                  value={item.rating}
                  readOnly
                  style={{ maxWidth: 120 }}
                />
                <div>{item.content}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Reviews;
