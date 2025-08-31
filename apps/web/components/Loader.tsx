import React from "react";
import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center gap-2 text-sm">
      <Loader2 className="animate-spin w-4 h-4" />
      Loading
    </div>
  );
};

export default Loader;
