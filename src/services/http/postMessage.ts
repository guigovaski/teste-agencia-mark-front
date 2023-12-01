import { axiosInstance } from "@/config/axios.config";

type PostMessage = {
  subject: string;
  author: string;
  receiver: string;
  authorPhoneNumber: string;
  receiverPhoneNumber: string;
  message: string;
  eventId: number;
}

export const postMessage = async (data: PostMessage) => {
  const response = await axiosInstance.post("/messages", data);
  return response.data;
}