import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Wallet, Home, QrCode } from 'lucide-react';

export default function Navigation({ currentPage, setCurrentPage }) {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              K11 Pay
            </span>
          </div>
          
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentPage === 'home' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Home className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPage('vendor')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentPage === 'vendor' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Vendor
            </button>
            <button
              onClick={() => setCurrentPage('purchaser')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentPage === 'purchaser' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Purchaser
            </button>
            <button
              onClick={() => setCurrentPage('qr')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentPage === 'qr' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <QrCode className="w-5 h-5" />
            </button>
            <WalletMultiButton className="!bg-gradient-to-r !from-purple-600 !to-blue-600" />
          </div>
        </div>
      </div>
    </nav>
  );
}