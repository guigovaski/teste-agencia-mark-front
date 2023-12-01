import { axiosInstance } from "@/config/axios.config"

export const deleteEvent = async (id: number) => {
  const response = await axiosInstance.delete(`/events/${id}`);
  return response.data;
}