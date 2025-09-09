"use client";

import EmptyMonitorState from "@/components/empty-monitor-state";
import Loader from "@/components/Loader";
import MonitorCard from "@/components/monitor-card";
import NewMonitorDialog from "@/components/new-monitor-dialog";
import { useMonitorStore } from "@/store/monitor.store";

import React, { useEffect } from "react";

const MonitorsPage = () => {
  const { monitors, initialize, initialized, loading } = useMonitorStore();

  useEffect(() => {
    initialize();
  }, [initialize, initialized]);

  if (loading) {
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
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <div className="">
          <h1 className="text-2xl font-bold">Monitors</h1>
          <p className="text-muted-foreground">
            You have {monitors.length} monitor{monitors.length > 1 ? "s" : ""}.
          </p>
        </div>
        <NewMonitorDialog />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {monitors.map((monitor) => (
          <MonitorCard key={monitor.id} {...monitor} />
        ))}
      </div>
    </div>
  );
};

export default MonitorsPage;
