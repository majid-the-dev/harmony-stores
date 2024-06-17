"use client";

import { useState, useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { LoaderIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  code: z.string().min(2).max(50),
  type: z.string(),
  percentage: z.number().nullable(),
  amount: z.number().nullable(),
});

const EditCouponModal = ({ coupon, onCouponEdited, setIsEdit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [couponType, setCouponType] = useState(coupon?.type || "");
  const [initialValues, setInitialValues] = useState({
    percentage: coupon?.percentage || null,
    amount: coupon?.amount || null,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: coupon?.name || "",
      code: coupon?.code || "",
      type: coupon?.type || null,
      percentage: coupon?.percentage || null,
      amount: coupon?.amount || null,
    },
  });

  useEffect(() => {
    if (coupon?.type) {
      setCouponType(coupon.type);
    }
  }, [coupon?.type]);

  const handleTypeChange = (value) => {
    form.setValue("type", value);
    setCouponType(value);

    if (value === "percentage") {
      form.setValue("amount", null);
      form.setValue("percentage", initialValues.percentage);
    } else if (value === "amount") {
      form.setValue("percentage", null);
      form.setValue("amount", initialValues.amount);
    }
  };

  const onSubmit = async (values) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/coupons", {
        method: "PUT",
        body: JSON.stringify({
          id: coupon._id,
          name: values.name,
          code: values.code,
          type: values.type,
          percentage: values.percentage,
          amount: values.amount,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Coupon edited successfully!");
        setIsEdit(false);
        form.reset();
        if (onCouponEdited) {
          onCouponEdited();
        }
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-6">
        <div className="bg-white w-full max-w-lg rounded-lg p-7">
          <h1 className="flex items-center gap-3 text-[18px] font-semibold">
            Edit Coupon
            <Image
              src={"/assets/discount.png"}
              height={20}
              width={20}
              alt="icon"
            />
          </h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 mt-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-gray-500 font-normal">
                      Coupon Name&nbsp;
                      <span className="text-red-400">(required)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-gray-100 text-sm font-semibold rounded-lg px-3 py-3 outline-none"
                      />
                    </FormControl>
                    <FormMessage className="text-xs font-normal" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-gray-500 font-normal">
                      Coupon Code&nbsp;
                      <span className="text-red-400">(required)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-gray-100 text-sm font-semibold rounded-lg px-3 py-3 outline-none"
                      />
                    </FormControl>
                    <FormMessage className="text-xs font-normal" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-gray-500 font-normal">
                      Coupon Type{" "}
                      <span className="text-red-400">(required)</span>
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleTypeChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-100 text-sm font-semibold rounded-lg px-3 py-3 outline-none">
                          <SelectValue placeholder="Select a coupon type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={null}>Select coupon type</SelectItem>
                        <SelectItem value="percentage">
                          Percentage Discount
                        </SelectItem>
                        <SelectItem value="amount">Amount Discount</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {couponType === "percentage" && (
                <FormField
                  control={form.control}
                  name="percentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-gray-500 font-normal">
                        Percentage value&nbsp;
                        <span className="text-red-400">(required)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          className="bg-gray-100 text-sm font-semibold rounded-lg px-3 py-3 outline-none"
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-normal" />
                    </FormItem>
                  )}
                />
              )}

              {couponType === "amount" && (
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-gray-500 font-normal">
                        Amount value&nbsp;
                        <span className="text-red-400">(required)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          className="bg-gray-100 text-sm font-semibold rounded-lg px-3 py-3 outline-none"
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-normal" />
                    </FormItem>
                  )}
                />
              )}

              <div className="w-full flex flex-col gap-3">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black text-default hover:bg-black/80 mt-5 disabled:bg-black/80"
                >
                  {isLoading ? (
                    <LoaderIcon
                      size={17}
                      className="animate-spin text-default"
                    />
                  ) : (
                    <span>Save</span>
                  )}
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEdit(false);
                    form.reset();
                    setCouponType("");
                  }}
                  className="text-xs text-red-400 mt-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EditCouponModal;
