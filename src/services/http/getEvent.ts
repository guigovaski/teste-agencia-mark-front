import { axiosInstance } from "@/config/axios.config";
import { EventType } from "@/@types/EventType";

export const getEvent = async (eventId: number) => {
  const response = await axiosInstance.get(`/events/${eventId}`);
  return response.data as EventType;
}