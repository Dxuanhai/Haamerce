"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { District, Provinces, Ward } from "@/types";
import toast from "react-hot-toast";
import useCart from "@/hooks/use-cart";
import useUserInfo from "@/hooks/use-userInfo";
import useVoucher from "@/hooks/use-voucher";

const formSchema = z.object({
  fullName: z.string().min(2).max(50),
  phoneNumber: z.string().min(10).max(10),
  email: z.string().email().min(10),
  address: z.string().min(1),
  ward: z.string().optional(),
  district: z.string().optional(),
  province: z.string().optional(),
});

interface Props {
  provinces: Provinces[];
}

function ShipmentDetails({ provinces }: Props) {
  const cart = useCart();
  const userInfo = useUserInfo();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [provinceName, setProvinceName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardName, setWardName] = useState("");
  const [districts, setDistricts] = useState<District[]>();
  const [wards, setWards] = useState<Ward[]>();

  const totalItemOrder = cart.items.map((item) => {
    return {
      name: item.name,
      color: item.color,
      price: (item.price - item.discount) * item.quantity,
      size: item.size,
      quantity: item.quantity,
    };
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: userInfo.userInfo.fullName || "",
      address: userInfo.userInfo.address || "",

      email: userInfo.userInfo.email || "",
      phoneNumber: userInfo.userInfo.phoneNumber || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      userInfo.add({
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        email: values.email,
        address: values.address,
        ward: wardName,
        district: districtName,
        province: provinceName,
      });
      form.reset();
      router.push("/checkout/method");
    } catch (error) {
      toast.error("Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  }
  const onSelectProvince = (field: any) => async (value: string) => {
    const province_select = provinces.filter(
      (item) => item.province_id === value
    );
    if (province_select.length > 0)
      setProvinceName(province_select[0]?.province_name);
    try {
      if (value) {
        setLoading(true);
        const url = `https://vapi.vnappmob.com/api/province/district/${value}`;
        const res = await axios.get(url);
        if (res?.data) {
          setDistricts(res.data.results);
        }
      }
    } catch (error: any) {
      console.log("🚀  / onSelectProvince  / error:", error);
      toast.error("Đã xảy ra lỗi.");
    } finally {
      setLoading(false);
    }
  };
  const onSelectDistrict = (field: any) => async (data: string) => {
    const district_select =
      districts && districts.filter((item) => item.district_id === data);
    if (district_select && district_select.length > 0) {
      setDistrictName(district_select[0]?.district_name);
    }
    try {
      setLoading(true);

      const res = await axios.get(
        `https://vapi.vnappmob.com/api/province/ward/${data}`
      );

      if (res?.data) {
        setWards(res.data.results);
      }
    } catch (error: any) {
      toast.error("Đã xảy ra lỗi.");
    } finally {
      field.onChange();
      setLoading(false);
    }
  };
  const onSelectWard = (field: any) => async (data: string) => {
    const selectWardName =
      wards && wards.filter((item) => item.ward_id === data);
    if (selectWardName && selectWardName.length > 0) {
      setWardName(selectWardName[0]?.ward_name);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full "
      >
        <div className="flex flex-col gap-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Họ và tên</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Nhập họ và tên của bạn"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-12 ">
            <div className="col-start-1 col-end-7">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={loading}
                        placeholder="@gmaii.com"
                        {...field}
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-start-8 col-end-13">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Số điện thoại</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={loading}
                        placeholder="+ 84"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Địa chỉ</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled={loading}
                    placeholder="Địa chỉ"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-x-3">
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Thành phố/ tỉnh</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={onSelectProvince(field)}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Chọn Thành phố / tỉnh của bạn"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {provinces &&
                        provinces.length > 0 &&
                        provinces?.map((item) => (
                          <SelectItem
                            key={item.province_id}
                            value={item.province_id}
                          >
                            {item.province_name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="font-bold">Quận/ huyện</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={onSelectDistrict(field)}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Chọn Thành Quận/ huyện của bạn"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {districts &&
                        districts?.map((item) => (
                          <SelectItem
                            key={item.district_id}
                            value={item.district_id}
                            className="block"
                          >
                            {item.district_name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ward"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="font-bold">Thị xã</FormLabel>
                  <Select
                    disabled={loading}
                    value={field.value}
                    onValueChange={onSelectWard(field)}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="chọn thị xã của bạn"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {wards &&
                        wards.length > 0 &&
                        wards?.map((item) => (
                          <SelectItem
                            key={item.ward_id}
                            value={item.ward_id}
                            className="block"
                          >
                            {item.ward_name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={loading}
            className="ml-auto mt-4 text-base font-bold dark:bg-[#db924b] dark:text-[#211308] py-6 hover:opacity-70 "
            type="submit"
            variant="default"
          >
            Chọn phương thức thanh toán
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ShipmentDetails;
