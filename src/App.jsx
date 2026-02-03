import React, { useState, useRef, Suspense, useMemo, useEffect } from 'react';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { QrCode, Wallet, Home, Check, ArrowRight, ExternalLink, Smartphone, Store, FileText, History, Camera } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera } from '@react-three/drei';
import TermsPage from './components/TermsPage';
import '@solana/wallet-adapter-react-ui/styles.css';

// Detect mobile devices
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// 3D Coin Component
function CoinModel() {
  const { scene } = useGLTF('/models/coin_animation.glb');
  const meshRef = useRef();

  React.useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.set(Math.PI / 2, Math.PI / 2, 0);
      
      const animate = () => {
        if (meshRef.current) {
          meshRef.current.rotation.z += 0.03;
        }
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, []);

  return <primitive ref={meshRef} object={scene} scale={2} position={[0, 0, 0]} />;
}

// Custom Connect Button with Mobile Support
function ConnectButton() {
  const { connected, publicKey } = useWallet();

  if (isMobile && !connected) {
    return (
      <button
        onClick={() => {
          const dappUrl = window.location.href;
          const url = `https://phantom.app/ul/browse/${encodeURIComponent(dappUrl)}?ref=${encodeURIComponent(dappUrl)}`;
          window.location.href = url;
        }}
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm md:text-base hover:from-purple-700 hover:to-blue-700 transition-colors"
      >
        Open in Phantom
      </button>
    );
  }

  return <WalletMultiButton className="!bg-gradient-to-r !from-purple-600 !to-blue-600 !text-sm md:!text-base" />;
}

// Main App Component
function K11PaymentApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const audioRef = useRef(null);
  
  const { publicKey, connected, sendTransaction } = useWallet();
  const connection = new Connection('https://api.devnet.solana.com');

  useEffect(() => {
    const saved = localStorage.getItem('k11_transactions');
    if (saved) {
      setTransactions(JSON.parse(saved));
    }
  }, []);

  const saveTransaction = (tx) => {
    const updated = [tx, ...transactions].slice(0, 50);
    setTransactions(updated);
    localStorage.setItem('k11_transactions', JSON.stringify(updated));
  };

  const generateQRCode = (amount) => {
    if (!amount || !publicKey) return;
    
    const qrData = JSON.stringify({
      recipient: publicKey.toString(),
      amount: parseFloat(amount),
      token: 'K11',
      timestamp: Date.now()
    });
    setQrCodeData(qrData);
  };

  const processPayment = async () => {
    if (!connected || !publicKey || !paymentAmount) {
      alert('Please connect wallet and enter amount');
      return;
    }

    try {
      setProcessing(true);

      const recipient = recipientAddress || publicKey;
      
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(recipient),
          lamports: parseFloat(paymentAmount) * LAMPORTS_PER_SOL / 1000,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      
      setTransactionSuccess(true);
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      }

      connection.confirmTransaction(signature, 'confirmed').then(() => {
        saveTransaction({
          signature,
          amount: paymentAmount,
          recipient: recipient.toString(),
          timestamp: new Date().toISOString(),
          status: 'confirmed'
        });
      }).catch(err => {
        console.log('Confirmation error:', err);
      });

      setTimeout(() => {
        setTransactionSuccess(false);
        setPaymentAmount('');
        setRecipientAddress('');
        setQrCodeData('');
        setProcessing(false);
      }, 5000);

    } catch (error) {
      console.error('Transaction failed:', error);
      if (error.message.includes('User rejected')) {
        alert('Transaction cancelled');
      } else {
        alert('Transaction failed: ' + error.message);
      }
      setProcessing(false);
    }
  };

  const simulateQRScan = () => {
    setScannerActive(true);
    setTimeout(() => {
      const mockData = JSON.stringify({
        recipient: publicKey?.toString() || 'DemoAddress123',
        amount: 10,
        token: 'K11',
        timestamp: Date.now()
      });
      const parsed = JSON.parse(mockData);
      setRecipientAddress(parsed.recipient);
      setPaymentAmount(parsed.amount.toString());
      setScannerActive(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {transactionSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl text-center max-w-md w-full">
            <div className="bg-green-100 w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-16 h-16 md:w-20 md:h-20 text-green-600" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">K11 Sent!</h3>
            <p className="text-lg md:text-xl text-gray-600 mb-4">Transaction Successful</p>
            
            <div className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-4">
              <Canvas>
                <Suspense fallback={null}>
                  <PerspectiveCamera makeDefault position={[0, 0, 6]} />
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[5, 5, 5]} intensity={1.5} />
                  <directionalLight position={[-5, -5, -5]} intensity={0.5} />
                  <pointLight position={[0, 0, 10]} intensity={0.8} />
                  <CoinModel />
                </Suspense>
              </Canvas>
            </div>
            
            <p className="text-gray-500 mt-4 text-lg font-semibold">Amount: {paymentAmount} K11</p>
          </div>
        </div>
      )}

      <audio ref={audioRef}>
        <source src="/sounds/success-chime.mp3" type="audio/mpeg" />
      </audio>

      {/* Mobile Helper Banner */}
      {isMobile && !connected && (
        <div className="bg-purple-600 text-white p-3 text-center text-sm">
          📱 For best experience, open this site in the Phantom app browser
        </div>
      )}

      <nav className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Wallet className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                K11 Pay
              </span>
            </div>
            
            <div className="flex gap-2 items-center flex-wrap">
              <button
                onClick={() => setCurrentPage('home')}
                className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                  currentPage === 'home' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Home className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage('vendor')}
                className={`px-3 py-2 rounded-lg font-semibold transition-colors text-sm md:text-base ${
                  currentPage === 'vendor' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Vendor
              </button>
              <button
                onClick={() => setCurrentPage('purchaser')}
                className={`px-3 py-2 rounded-lg font-semibold transition-colors text-sm md:text-base ${
                  currentPage === 'purchaser' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Purchaser
              </button>
              <button
                onClick={() => setCurrentPage('history')}
                className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                  currentPage === 'history' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <History className="w-5 h-5" />
              </button>
              <ConnectButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {currentPage === 'home' && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full mb-4">
                <Wallet className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">K11 Intelligent Payment Service</h2>
              <p className="text-lg md:text-xl text-gray-600 mb-8">Fast, secure cryptocurrency payments on Solana</p>
            </div>

            {isMobile && !connected && (
              <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-lg">
                <p className="text-sm text-blue-800 mb-3">
                  <strong>📱 Mobile Users:</strong> For the best experience:
                </p>
                <ol className="text-sm text-blue-700 space-y-2 ml-4 list-decimal">
                  <li>Install the Phantom app if you haven't already</li>
                  <li>Open Phantom and tap the browser icon</li>
                  <li>Navigate to this page within Phantom's browser</li>
                  <li>Your wallet will connect automatically</li>
                </ol>
                <button
                  onClick={() => window.open('https://phantom.app/download', '_blank')}
                  className="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Download Phantom App
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setCurrentPage('vendor')}
                className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-purple-200"
              >
                <Store className="w-12 h-12 md:w-16 md:h-16 text-purple-600 mb-4 mx-auto" />
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Vendor Portal</h3>
                <p className="text-gray-600">Accept K11 payments with QR codes</p>
                <ArrowRight className="w-6 h-6 text-purple-600 mx-auto mt-4" />
              </button>

              <button
                onClick={() => setCurrentPage('purchaser')}
                className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-blue-200"
              >
                <Smartphone className="w-12 h-12 md:w-16 md:h-16 text-blue-600 mb-4 mx-auto" />
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Purchaser Portal</h3>
                <p className="text-gray-600">Send K11 payments quickly & securely</p>
                <ArrowRight className="w-6 h-6 text-blue-600 mx-auto mt-4" />
              </button>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 md:p-8 rounded-xl text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-4">Purchase K11 Tokens</h3>
              <p className="mb-6">Get K11 tokens directly through our partners</p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => window.open('https://phantom.app', '_blank')}
                  className="bg-white text-purple-600 px-4 md:px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  Buy via Phantom
                </button>
                <button 
                  onClick={() => window.open('https://www.orca.so', '_blank')}
                  className="bg-white text-blue-600 px-4 md:px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  Buy via Orca
                </button>
              </div>
            </div>

          </div>
        )}

        {currentPage === 'vendor' && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Store className="w-8 h-8 text-purple-600" />
              Vendor Portal
            </h2>

            {!connected ? (
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg text-center">
                <Wallet className="w-16 h-16 md:w-20 md:h-20 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl md:text-2xl font-bold mb-4">Connect Your Wallet</h3>
               {isMobile ? (
  <button
    onClick={() =>
      window.location.href = `https://phantom.app/ul/browse/${encodeURIComponent("https://k11-payment-app.vercel.app")}`
    }
    className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors mb-6"
  >
    Open in Phantom
  </button>
) : (
  <p className="text-gray-600 mb-6">
    Click 'Select Wallet' above to connect and make payments
  </p>
)}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-green-50 border-2 border-green-200 p-4 rounded-lg">
                  <p className="text-green-800 font-semibold break-all">✓ Wallet Connected: {publicKey.toString().substring(0, 20)}...</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold mb-4">Generate Payment QR Code</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Payment Amount (K11)
                      </label>
                      <input
                        type="number"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter amount"
                        step="0.01"
                      />
                    </div>
                    <button
                      onClick={() => generateQRCode(paymentAmount)}
                      disabled={!paymentAmount}
                      className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Generate QR Code
                    </button>
                  </div>
                </div>

                {qrCodeData && (
                  <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg text-center">
                    <h3 className="text-xl font-bold mb-4">Scan to Pay</h3>
                    <div className="bg-gray-100 p-6 md:p-8 rounded-lg inline-block mb-4">
                      <QRCodeSVG 
                        value={qrCodeData} 
                        size={Math.min(256, window.innerWidth - 100)}
                        level="H"
                        includeMargin={true}
                      />
                      <p className="text-sm text-gray-600 mt-4">QR Code Generated</p>
                      <p className="text-xl md:text-2xl font-bold text-purple-600 mt-2">{paymentAmount} K11</p>
                    </div>
                    <p className="text-gray-600">Have your customer scan this code with their K11 app</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {currentPage === 'purchaser' && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Smartphone className="w-8 h-8 text-blue-600" />
              Purchaser Portal
            </h2>

            {!connected ? (
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg text-center">
                <Wallet className="w-16 h-16 md:w-20 md:h-20 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl md:text-2xl font-bold mb-4">Connect Your Wallet</h3>
                {isMobile ? (
  <button
    onClick={() =>
      window.location.href = `https://phantom.app/ul/browse/${encodeURIComponent("https://k11-payment-app.vercel.app")}`
    }
    className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors mb-6"
  >
    Open in Phantom
  </button>
) : (
  <p className="text-gray-600 mb-6">
    Click 'Select Wallet' above to connect and make payments
  </p>
)}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-green-50 border-2 border-green-200 p-4 rounded-lg">
                  <p className="text-green-800 font-semibold break-all">✓ Wallet Connected: {publicKey.toString().substring(0, 20)}...</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold mb-4">Scan Vendor QR Code</h3>
                  
                  {scannerActive ? (
                    <div className="bg-gray-900 p-12 rounded-lg text-center mb-4">
                      <Camera className="w-20 h-20 text-white mx-auto mb-4 animate-pulse" />
                      <p className="text-white">Scanning...</p>
                    </div>
                  ) : (
                    <button
                      onClick={simulateQRScan}
                      className="w-full bg-blue-50 border-2 border-dashed border-blue-300 p-12 rounded-lg text-center mb-4 hover:bg-blue-100 transition-colors"
                    >
                      <QrCode className="w-20 h-20 text-blue-600 mx-auto mb-4" />
                      <p className="text-gray-600">Tap to scan QR code</p>
                      <p className="text-sm text-gray-500 mt-2">(Demo: Auto-fills payment)</p>
                    </button>
                  )}
                  
                  <div className="border-t-2 pt-4">
                    <p className="text-sm text-gray-600 mb-3">Or enter payment details manually:</p>
                    <input
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                      placeholder="Amount (K11)"
                      step="0.01"
                    />
                    <button
                      onClick={processPayment}
                      disabled={!paymentAmount || processing}
                      className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {processing ? 'Processing...' : 'Send Payment'}
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-xl text-white">
                  <h3 className="text-lg font-bold mb-2">Need K11 Tokens?</h3>
                  <p className="mb-4 text-sm">Purchase K11 directly from our partners</p>
                  <div className="flex gap-3 flex-wrap">
                    <button 
                      onClick={() => window.open('https://phantom.app', '_blank')}
                      className="flex-1 bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm flex items-center justify-center gap-2 min-w-[120px]"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Phantom
                    </button>
                    <button 
                      onClick={() => window.open('https://www.orca.so', '_blank')}
                      className="flex-1 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm flex items-center justify-center gap-2 min-w-[120px]"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Orca
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {currentPage === 'history' && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
              <History className="w-8 h-8 text-indigo-600" />
              Transaction History
            </h2>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              {transactions.length === 0 ? (
                <div className="text-center py-12">
                  <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No transactions yet</p>
                  <p className="text-sm text-gray-400 mt-2">Your transaction history will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {transactions.map((tx, index) => (
                    <div key={index} className="border-2 border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div className="flex-1">
                          <p className="font-bold text-lg">{tx.amount} K11</p>
                          <p className="text-sm text-gray-600 break-all">To: {tx.recipient.substring(0, 20)}...</p>
                          <p className="text-xs text-gray-400 mt-1">{new Date(tx.timestamp).toLocaleString()}</p>
                        </div>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                          {tx.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-2 break-all">Signature: {tx.signature}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {currentPage === 'terms' && (
          <TermsPage acceptedTerms={acceptedTerms} setAcceptedTerms={setAcceptedTerms} />
        )}
      </main>

      <footer className="bg-white mt-12 py-6 border-t">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center text-gray-600">
          <p className="mb-2 text-sm md:text-base">© 2026 K11 Intelligent Payment Service. Powered by Solana.</p>
          <button
            onClick={() => setCurrentPage('terms')}
            className="text-blue-600 hover:text-blue-800 underline text-sm"
          >
            Terms & Conditions
          </button>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = 'https://api.devnet.solana.com';
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <K11PaymentApp />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}