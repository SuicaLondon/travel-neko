"use client";
export default function PlanError({ error }: { error: Error }) {
  return <div>Error: {error.message}</div>;
}
