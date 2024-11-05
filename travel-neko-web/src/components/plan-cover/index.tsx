import React, { memo } from "react";

type PlanCoverProps = {
  coverImage?: string;
  title: string;
  onClick?: () => void;
};

export const PlanCover = memo(function PlanCover({
  coverImage,
  title,
  onClick,
}: PlanCoverProps) {
  return (
    <div
      className="relative max-h-96 max-w-full overflow-clip"
      onClick={onClick}
    >
      {coverImage && (
        <img
          className="flex w-full items-center justify-center"
          src={coverImage}
          alt="Uploaded Image"
        />
      )}
      <h1 className="absolute left-4 top-4 text-6xl font-bold text-outline-black">
        {title}
      </h1>
    </div>
  );
});
