import axiosClient from "./axios";

export interface MonitorResult {
  success?: boolean;
  message?: string;
  data?: any;
  error?: string;
}

export interface IMonitor {
  id: string;
  name: string;
  url: string;
  type: "HTTP" | "PING";
  interval: number;
  lastCheck?: Date;
  averageResponseTime?: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
  checks?: [
    {
      id: string;
      status: "UP" | "DOWN" | "PENDING";
      createdAt: Date;
      updatedAt: Date;
      timestamp: Date;
      statusCode: number | null;
      responseTime: number | null;
      monitorId: string;
    }
  ];
}

export interface CreateMonitorData {
  name: string;
  url: string;
  type: "HTTP" | "PING";
  interval: number;
}

export interface UpdateMonitorData {
  name?: string;
  url?: string;
  type?: "HTTP" | "PING";
  interval?: number;
}

export const monitorService = {
  // Get all monitors for the authenticated user
  getMonitors: async (): Promise<MonitorResult> => {
    try {
      const response = await axiosClient.get("/api/monitors");

      console.log("Fetched monitors:", response.data);

      return {
        success: true,
        message: "Monitors fetched successfully",
        data: response.data.data
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Failed to fetch monitors",
        error: error.response?.data?.message || error.message
      };
    }
  },

  // Get a single monitor by ID
  getMonitor: async (id: string): Promise<MonitorResult> => {
    try {
      const response = await axiosClient.get(`/api/monitors/${id}`);
      return {
        success: true,
        message: "Monitor fetched successfully",
        data: response.data.data
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Failed to fetch monitor",
        error: error.response?.data?.message || error.message
      };
    }
  },

  // Create a new monitor
  createMonitor: async (
    monitorData: CreateMonitorData
  ): Promise<MonitorResult> => {
    try {
      const response = await axiosClient.post("/api/monitors", monitorData);
      return {
        success: true,
        message: "Monitor created successfully",
        data: response.data.data
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Failed to create monitor",
        error: error.response?.data?.message || error.message
      };
    }
  },

  // Update a monitor
  updateMonitor: async (
    id: string,
    monitorData: UpdateMonitorData
  ): Promise<MonitorResult> => {
    try {
      const response = await axiosClient.put(
        `/api/monitors/${id}`,
        monitorData
      );
      return {
        success: true,
        message: "Monitor updated successfully",
        data: response.data.data
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Failed to update monitor",
        error: error.response?.data?.message || error.message
      };
    }
  },

  // Delete a monitor
  deleteMonitor: async (id: string): Promise<MonitorResult> => {
    try {
      await axiosClient.delete(`/api/monitors/${id}`);
      return {
        success: true,
        message: "Monitor deleted successfully"
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Failed to delete monitor",
        error: error.response?.data?.message || error.message
      };
    }
  }
};
