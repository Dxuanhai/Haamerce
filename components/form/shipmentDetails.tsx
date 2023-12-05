"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
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

const formSchema = z.object({
  fullName: z.string().min(2).max(50),
  phoneNumber: z.number().int().positive().min(10).max(10),
  email: z.string().email().min(10),
  district: z.string().min(1),
  province: z.string().min(1),
  town: z.string().min(1),
  address: z.string().min(1),
});

function ShipmentDetails() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
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
                <FormLabel className="font-bold">Full Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Enter your full name"
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
                    <FormLabel className="font-bold">Phone Number</FormLabel>
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
                <FormLabel className="font-bold">Address</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled={loading}
                    placeholder="Enter your address"
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
                  <FormLabel className="font-bold">Province</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a Province"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))} */}
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
                  <FormLabel className="font-bold">District</FormLabel>
                  <Select
                    disabled={loading}
                    //onValueChange={onSelect(field)}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select your district"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* {colors?.map((color) => (
                      <SelectItem
                        key={color.id}
                        value={color.id}
                        className="block"
                      >
                        <div className=" flex items-center justify-start gap-x-2 ">
                          <div
                            style={{ backgroundColor: color.value }}
                            className="h-6 w-10 rounded-full border  "
                          ></div>
                          <h3>{color.name}</h3>
                        </div>
                      </SelectItem>
                    ))} */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="town"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="font-bold">Town</FormLabel>
                  <Select
                    disabled={loading}
                    //onValueChange={onSelect(field)}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select your Town"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* {colors?.map((color) => (
                      <SelectItem
                        key={color.id}
                        value={color.id}
                        className="block"
                      >
                        <div className=" flex items-center justify-start gap-x-2 ">
                          <div
                            style={{ backgroundColor: color.value }}
                            className="h-6 w-10 rounded-full border  "
                          ></div>
                          <h3>{color.name}</h3>
                        </div>
                      </SelectItem>
                    ))} */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={loading}
            className="ml-auto mt-4 text-base "
            type="submit"
            variant="default"
          >
            Pay right now
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ShipmentDetails;
