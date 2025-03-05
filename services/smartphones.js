import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetSmartPhones = () => {
    return useQuery({
        queryKey: ["smartphones"],
        queryFn: async () => {
          try {
            const response = await axios.get(`/api/smartphones`);
            return response?.data;
          } catch (error) {
            throw new Error(error);
          }
        },
      });
}