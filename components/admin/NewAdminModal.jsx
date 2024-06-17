"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { LoaderIcon } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  phone: z.string().min(8),
  email: z.string().email(),
  password: z.string().min(8),
});

const NewAdminModal = ({ onAdminAdded }) => {
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("admin");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admins", {
        method: "POST",
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          email: values.email,
          password: values.password,
          role,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Admin added successfully!");
        setIsModal(false);
        form.reset();
        if (onAdminAdded) {
          onAdminAdded();
        }
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModal(true)}
        className="animation bg-black text-white text-xs flex items-center gap-2 rounded-lg px-4 py-3 hover:opacity-80"
      >
        <span>
          <AiOutlinePlusCircle className="text-[16px]" />
        </span>
        Add Admin
      </button>

      {isModal && (
        <div
          onClick={() => {
            setIsModal(false);
            form.reset();
          }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-lg rounded-lg p-7"
          >
            <h1 className="text-[18px] font-medium">New Admin</h1>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 mt-8"
              >
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-gray-500 font-normal">
                        First Name&nbsp;
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="text-sm font-medium" />
                      </FormControl>
                      <FormMessage className="text-xs font-normal" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-gray-500 font-normal">
                        Last Name&nbsp;
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="text-sm font-medium" />
                      </FormControl>
                      <FormMessage className="text-xs font-normal" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-gray-500 font-normal">
                        Phone&nbsp;
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="text-sm font-medium" />
                      </FormControl>
                      <FormMessage className="text-xs font-normal" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-gray-500 font-normal">
                        Email&nbsp;
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="text-sm font-medium" />
                      </FormControl>
                      <FormMessage className="text-xs font-normal" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-gray-500 font-normal">
                        Password&nbsp;
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="text-sm font-medium" />
                      </FormControl>
                      <FormMessage className="text-xs font-normal" />
                    </FormItem>
                  )}
                />

                <div className="w-full flex flex-col gap-3">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-black hover:bg-black/80 py-6 mt-5 disabled:bg-black/80"
                  >
                    {isLoading ? (
                      <LoaderIcon
                        size={17}
                        className="animate-spin text-white"
                      />
                    ) : (
                      <span className="flex items-center gap-2">
                        <AiOutlinePlusCircle className="text-[16px]" />
                        Add Admin
                      </span>
                    )}
                  </Button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModal(false);
                      form.reset();
                    }}
                    className="text-xs text-red-600 mt-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewAdminModal;
