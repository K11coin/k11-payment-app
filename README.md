# K11 Intelligent Payment Service

A modern cryptocurrency payment application built on the Solana blockchain for fast, secure K11 token transactions.

## Features

- 🏪 **Vendor Portal** - Generate QR codes to accept K11 payments
- 📱 **Purchaser Portal** - Scan and send K11 payments instantly
- 🔗 **Solana Integration** - Built on the fast and efficient Solana blockchain
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 🔐 **Phantom Wallet** - Seamless wallet connection and management
- 📄 **QR Code Generator** - Custom QR code generation for payments
- 🛒 **Direct Purchase** - Buy K11 tokens via Phantom or Orca

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v16 or higher)
- npm or yarn
- A Phantom wallet browser extension

## Installation

1. Clone or download this repository
2. Navigate to the project directory:
```bash
cd k11-payment-app
```

3. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## Building for Production

Create a production build:
```bash
npm run build
```

The optimized files will be in the `build/` directory.

## Project Structure

```
k11-payment-app/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── sounds/
│   │   ├── coin-clink.mp3
│   │   └── success-tick.mp3
│   └── models/
│       └── k11-coin.glb
├── src/
│   ├── components/
│   │   ├── HomePage.jsx
│   │   ├── VendorPage.jsx
│   │   ├── PurchaserPage.jsx
│   │   ├── TermsPage.jsx
│   │   ├── QRPage.jsx
│   │   └── Navigation.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## Key Dependencies

- **React** - UI framework
- **@solana/web3.js** - Solana blockchain interaction
- **@solana/wallet-adapter-react** - Wallet integration
- **qrcode.react** - QR code generation
- **lucide-react** - Icon library
- **tailwindcss** - Styling framework
- **@react-three/fiber** - 3D rendering (for coin animation)

## Usage

### For Vendors
1. Connect your Phantom wallet
2. Enter the payment amount
3. Generate a QR code
4. Display the QR code to customers

### For Purchasers
1. Connect your Phantom wallet
2. Scan the vendor's QR code (or enter amount manually)
3. Confirm the transaction
4. Receive confirmation with sound and animation

## Adding Sound Files

Place your audio files in `public/sounds/`:
- `coin-clink.mp3` - Coin clink sound effect
- `success-tick.mp3` - Success confirmation sound

## Adding 3D Coin Model

Place your `.glb` 3D model file in `public/models/`:
- `k11-coin.glb` - Rotating K11 coin animation

## Connecting to Solana Mainnet

To switch from devnet to mainnet, update the network setting in `src/App.jsx`:

```javascript
const network = WalletAdapterNetwork.Mainnet;
```

## Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_SOLANA_NETWORK=devnet
REACT_APP_K11_TOKEN_ADDRESS=your_token_address_here
```

## Security Considerations

- Never commit private keys or wallet seeds
- Always verify transaction details before confirming
- Use environment variables for sensitive configuration
- Test thoroughly on devnet before deploying to mainnet

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.

## Support

For issues or questions:
- Email: support@k11pay.com
- Documentation: https://docs.k11pay.com

## Roadmap

- [ ] QR code scanning with device camera
- [ ] Transaction history tracking
- [ ] Multi-language support
- [ ] Push notifications
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)

---

Built with ❤️ using React and Solana