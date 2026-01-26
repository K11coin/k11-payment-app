import React from 'react';
import { Store, Wallet } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function VendorPage({ 
  connected, 
  publicKey, 
  paymentAmount, 
  setPaymentAmount, 
  qrCodeData, 
  generateQRCode 
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
        <Store className="w-8 h-8 text-purple-600" />
        Vendor Portal
      </h2>

      {!connected ? (
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <Wallet className="w-20 h-20 text-purple-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Connect Your Wallet</h3>
          <p className="text-gray-600 mb-6">
            Click "Select Wallet" in the top right to connect your Phantom wallet and start accepting payments
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
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <h3 className="text-xl font-bold mb-4">Scan to Pay</h3>
              <div className="bg-gray-100 p-8 rounded-lg inline-block mb-4">
                <QRCodeSVG 
                  value={qrCodeData} 
                  size={256}
                  level="H"
                  includeMargin={true}
                />
                <p className="text-sm text-gray-600 mt-4">QR Code Generated</p>
                <p className="text-2xl font-bold text-purple-600 mt-2">{paymentAmount} K11</p>
              </div>
              <p className="text-gray-600">Have your customer scan this code with their K11 app</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}