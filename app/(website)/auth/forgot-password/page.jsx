"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email(),
});

const Page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values) => {};

  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <p className="text-gray-500 text-xs font-medium mb-1">ENTER YOUR EMAIL</p>
      <h1 className="text-lg md:text-2xl font-semibold">Reset Password</h1>
      <div className="h-1.5 w-9 gradient-bg rounded-full mt-1"></div>
      <div className="mt-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <div className="flex flex-col gap-1.5">
                  <FormLabel className="text-xs text-gray-500 font-normal">
                    Email
                  </FormLabel>
                  <div className="flex w-full flex-col">
                    <FormControl>
                      <Input
                        placeholder="Enter email"
                        className="animation bg-white font-semibold px-3 py-6 focus:border focus:border-default placeholder:text-gray-400 placeholder:font-medium"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[12px] text-red-500 mt-2" />
                  </div>
                </div>
              )}
            />
            <Button
                type="submit"
                className="animation w-full bg-black text-white text-sm font-semibold rounded-lg hover:bg-black/80"
            >
                Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default Page;
