import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

const CustomInput = ({ control, name, label, placeholder }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-1.5">
          <FormLabel className="text-xs text-gray-500 font-normal">
            {label}
          </FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="animation bg-white font-semibold px-3 py-6 focus:border focus:border-default placeholder:text-gray-400 placeholder:font-medium"
                type={name === 'password' ? 'password' : 'text'}
                {...field}
              />
            </FormControl>
            <FormMessage className="text-[12px] text-red-500 mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
