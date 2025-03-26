-- CreateTable
CREATE TABLE "Candle" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "interval" TEXT NOT NULL,
    "openTime" TIMESTAMP(3) NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Candle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Candle_symbol_interval_openTime_idx" ON "Candle"("symbol", "interval", "openTime");
