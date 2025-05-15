import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "../Api/AxiosInstance";

const fetchExpenses = async () => {
  const response = await AxiosInstance.get('/expenses');  
  return response.data?.expenses || [];
};
const fetchGoals = async () => {
  const response = await AxiosInstance.get('/goals');  
  return response.data?.goals || [];
};

export const useExpenses = () => {
  return useQuery({
    queryKey: ['fetchExpenses'],
    queryFn: fetchExpenses
  });  
};
export const useGoals = () => {
  return useQuery({
    queryKey: ['fetchGoals'],
    queryFn: fetchGoals
  });  
};

