import prisma from "../prisma";
import { asyncHandler } from "../lib/error";
import type { Monitor, Check } from "@prisma/client";

async function runChecks() {
  const monitors: Monitor[] = await prisma.monitor.findMany();

  for (const monitor of monitors) {
    if (monitor.type === "PING") {
      await runPingCheck(monitor);
    } else if (monitor.type === "HTTP") {
      await runHttpCheck(monitor);
    }
  }
}

async function runPingCheck(monitor: Monitor) {}

async function runHttpCheck(monitor: Monitor) {}

export const checkService = {
  runChecks,
  runPingCheck,
  runHttpCheck
};
