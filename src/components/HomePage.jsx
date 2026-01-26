import React from 'react';
import { Wallet, ArrowRight, ExternalLink, Smartphone, Store } from 'lucide-react';

export default function HomePage({ setCurrentPage }) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full mb-4">
          <Wallet className="w-16 h-16 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">K11 Intelligent Payment Service</h2>
        <p className="text-xl text-gray-600 mb-8">Fast, secure cryptocurrency payments on Solana</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => setCurrentPage('vendor')}
          className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-purple-200"
        >
          <Store className="w-16 h-16 text-purple-600 mb-4 mx-auto" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Vendor Portal</h3>
          <p className="text-gray-600">Accept K11 payments with QR codes</p>
          <ArrowRight className="w-6 h-6 text-purple-600 mx-auto mt-4" />
        </button>

        <button
          onClick={() => setCurrentPage('purchaser')}
          className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-blue-200"
        >
          <Smartphone className="w-16 h-16 text-blue-600 mb-4 mx-auto" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Purchaser Portal</h3>
          <p className="text-gray-600">Send K11 payments quickly & securely</p>
          <ArrowRight className="w-6 h-6 text-blue-600 mx-auto mt-4" />
        </button>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 rounded-xl text-white">
        <h3 className="text-2xl font-bold mb-4">Purchase K11 Tokens</h3>
        <p className="mb-6">Get K11 tokens directly through our partners</p>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => window.open('https://phantom.app', '_blank')}
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <ExternalLink className="w-5 h-5" />
            Buy via Phantom
          </button>
          <button 
            onClick={() => window.open('https://www.orca.so', '_blank')}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <ExternalLink className="w-5 h-5" />
            Buy via Orca
          </button>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => setCurrentPage('terms')}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          View Terms & Conditions
        </button>
      </div>
    </div>
  );
}