import React from "react";

export default function PlanListPlaceholder() {
  return (
    <div className="flex flex-col gap-4">
      {new Array(10).fill(null).map((item, index) => (
        <div
          className="flex h-80 w-full max-w-96 flex-col space-y-2"
          key={index}
        >
          <span className="bg-placeholder block h-10 w-full"></span>
          <span className="bg-placeholder block w-full flex-1"></span>
        </div>
      ))}
    </div>
  );
}
