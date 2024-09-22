import React from "react";

export default function PlanListPlaceholder() {
  return (
    <div className="flex flex-col gap-4">
      {new Array(10).fill(null).map((item, index) => (
        <div className="bg-placeholder flex h-80 w-full flex-col" key={index}>
          <span className="bg-placeholder block w-full flex-1" />
        </div>
      ))}
    </div>
  );
}
