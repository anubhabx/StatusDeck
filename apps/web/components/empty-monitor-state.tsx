import React from "react";
import NewMonitorDialog from "./new-monitor-dialog";

const EmptyMonitorState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      No monitors available. Please add a monitor.
      <NewMonitorDialog />
    </div>
  );
};

export default EmptyMonitorState;
