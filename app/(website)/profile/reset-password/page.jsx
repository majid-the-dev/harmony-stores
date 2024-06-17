"use client";

import ProfileNavigation from "@/components/ProfileNavigation";
import Link from "next/link";
import { LiaAngleRightSolid } from "react-icons/lia";
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
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";

// Form validation schema
const formSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters long"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // Field to display the error message
});

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/sign-in");
    }
  }, [status, router]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/reset-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
          newPassword: values.newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }

      toast.success('Password updated successfully!');
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update password');
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
          <div className="flex items-center gap-3 text-xs py-12">
            <Link href={"/"} className="text-black font-medium">Home</Link>
            <LiaAngleRightSolid />
            <Link href={"/profile"} className="text-black font-medium">Profile</Link>
            <LiaAngleRightSolid />
            <p className="text-gray-400">Password Reset</p>
          </div>

          <div className="mt-2 mb-24">
            <div className="grid grid-cols-4 gap-10">
              <div className="col-span-4 md:col-span-1">
                <ProfileNavigation />
              </div>
              <div className="col-span-4 md:col-span-3">
                <h1 className="text-2xl font-semibold">Reset Password</h1>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                    <div className="space-y-5 py-5">
                      <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem className="w-full max-w-3xl">
                            <FormLabel className="text-xs text-gray-500 font-normal">New Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                className="bg-white font-semibold px-3 py-6 focus:border focus:border-default"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs font-normal" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem className="w-full max-w-3xl">
                            <FormLabel className="text-xs text-gray-500 font-normal">Confirm New Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                className="bg-white font-semibold px-3 py-6 focus:border focus:border-default"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs font-normal" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full max-w-3xl flex items-center md:justify-end">
                      <Button
                        type="button"
                        className="bg-transparent text-red-600 text-xs font-normal px-7 py-7 mt-5 hover:bg-transparent order-1 md:-order-1"
                        onClick={() => router.push("/profile")}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="gradient-bg text-white text-sm px-7 py-6 mt-5 hover:bg-black/80"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <LoaderIcon size={20} className="animate-spin text-white" />
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
