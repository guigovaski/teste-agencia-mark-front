import { axiosInstance } from "@/config/axios.config"

export const postEvent = async (name: string, description: string, date: string) => {
  const response = await axiosInstance.post("/events", { name, description, date: new Date(date) });
  return response.data;
}