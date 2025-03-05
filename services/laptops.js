import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetLaptops = () => {
  return useQuery({
    queryKey: ["laptops"],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/laptops`);
        return response?.data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });
};
