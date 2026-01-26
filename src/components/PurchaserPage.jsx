import React from 'react';
import { Smartphone, Wallet, QrCode, ExternalLink } from 'lucide-react';

export default function PurchaserPage({ 
  connected, 
  publicKey, 
  paymentAmount, 
  setPaymentAmount, 
  processPayment 
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
        <Smartphone className="w-8 h-8 text-blue-600" />
        Purchaser Portal
      </h2>

      {!connected ? (
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <Wallet className="w-20 h-20 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Connect Your Wallet</h3>
          <p className="text-gray-600 mb-6">
            Click "Select Wallet" in the top right to connect your Phantom wallet and make payments
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-green-50 border-2 border-green-200 p-4 rounded-lg">
            <p className="text-green-800 font-semibold">
              ✓ Wallet Connected: {publicKey.toString().substring(0, 20)}...
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">Scan Vendor QR Code</h3>
            <div className="bg-blue-50 border-2 border-dashed border-blue-300 p-12 rounded-lg text-center mb-4">
              <QrCode className="w-20 h-20 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Tap to scan QR code</p>
              <p className="text-sm text-gray-500 mt-2">(Camera access required)</p>
            </div>
            
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
                disabled={!paymentAmount}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Send Payment
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-xl text-white">
            <h3 className="text-lg font-bold mb-2">Need K11 Tokens?</h3>
            <p className="mb-4 text-sm">Purchase K11 directly from our partners</p>
            <div className="flex gap-3">
              <button 
                onClick={() => window.open('https://phantom.app', '_blank')}
                className="flex-1 bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Phantom
              </button>
              <button 
                onClick={() => window.open('https://www.orca.so', '_blank')}
                className="flex-1 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Orca
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}