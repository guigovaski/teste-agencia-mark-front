import { axiosInstance } from "@/config/axios.config"

export const postEvent = async (name: string) => {
  const response = await axiosInstance.post("/events", { name });
  return response.data;
}