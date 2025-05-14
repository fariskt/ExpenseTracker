import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "../Api/AxiosInstance";

const fetchExpenses = async () => {
  const response = await AxiosInstance.get('/expenses');  
  return response.data?.expenses || [];
};

export const useExpenses = () => {
  return useQuery({
    queryKey: ['fetchExpenses'],
    queryFn: fetchExpenses
  });  
};

