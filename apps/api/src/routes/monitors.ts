import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const monitors = new Hono();

// Example: Get all monitors for the authenticated user
// Note: You will need to add authentication middleware to get the userId
monitors.get("/", async (c) => {
  // const userId = c.get('userId'); // from auth middleware
  // const userMonitors = await prisma.monitor.findMany({ where: { userId } });
  // return c.json(userMonitors);
  return c.text("GET /monitors");
});

// Example: Create a new monitor
monitors.post("/", async (c) => {
  // const userId = c.get('userId');
  // const { name, url } = await c.req.json();
  // const newMonitor = await prisma.monitor.create({
  //   data: { name, url, userId },
  // });
  // return c.json(newMonitor, 201);
  return c.text("POST /monitors");
});

export default monitors;
