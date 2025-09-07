"use client";

import EmptyMonitorState from "@/components/empty-monitor-state";
import Loader from "@/components/Loader";
import MonitorCard from "@/components/monitor-card";
import axiosClient from "@/lib/axios";
import { useMonitorStore } from "@/store/monitor.store";
import { Button } from "@workspace/ui/components/button";

import React, { useEffect } from "react";

const MonitorsPage = () => {
  const { monitors, initialize, initialized, loading } = useMonitorStore();

  useEffect(() => {
    initialize();
  }, [initialize, initialized]);

  if (!!loading) {
    return <Loader />;
  }

  if (monitors.length === 0) {
    return (
      <>
        <EmptyMonitorState />
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {monitors.map((monitor) => (
        <MonitorCard key={monitor.id} {...monitor} />
      ))}
    </div>
  );
};

export default MonitorsPage;
