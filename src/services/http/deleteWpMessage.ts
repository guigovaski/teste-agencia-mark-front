import { axiosInstance } from "@/config/axios.config"

export const deleteWpMessage = async (id: number) => {
  const response = await axiosInstance.delete(`/whatsapp/${id}`);
  return response.data;
}