"use client";

import { z } from "zod";
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
import CustomInput from "@/components/CustomInput";
import { authFormSchema } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Loader2, LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";

const AuthForm = ({ type }) => {
  const session = useSession();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (session?.status === "authenticated") {
      if (session.data.user.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/");
      };
    };
  }, [session, router]);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      
      if (type === "sign-up") {
        const response = await fetch("/api/register", {
          method: "POST",
          body: JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            email: data.email,
            password: data.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          console.log("User created");
          toast.success("Account created successfully!");
          router.push("/auth/sign-in");
        }
      }

      if (type === "sign-in") {
        setIsLoading(true);

        const response = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (response.error) {
          toast.error("Invalid credentials!");
        }

        if (response.ok) {
          toast.success("Logged in successfully!");
          const userResponse = await fetch("/api/auth/session");
          const userData = await userResponse.json();

          if (userData.user.role === "admin") {
            router.replace("/admin")
          } else {
            router.replace("/");
          };
        }
      }

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {type === "sign-up" && (
            <>
              <CustomInput
                control={form.control}
                name="firstName"
                label="First Name"
                placeholder="Enter first name"
              />

              <CustomInput
                control={form.control}
                name="lastName"
                label="Last Name"
                placeholder="Enter last name"
              />

              <CustomInput
                control={form.control}
                name="phone"
                label="Phone Number"
                placeholder="Enter phone number"
              />
            </>
          )}

          <CustomInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter email"
          />

          <CustomInput
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter password"
          />

          <div className="text-right -mt-8">
            <Link href={'/auth/forgot-password'} className="text-orange-600 text-xs">Forgot password?</Link>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="animation bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/80"
            >
              {isLoading ? (
                <LoaderIcon size={17} className="animate-spin text-white" />
              ) : type === "sign-in" ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <div className="flex justify-center gap-1 mt-10">
        <p className="text-xs font-normal text-gray-500">
          {type === "sign-in"
            ? "Don't have an account?"
            : "Already have an account?"}
        </p>
        <Link
          className="animation text-xs font-semibold cursor-pointer hover:underline"
          href={type === "sign-in" ? "/auth/sign-up" : "/auth/sign-in"}
        >
          {type === "sign-in" ? "Sign Up" : "Sign In"}
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
