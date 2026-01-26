import React, { useState } from 'react';
import { QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function QRPage() {
  const [qrText, setQrText] = useState('');
  const [generatedQR, setGeneratedQR] = useState('');

  const handleGenerate = () => {
    if (qrText) {
      setGeneratedQR(qrText);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <QrCode className="w-8 h-8 text-indigo-600" />
        QR Code Generator
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Enter text or URL to generate QR code
          </label>
          <input
            type="text"
            value={qrText}
            onChange={(e) => setQrText(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="e.g., https://k11pay.com or payment details"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={!qrText}
          className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Generate QR Code
        </button>

        {generatedQR && (
          <div className="text-center">
            <div className="bg-gray-100 p-8 rounded-lg inline-block">
              <QRCodeSVG 
                value={generatedQR} 
                size={256}
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="text-gray-600 mt-4">Scan this QR code with any QR reader</p>
          </div>
        )}
      </div>

      <div className="mt-8 bg-indigo-50 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-2">About QR Codes</h3>
        <p className="text-gray-700 text-sm">
          QR codes can store various types of data including URLs, text, contact information, and payment details. 
          In the K11 Payment Service, QR codes are used to facilitate quick and secure cryptocurrency transactions 
          by encoding payment information that can be scanned by mobile devices.
        </p>
      </div>
    </div>
  );
}