import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAccessories = () => {
  return useQuery({
    queryKey: ["accessories"],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/accessories`);
        return response?.data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });
};
