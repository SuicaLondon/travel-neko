-- CreateTable
CREATE TABLE "TravelPlan" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "coverImage" TEXT,
    "mapType" TEXT NOT NULL,

    CONSTRAINT "TravelPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlansOnDay" (
    "id" TEXT NOT NULL,
    "numOfDay" INTEGER NOT NULL,
    "travelPlanId" TEXT NOT NULL,

    CONSTRAINT "PlansOnDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanSection" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "openingTime" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "shouldBook" BOOLEAN,
    "plansOnDayId" TEXT NOT NULL,

    CONSTRAINT "PlanSection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlansOnDay" ADD CONSTRAINT "PlansOnDay_travelPlanId_fkey" FOREIGN KEY ("travelPlanId") REFERENCES "TravelPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanSection" ADD CONSTRAINT "PlanSection_plansOnDayId_fkey" FOREIGN KEY ("plansOnDayId") REFERENCES "PlansOnDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
