import { create } from "zustand";
import { toast } from "sonner";
import {
  monitorService,
  IMonitor,
  CreateMonitorData,
  UpdateMonitorData
} from "@/lib/monitor";

interface MonitorState {
  monitors: IMonitor[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
  initialize: () => Promise<void>;
  setMonitors: (monitors: IMonitor[]) => void;
  getMonitors: () => Promise<void>;
  getMonitor: (id: string) => Promise<IMonitor | null>;
  addMonitor: (monitor: CreateMonitorData) => Promise<boolean>;
  updateMonitor: (id: string, monitor: UpdateMonitorData) => Promise<boolean>;
  removeMonitor: (id: string) => Promise<boolean>;
  setError: (error: string | null) => void;
}

export const useMonitorStore = create<MonitorState>((set, get) => ({
  monitors: [],
  loading: false,
  error: null,

  initialized: false,

  initialize: async () => {
    set({ loading: true, error: null });
    if (get().initialized) return;

    await get().getMonitors();

    console.log("Monitor store initialized");

    set({ initialized: true, loading: false });
  },

  setMonitors: (monitors) => set({ monitors }),

  getMonitors: async () => {
    set({ loading: true, error: null });
    const result = await monitorService.getMonitors();

    if (result.success) {
      set({ monitors: result.data || [], loading: false });
    } else {
      set({
        error: result.error || "Failed to fetch monitors",
        loading: false
      });
      toast.error(result.error || "Failed to fetch monitors");
    }
  },

  getMonitor: async (id: string) => {
    set({ loading: true, error: null });
    const result = await monitorService.getMonitor(id);

    if (result.success) {
      set({ loading: false });
      return result.data;
    } else {
      set({ error: result.error || "Failed to fetch monitor", loading: false });
      toast.error(result.error || "Failed to fetch monitor");
      return null;
    }
  },

  addMonitor: async (monitorData: CreateMonitorData) => {
    set({ loading: true, error: null });
    const result = await monitorService.createMonitor(monitorData);

    if (result.success) {
      set((state) => ({
        monitors: [...state.monitors, result.data],
        loading: false
      }));
      toast.success("Monitor created successfully");
      return true;
    } else {
      set({
        error: result.error || "Failed to create monitor",
        loading: false
      });
      toast.error(result.error || "Failed to create monitor");
      return false;
    }
  },

  updateMonitor: async (id: string, monitorData: UpdateMonitorData) => {
    set({ loading: true, error: null });
    const result = await monitorService.updateMonitor(id, monitorData);

    if (result.success) {
      set((state) => ({
        monitors: state.monitors.map((monitor) =>
          monitor.id === id ? { ...monitor, ...result.data } : monitor
        ),
        loading: false
      }));
      toast.success("Monitor updated successfully");
      return true;
    } else {
      set({
        error: result.error || "Failed to update monitor",
        loading: false
      });
      toast.error(result.error || "Failed to update monitor");
      return false;
    }
  },

  removeMonitor: async (id: string) => {
    set({ loading: true, error: null });
    const result = await monitorService.deleteMonitor(id);

    if (result.success) {
      set((state) => ({
        monitors: state.monitors.filter((monitor) => monitor.id !== id),
        loading: false
      }));
      toast.success("Monitor deleted successfully");
      return true;
    } else {
      set({
        error: result.error || "Failed to delete monitor",
        loading: false
      });
      toast.error(result.error || "Failed to delete monitor");
      return false;
    }
  },

  setError: (error) => set({ error })
}));
