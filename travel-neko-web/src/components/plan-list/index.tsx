import { ITravelPlan } from "@/models/plan-model";
import Link from "next/link";

export function PlanListComponent({ planList }: { planList?: ITravelPlan[] }) {
  if (planList === undefined) {
    return <div>Loading</div>;
  }
  return (
    <>
      {planList?.map((plan) => {
        return (
          <Link
            key={plan.id}
            href={`/plans/${plan.id}`}
            className="cursor-pointer"
          >
            <div className="relative max-h-80 w-full overflow-clip rounded-2xl">
              <h1 className="absolute bottom-4 left-4 text-6xl font-bold text-outline-black">
                {plan.title}
              </h1>
              {plan.coverImage && (
                <img
                  className="flex max-h-80 w-full items-center justify-center"
                  src={plan.coverImage}
                  alt="Uploaded Image"
                />
              )}
            </div>
          </Link>
        );
      })}
    </>
  );
}
