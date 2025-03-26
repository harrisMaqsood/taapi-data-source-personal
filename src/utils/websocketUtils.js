const WebSocket = require("ws");

function createWebSocketConnection(symbols, saveCandleData) {
  const streams = symbols.map((symbol) => `${symbol}@kline_1m`).join("/");
  const ws = new WebSocket(
    `wss://stream.binance.com:9443/stream?streams=${streams}`
  );

  ws.on("open", () => {
    console.log(
      `WebSocket connection established for ${symbols.length} symbols`
    );
  });

  ws.on("message", async (data) => {
    try {
      const message = JSON.parse(data);
      if (message.data && message.data.k.x) {
        const { s: symbol, k: kline } = message.data;

        await saveCandleData(symbol, kline);

        console.log("------------------------");
        console.log(`Symbol: ${symbol}`);
        console.log(`Time: ${new Date(kline.t).toISOString()}`);
        console.log(`Open: ${kline.o}`);
        console.log(`High: ${kline.h}`);
        console.log(`Low: ${kline.l}`);
        console.log(`Close: ${kline.c}`);
        console.log(`Volume: ${kline.v}`);
        console.log("------------------------");
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });

  ws.on("close", () => {
    console.log(
      `WebSocket connection closed for ${symbols.length} symbols. Reconnecting...`
    );
    setTimeout(() => createWebSocketConnection(symbols, saveCandleData), 5000);
  });

  return ws;
}

module.exports = {
  createWebSocketConnection,
};
