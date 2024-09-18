import React from "react";

export default function PlanDetailPlaceholder() {
  return (
    <div className="flex max-w-full flex-col space-y-2 overflow-clip">
      <span className="bg-placeholder h-48 w-full" />
      {new Array(3).fill(null).map((item, index) => {
        return (
          <div className="flex flex-col space-y-2" key={index}>
            <span className="bg-placeholder h-10 w-1/2" key={index} />
            {new Array(5).fill(null).map((item, index) => {
              return (
                <span className="bg-placeholder h-10 w-full" key={index} />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
