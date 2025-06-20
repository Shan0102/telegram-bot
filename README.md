# test_telegram_bot

A simple Telegram bot built with Node.js, TypeScript, and [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api).

## Features

-   Responds to commands and callbacks
-   Generates random passwords
-   Modular code structure for easy maintenance

## Project Structure

```
src/
  index.ts                # Entry point
  controllers/
    callbacks.ts          # Handles callback queries
    commands.ts           # Handles bot commands
  data/
    storage.ts            # In-memory storage
  functions/
    randomPassword.ts     # Password generation logic
  services/
    botService.ts         # Bot initialization and helpers
  types/
    types.ts              # TypeScript types
```

## Getting Started

### Prerequisites

-   Node.js (v18+ recommended)
-   Telegram bot token from official bot ([BotFather](https://t.me/botfather))

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Shan0102/telegram-bot
    cd test_telegram_bot
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory:
    ```
    TELEGRAM_TOKEN="your-telegram-bot-token"
    ```

### Build and Run

-   Build the TypeScript code:

    ```bash
    npm run build
    ```

-   Start the bot:

    ```bash
    npm start
    ```

-   For development with auto-reload:
    ```bash
    npm run dev
    ```

## Deployment

-   Deploy to Railway, Heroku, or any Node.js hosting.
-   Make sure your `.env` file is set up with your bot token.

## Security

-   Never share your bot token publicly.
-   `.env` is in `.gitignore` by default.

## License

ISC
