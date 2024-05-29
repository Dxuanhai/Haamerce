"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import slugify from "slugify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import { Rating, ThinStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Link from "next/link";

interface PurchasedItem {
  color: string;
  createdAt: string;
  id: string;
  image: string;
  name: string;
  price: number;
  productId: string;
  quantity: number;
  size: string;
  updatedAt: string;
  userId: string;
}

interface Review {
  content: string;
  createdAt: string;
  id: string;
  productId: string;
  rating: number;
  updatedAt: string;
  userId: string;
}

const myStyles = {
  itemShapes: ThinStar,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#fbf1a9",
};

function Purchased() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const [profile, setProfile] = useState<any>();
  const [purchased, setPurchased] = useState<PurchasedItem[]>();
  const [review, setReview] = useState<Review[]>();
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageNumber = 25;
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (user?.id) {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/profiles/${user.id}?skip=${
              (currentPage - 1) * pageNumber
            }&take=${pageNumber}`
          );
          if (res.data) {
            setTotalPages(Math.ceil(res.data?._count?.purchased / pageNumber));
            setProfile(res.data);
            setPurchased(res.data.purchased);
            setReview(res.data.reviews);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.log("🚀  / fetchProfile  / error:", error);
      }
    };
    fetchProfile();
  }, [user, currentPage]);

  if (!isSignedIn) {
    router.push("/sign-in");
  }
  const hasReviewed = (productId: string) => {
    return review?.some((rev) => rev.productId === productId);
  };
  const handleSubmit = async () => {
    if (!content || rating === 0 || !selectedProductId) {
      toast.error("Bạn phải nhập nội dung, đánh giá và chọn sản phẩm.");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews`,
        {
          content,
          userId: user?.id,
          productId: selectedProductId,
          rating,
        }
      );

      if (res.status === 200) {
        console.log("Review submitted successfully:", res.data);
        setContent(""); // Clear the input field after submission
        setRating(0); // Reset the rating after submission
        setSelectedProductId(null); // Reset the selected product ID
        window?.location?.reload(); // Reload the page to update the reviews list
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Asia/Ho_Chi_Minh",
    };

    //@ts-ignore
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  const handleBackToDetails = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
      );

      if (res.status === 200) {
        router.push(
          `/category/${res.data?.category?.id}/${slugify(res.data?.name, {
            locale: "vi",
            lower: true,
          })}_${res.data?.id}.html`
        );
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="flex flex-col  lg:gap-20 py-20">
      <ul className="steps steps-vertical lg:steps-horizontal">
        <li className="step step-primary bg-slate-50 dark:bg-[#20161f] dark:text-[rgb(197,159,96)] text-[slate-800]">
          ĐẶT HÀNG
        </li>
        <li className="step step-primary">NHẬN HÀNG</li>
        <li className="step step-primary">ĐÁNH GIÁ</li>
        <li className="step">TRẢ HÀNG</li>
      </ul>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="dark:text-[#c59f60] text-[slate-800]">
              <th></th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá sản phẩm</th>
              <th>Ngày mua</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {purchased &&
              purchased.length > 0 &&
              purchased.map((item, index) => (
                <tr key={item.id}>
                  <td
                    onClick={() => handleBackToDetails(item.productId)}
                    className="cursor-pointer"
                  >
                    <Image
                      className="hover:opacity-60"
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={200}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{formatDate(item.createdAt)}</td>
                  <td>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          disabled={hasReviewed(item.productId)}
                          className={`${
                            hasReviewed(item.productId) ? "opacity-50" : ""
                          } dark:bg-[#db924b] dark:text-[#211308] dark:hover:opacity-70`}
                          onClick={() => setSelectedProductId(item.productId)}
                        >
                          {hasReviewed(item.productId)
                            ? "Đã đánh giá"
                            : "Gửi đánh giá"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Đánh giá sản phẩm</DialogTitle>
                          <DialogDescription>
                            Hãy chia sẻ đánh giá của bạn về sản phẩm này.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-4  items-end w-full">
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
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            className="text-base font-bold px-8 py-6 rounded-tl-2xl rounded-br-2xl dark:bg-[#db924b] dark:text-[#211308] dark:hover:opacity-70"
                            onClick={handleSubmit}
                            onKeyDown={handleKeyDown}
                          >
                            GỬI
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="join w-full flex justify-center">
        <button
          className="join-item btn dark:bg-[#20161f] dark:text-[#c59f60] border-none"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`join-item btn border-none  dark:bg-[#20161f] dark:text-[#c59f60] text-[slate-800]${
              page !== currentPage ? " opacity-40" : ""
            }`}
            onClick={() => handlePageChange(page)}
          >
            trang {page}
          </button>
        ))}
        <button
          className="join-item btn dark:bg-[#20161f] dark:text-[#c59f60] border-none"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
}

export default Purchased;
