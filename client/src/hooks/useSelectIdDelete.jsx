import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AxiosInstance from "../Api/AxiosInstance";
export const useDeleteSelectedId = (type= "") => {
  return useMutation({
    mutationFn: async (selectedIds) => {
      const res = await AxiosInstance.delete(`/${type}/deleteMany`, {
        data: selectedIds,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Selected items deleted!");
    },
    onError: (err) => {
        console.log(err);
        
      toast.error(err.response?.data?.message || "Unable to delete");
    },
  });
};