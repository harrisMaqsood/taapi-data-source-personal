# Binance Candles Microservice

A microservice built with Express.js for handling Binance candles data.

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- PostgreSQL (if running locally)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env` and update the values
   - For local development, update DATABASE_URL to point to your local PostgreSQL instance

## Database Setup

1. Start the services:

   ```bash
   docker-compose up -d
   ```

2. Generate Prisma client:

   ```bash
   npm run prisma:generate
   ```

3. Run database migrations:

   ```bash
   npm run prisma:migrate
   ```

4. (Optional) Open Prisma Studio to view/edit data:
   ```bash
   npm run prisma:studio
   ```

## Development

To run the server locally:

```bash
npm run dev
```

## Docker Setup

To run the service using Docker:

```bash
docker-compose up --build
```

To stop the service:

```bash
docker-compose down
```

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /candles` - Get latest candles (limited to 10)

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `DATABASE_URL` - PostgreSQL connection string

## Database Schema

The service uses Prisma with PostgreSQL and includes the following model:

### Candle

- `id`: Auto-incrementing primary key
- `symbol`: Trading pair symbol
- `interval`: Time interval
- `openTime`: Candle open timestamp
- `open`: Opening price
- `high`: Highest price
- `low`: Lowest price
- `close`: Closing price
- `volume`: Trading volume
- `createdAt`: Record creation timestamp
- `updatedAt`: Record update timestamp
