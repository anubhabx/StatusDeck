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
import { Badge, badgeVariants } from "@workspace/ui/components/badge";
import {
  ChevronDownCircleIcon,
  ChevronUpCircleIcon,
  Link2Icon,
  ActivityIcon,
  TimerIcon
} from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { formatSeconds } from "@/lib/utils";

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

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex flex-col space-y-1">
          <CardTitle>{cleanedData.name}</CardTitle>
          <CardDescription>
            <Link2Icon className="inline mr-2" size={14} />
            {cleanedData.url}
          </CardDescription>
        </div>
        {cleanedData.status === "UP" && (
          <Badge variant={"default"}>
            <>
              <ChevronUpCircleIcon className="inline mr-1 text-green-300" />
              <span className="text-green-300">{cleanedData.status}</span>
            </>
          </Badge>
        )}
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <ActivityIcon className="inline mr-2 w-4 h-4" />
            <span>{cleanedData.type}</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <TimerIcon className="inline mr-2 w-4 h-4" />
            <span>Every {formatSeconds(cleanedData.interval)}</span>
          </div>
        </div>

        
      </CardContent>
    </Card>
  );
};

export default MonitorCard;
