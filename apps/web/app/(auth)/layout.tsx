import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {children}
      <img
        src="/Ellipse.svg"
        className="absolute top-0 left-0 w-full h-screen object-cover opacity-15 -z-10"
      />
    </div>
  );
};

export default AuthLayout;
