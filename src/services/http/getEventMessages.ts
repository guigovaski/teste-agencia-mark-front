import { EventMessages } from "@/@types/EventMessages";
import { axiosInstance } from "@/config/axios.config";

export const getEventMessages = async (eventId: number) => {
  const response = await axiosInstance.get(`/messages/events/${eventId}`);
  return response.data as EventMessages;
}