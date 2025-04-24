# LinkLayer CashApp Style Complete App

This repository contains the full implementation of the LinkLayer cashapp-style crypto wallet with:

- WalletConnect integration (UI stub)
- QR code modal for your wallet address
- Live LLR → USD price fetch (via CoinGecko)
- Virtual-card top-up flow
- Validator leaderboard UI
- Redeem/spend flow

## 🚀 Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/YOUR_USERNAME/linklayergo.git
   cd linklayergo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start Expo:
   ```bash
   npx expo start
   ```

## 🔧 Features

- **Load Virtual Card**: Top-Up interface with LLR amount input and USD conversion.
- **QR Modal**: Tap the QR icon to open your wallet address QR code.
- **WalletConnect Button**: UI placeholder to connect your wallet.
- **Validator Leaderboard**: List of validators with stake/unstake actions.
- **Redeem Flow**: Generate a spend code for in-store use.
