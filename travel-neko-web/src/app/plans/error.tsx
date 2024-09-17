"use client";
export default function PlansError({ error }: { error: Error }) {
  return <div>Error: {error.message}</div>;
}
