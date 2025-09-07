import React from "react";
import { IMonitor } from "@/lib/monitor";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@workspace/ui/components/card";

const MonitorCard = (monitor: IMonitor) => {
  const { name, url, type, interval, status, updatedAt } = monitor;

  const cleanedData = {
    name,
    url,
    type,
    status,
    interval,
    updatedAt: updatedAt ? new Date(updatedAt).toLocaleString() : "N/A"
  };

  return <Card>MonitorCard</Card>;
};

export default MonitorCard;
