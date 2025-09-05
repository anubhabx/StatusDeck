import { create } from "zustand";
import axiosClient from "@/lib/axios";
import { toast } from "sonner";

interface IMonitor {
  id: string;
  name: string;
  url: string;
  interval: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

interface MonitorState {
  monitors: IMonitor[];
  setMonitors: (monitors: IMonitor[]) => void;
  addMonitor: (monitor: IMonitor) => void;
  updateMonitor: (monitor: IMonitor) => void;
  removeMonitor: (id: string) => void;
}

export const useMonitorStore = create<MonitorState>((set) => ({
  monitors: [],
  setMonitors: (monitors) => set({ monitors }),
  addMonitor: (monitor) => () => {
    axiosClient
      .post("/monitors", monitor)
      .then((response) => {
        set((state) => ({ monitors: [...state.monitors, response.data] }));
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Failed to create monitor"
        );
      });
  },
  updateMonitor: (updatedMonitor) =>
    set((state) => ({
      monitors: state.monitors.map((monitor) =>
        monitor.id === updatedMonitor.id ? updatedMonitor : monitor
      )
    })),
  removeMonitor: (id) =>
    set((state) => ({
      monitors: state.monitors.filter((monitor) => monitor.id !== id)
    }))
}));
