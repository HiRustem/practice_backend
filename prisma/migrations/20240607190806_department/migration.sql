-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "intern" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "mentor" TEXT NOT NULL,
    "tasks" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,
    "additional" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);
