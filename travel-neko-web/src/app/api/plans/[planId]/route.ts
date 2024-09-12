import { planList } from "../plans";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const idParameter = url.searchParams.get("id");

  if (idParameter !== null) {
    const id = decodeURIComponent(idParameter);
    const plan = planList.find((plan) => plan.id === id);
    if (plan) {
      return new Response(JSON.stringify(plan), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: "Plan not found" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 404,
      });
    }
  }
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const idParameter = url.searchParams.get("id");

  if (idParameter !== null) {
    const id = decodeURIComponent(idParameter);
    const index = planList.findIndex((plan) => plan.id === id);
    if (index >= 0) {
      planList.toSpliced(index);
      return new Response(
        JSON.stringify({
          message: "Deleted success",
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 200,
        },
      );
    } else {
      return new Response(JSON.stringify({ message: "Plan not found" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 404,
      });
    }
  }
}
