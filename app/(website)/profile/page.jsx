"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LiaAngleRightSolid } from "react-icons/lia";
import { FaAngleRight } from "react-icons/fa6";
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
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { states } from "@/public/data";
import ProfileNavigation from "@/components/ProfileNavigation";
import { useSession } from "next-auth/react";
import { LoaderIcon } from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().min(5),
  billingAddress: z.string().optional(),
  city: z.string().optional(),
  state: z.string().nullable(),
});

const Page = () => {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const { user } = session || {};

  const [isLoading, setIsLoading] = useState(false);

  console.log(user);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      billingAddress: "",
      city: "",
      state: null,
    },
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/sign-in");
    }

    if (status === "authenticated" && user) {
      form.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        billingAddress: user.billingAddress || "",
        city: user.city || "",
        state: user.state || null,
      });
    }
  }, [status, user, router, form]);

  const onSubmit = async (values) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      // const updatedUser = {
      //   ...session,
      //   user: {
      //     ...session?.user,
      //     email: values.email
      //   }
      // };

      await update();

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {status === "loading" ? (
        <LoadingScreen />
      ) : (
        <div className="px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 text-black text-xs py-12">
            <Link href={"/"} className="text-black font-medium">
              Home
            </Link>
            <LiaAngleRightSolid />
            <p className="text-gray-500">Profile</p>
          </div>

          <div className="mt-2 mb-24">
            <div className="grid grid-cols-4 gap-10">
              <div className="col-span-4 md:col-span-1">
                <ProfileNavigation />
              </div>
              <div className="col-span-4 md:col-span-3">
                <h1 className="text-2xl font-semibold">Account Information</h1>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 mt-3 md:mt-6"
                  >
                    <div className="space-y-5 py-5">
                      <div className="w-full max-w-3xl flex flex-col md:flex-row items-center gap-5 md:gap-10">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel className="text-xs text-gray-500 font-normal">
                                First Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="bg-white font-semibold px-3 py-6 focus:border focus:border-default"
                                  placeholder=""
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs font-normal" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel className="text-xs text-gray-500 font-normal">
                                Last Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="bg-white font-semibold px-3 py-6 focus:border focus:border-default"
                                  placeholder=""
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs font-normal" />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="w-full max-w-3xl flex flex-col md:flex-row items-center gap-5 md:gap-10">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel className="text-xs text-gray-500 font-normal">
                                Email
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="bg-white font-semibold px-3 py-6 focus:border focus:border-default"
                                  placeholder=""
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs font-normal" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel className="text-xs text-gray-500 font-normal">
                                Phone Number
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="bg-white font-semibold px-3 py-6 focus:border focus:border-default"
                                  placeholder=""
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs font-normal" />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="billingAddress"
                        render={({ field }) => (
                          <FormItem className="w-full max-w-3xl">
                            <FormLabel className="text-xs text-gray-500 font-normal">
                              Street Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="bg-white font-semibold px-3 py-6 focus:border focus:border-default"
                                placeholder=""
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs font-normal" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem className="w-full max-w-3xl">
                            <FormLabel className="text-xs text-gray-500 font-normal">
                              City
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="bg-white font-semibold px-3 py-6 focus:border focus:border-default"
                                placeholder=""
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs font-normal" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem className="w-full max-w-3xl">
                            <FormLabel className="text-xs text-gray-500 font-normal">
                              State/Region
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="bg-white font-semibold px-3 py-6 focus:border focus:border-default"
                            >
                              <FormControl>
                                <SelectTrigger className="bg-white font-semibold px-3 py-6 focus:border focus:border-default">
                                  <SelectValue
                                    placeholder="Select a parent category"
                                    className="text-gray-500"
                                  />
                                </SelectTrigger>
                              </FormControl>
                              {states?.length > 0 && (
                                <SelectContent>
                                  <SelectItem value={null}>
                                    Please select a region or state
                                  </SelectItem>
                                  {states.map((state) => (
                                    <SelectItem
                                      key={state.id}
                                      value={state.name}
                                    >
                                      {state.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              )}
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full max-w-3xl flex items-center md:justify-end">
                      <Button
                        type="button"
                        className="bg-transparent text-red-600 text-xs font-normal px-7 py-7 mt-5 hover:bg-transparent order-1 md:-order-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="animation gradient-bg text-white text-sm px-7 py-6 mt-5 hover:opacity-80 disabled:opacity-80"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2 ">
                            <LoaderIcon
                              size={20}
                              className="animate-spin text-white"
                            />
                            Saving
                          </span>
                        ) : (
                          <span>Save Changes</span>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
