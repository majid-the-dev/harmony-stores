"use client";

import { useState } from "react";
import Link from "next/link";
import { LiaAngleRightSolid } from "react-icons/lia";
import { BsTelephone } from "react-icons/bs";
import { BsEnvelope } from "react-icons/bs";
import { LuSend } from "react-icons/lu";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { FaAnglesRight } from "react-icons/fa6";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string(),
  phone: z.string(),
  message: z.string(),
});

const Page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values) => {};

  const mapHtml = `
  <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.263143207759!2d3.3558545748619135!3d6.614192722103066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9220ac7a8dd3%3A0xda1ac0f103a1d58a!2sHarmony%20Stores%20365%20NG!5e0!3m2!1sen!2sng!4v1719755999918!5m2!1sen!2sng"
          width="100%"
          height="100%"
          style={{border:0}}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
  `;

  return (
    <div>

      <div className="bg-white flex items-center gap-3 text-[11px] md:text-xs border-b border-gray-200 shadow px-4 md:px-6 py-4">
        <Link href={"/"} className="font-medium">
          Home
        </Link>
        <FaAnglesRight className="font-medium" />
        <p className="text-gray-500 font-light">Contact us</p>
      </div>

      <div
        className="w-full h-96"
        dangerouslySetInnerHTML={{ __html: mapHtml }}
      />

      <div className="h-full grid grid-cols-3 gap-6 pt-10 pb-10 md:pt-20 md:pb-20 px-4 md:px-6">
        <div className="h-full col-span-3 md:col-span-1">
          <div className="bg-white border border-gray-200/80 shadow px-4 md:px-10 pt-7 md:pt-10 pb-14">
            <div className="flex items-center gap-3">
              <p className="gradient-bg text-white text-lg font-semibold rounded-full p-2">
                <BsTelephone />
              </p>
              <span className="text-[16px] font-semibold">Call Us</span>
            </div>
            <p className="text-gray-500 text-xs leading-5 mt-4">
              You can reach us directly during our operating hours. If
              we miss your call please leave us a message and we will reach out
              to you within 1 business day.
            </p>

            <hr className="border-gray-200 my-10" />

            <div className="flex items-center gap-3">
              <p className="gradient-bg text-white text-lg font-semibold rounded-full p-2">
                <BsEnvelope />
              </p>
              <span className="text-[16px] font-semibold">Write To Us</span>
            </div>
            <p className="text-gray-500 text-xs leading-5 mt-4">
              Fill out our form and we will contact you within 24 hours.
              <br />
              Email: info@harmonystores.ng
              <br />
              Phone: +2347071793075
            </p>

            {/* <hr className="border-gray-200 my-10" /> */}

            {/* <div className="flex flex-col gap-4">
              <div className="flex items-start font-medium gap-3">
                <Image
                  src={"/assets/location-icon-2.png"}
                  height={20}
                  width={20}
                  alt="icon"
                />
                <p className="text-gray-500 text-xs leading-5">
                  HIS GRACE PLAZA, 4 FRANCIS OREMEJI STREET, OFF SIMBIAT ABIOLA
                  WAY, IKEJA, LAGOS
                </p>
              </div>
              <div className="flex items-start font-medium gap-3 mt-3">
                <Image
                  src={"/assets/phone-contact-icon.png"}
                  height={20}
                  width={20}
                  alt="icon"
                />
                <p className="text-gray-500 text-xs leading-5">
                  +2347071793075
                </p>
              </div>
            </div> */}
          </div>
        </div>

        <div className="h-full col-span-3 md:col-span-2">
          <div className="bg-white border border-gray-200/80 shadow px-4 md:px-10 pt-7 md:pt-10 pb-14">
            <h1 className="text-[16px] md:text-xl font-bold">Send us a Message</h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 mt-9"
              >
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            placeholder="Your Name"
                            className="animation font-semibold px-3 py-6 focus:border focus:border-default placeholder:text-xs placeholder:text-gray-500 placeholder:font-medium"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-normal" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            placeholder="Your Email"
                            className="animation font-semibold px-3 py-6 focus:border focus:border-default placeholder:text-xs placeholder:text-gray-500 placeholder:font-medium"
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
                        <FormControl>
                          <Input
                            placeholder="Your Phone"
                            className="animation font-semibold px-3 py-6 focus:border focus:border-default placeholder:text-xs placeholder:text-gray-500 placeholder:font-medium"
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
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Your Message"
                          className="animation min-h-52 font-semibold px-3 py-6 focus:border focus:border-default placeholder:text-xs placeholder:text-gray-500 placeholder:font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-normal" />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button className="animation bg-black flex items-center gap-2 text-xs px-5 py-4 mt-4 hover:bg-black/80">
                    Send Message
                    {/* <LuSend /> */}
                  </Button>
                </div>
              </form>
            </Form>
            <div className="flex items-center gap-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
