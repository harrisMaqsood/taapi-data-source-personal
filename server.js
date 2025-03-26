const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const candleRoutes = require("./src/routes/candleRoutes");
const { connectWebSocket, cleanup } = require("./src/services/binanceService");

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

// Routes
router.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});
app.use("/api", candleRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectWebSocket();
});

// Handle graceful shutdown
process.on("SIGINT", async () => {
  try {
    cleanup();
    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
});
