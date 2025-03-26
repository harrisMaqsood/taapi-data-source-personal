const WebSocket = require("ws");
const fetch = require("node-fetch");
const { saveCandleData } = require("../controllers/websocketController");
const { createWebSocketConnection } = require("../utils/websocketUtils");

let wsConnections = [];

async function getAllSpotSymbols() {
  try {
    const response = await fetch("https://api.binance.com/api/v3/exchangeInfo");
    const data = await response.json();
    return data.symbols
      .filter(
        (symbol) => symbol.status === "TRADING" && symbol.isSpotTradingAllowed
      )
      .map((symbol) => symbol.symbol.toLowerCase());
  } catch (error) {
    console.error("Error fetching symbols:", error);
    return [];
  }
}

async function connectWebSocket() {
  const symbols = await getAllSpotSymbols();
  const BATCH_SIZE = 100;

  wsConnections.forEach((ws) => ws.close());
  wsConnections = [];

  for (let i = 0; i < symbols.length; i += BATCH_SIZE) {
    const batch = symbols.slice(i, i + BATCH_SIZE);
    const ws = createWebSocketConnection(batch, saveCandleData);
    wsConnections.push(ws);

    if (i + BATCH_SIZE < symbols.length) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

function cleanup() {
  wsConnections.forEach((ws) => ws.close());
}

module.exports = {
  connectWebSocket,
  cleanup,
};
