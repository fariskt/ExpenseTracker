import Axioinstance from "../Api/AxiosInstance";
import { useMutation } from "@tanstack/react-query";

export const register = async (regiserData) => {
  const res = await Axioinstance.post("/users/signup", regiserData);
  console.log(res.data);
  return res.data;
};
export const login = async (loginData) => {
    const res = await Axioinstance.post("/users/login", loginData);
    console.log(res.data);
    return res.data;
}

