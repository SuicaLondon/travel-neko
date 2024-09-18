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
            <div className="max-h-80 w-full max-w-96">
              <h1 className="text-4xl font-bold">{plan.title}</h1>
              {plan.coverImage && (
                <img
                  className="flex w-full items-center justify-center"
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
