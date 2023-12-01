import { axiosInstance } from "@/config/axios.config";
import { EventType } from "@/@types/EventType";

export const getEvents = async () => {
  const response = await axiosInstance.get("/events");
  return response.data as EventType[];
}