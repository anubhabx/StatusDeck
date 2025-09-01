"use client";

import React from "react";
import { useAuthStore } from "../store/auth.store";

const Dashboard = () => {
  const { user } = useAuthStore();

  return <div>{user?.name}</div>;
};

export default Dashboard;
