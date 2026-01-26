import React from 'react';
import { FileText } from 'lucide-react';

export default function TermsPage({ acceptedTerms, setAcceptedTerms }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <FileText className="w-8 h-8 text-gray-600" />
        Legal & Compliance Documents
      </h2>
      
      <div className="space-y-6 text-gray-700 max-h-[600px] overflow-y-auto pr-4">
        <p className="text-sm text-gray-500 italic">Last updated: January 23, 2026</p>
        
        <p className="text-sm">
          These documents are drafted specifically for <strong>K11</strong>, a non-custodial Solana-based payment application, 
          and are structured to support future Google Play Store adoption while minimizing regulatory and compliance risk.
        </p>

        {/* TERMS OF SERVICE */}
        <section className="border-t-2 pt-6">
          <h3 className="text-2xl font-bold mb-4 text-purple-600">1. TERMS OF SERVICE (TOS)</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-bold mb-2">1.1 Acceptance of Terms</h4>
              <p>
                By accessing or using the K11 application ("K11", "the App"), you agree to be bound by these Terms of Service ("Terms"). 
                If you do not agree, you must not use the App.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-2">1.2 Nature of the Service</h4>
              <p className="mb-2">
                K11 is a <strong>non-custodial software application</strong> that facilitates the display of payment requests 
                and blockchain interactions on the Solana network.
              </p>
              <p className="mb-2">K11:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Does <strong>not</strong> custody user funds</li>
                <li>Does <strong>not</strong> execute transactions on behalf of users</li>
                <li>Does <strong>not</strong> provide financial, investment, or legal advice</li>
              </ul>
              <p className="mt-2">
                All blockchain transactions are executed directly by third-party wallets (e.g., Phantom) and decentralized protocols.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-2">1.3 User Responsibilities</h4>
              <p className="mb-2">You are solely responsible for:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Your wallet security and private keys</li>
                <li>Verifying transaction details before approval</li>
                <li>Compliance with applicable laws in your jurisdiction</li>
              </ul>
              <p className="mt-2">
                K11 has <strong>no ability to reverse, modify, or recover transactions</strong>.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-2">1.4 Fees</h4>
              <p className="mb-2">
                K11 does <strong>not</strong> charge users transaction fees.
              </p>
              <p className="mb-2">Any fees incurred are imposed by:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>The Solana network</li>
                <li>Third-party wallets</li>
                <li>Decentralized exchanges or liquidity pools</li>
              </ul>
              <p className="mt-2">
                K11 may earn revenue independently through liquidity provision or advertising arrangements 
                that <strong>do not affect user transactions</strong>.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-2">1.5 Advertising & Sponsored Content</h4>
              <p className="mb-2">K11 may display clearly labeled advertisements or sponsored placements.</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Ads are informational only</li>
                <li>Ads do not trigger wallet actions</li>
                <li>K11 does not endorse advertised products</li>
              </ul>
              <p className="mt-2">Use of third-party services is at your own risk.</p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-2">1.6 Prohibited Use</h4>
              <p className="mb-2">You agree not to:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Use K11 for illegal activities</li>
                <li>Circumvent security features</li>
                <li>Misrepresent affiliation with K11</li>
                <li>Use the App to distribute malware or phishing content</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-2">1.7 Limitation of Liability</h4>
              <p className="mb-2">To the maximum extent permitted by law, K11 is not liable for:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Blockchain losses</li>
                <li>Smart contract failures</li>
                <li>Third-party service failures</li>
                <li>Market volatility</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-2">1.8 Termination</h4>
              <p>
                K11 may suspend or terminate access to the App at any time for violations of these Terms.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-2">1.9 Governing Law</h4>
              <p>
                These Terms are governed by the laws of the United Kingdom, without regard to conflict-of-law principles.
              </p>
            </div>
          </div>
        </section>

        {/* PRIVACY POLICY */}
        <section className="border-t-2 pt-6">
          <h3 className="text-2xl font-bold mb-4 text-purple-600">2. PRIVACY POLICY</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-bold mb-2">2.1 Overview</h4>
              <p className="mb-2">K11 is designed with privacy-first principles.</p>
              <p className="mb-2">We do <strong>not</strong> collect:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Names</li>
                <li>Email addresses</li>
                <li>Phone numbers</li>
                <li>Government identifiers</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-2">2.2 Data We May Process</h4>
              <p className="mb-2">The App may process:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Public wallet addresses</li>
                <li>Public blockchain transaction data</li>
                <li>Device-level anonymous analytics (optional, non-identifying)</li>
              </ul>
              <p className="mt-2">
                Wallet addresses are public blockchain identifiers and are <strong>not treated as personal data</strong>.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-2">2.3 What We Do NOT Do</h4>
              <p className="mb-2">K11 does not:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Track user behavior across apps</li>
                <li>Sell user data</li>
                <li>Use targeted or behavioral advertising</li>
                <li>Store private keys or seed phrases</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-2">2.4 Third-Party Services</h4>
              <p className="mb-2">K11 may interface with:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Wallet providers (e.g., Phantom)</li>
                <li>Blockchain RPC endpoints</li>
                <li>QR code libraries</li>
              </ul>
              <p className="mt-2">These services operate under their own privacy policies.</p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-2">2.5 Advertising Privacy</h4>
              <p className="mb-2">Advertisements shown in K11:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Are static or contextual</li>
                <li>Do not involve tracking pixels</li>
                <li>Do not involve cookies</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-2">2.6 Data Security</h4>
              <p>
                Reasonable technical measures are used to protect the App, but no system is fully secure.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-2">2.7 Children's Privacy</h4>
              <p>K11 is not intended for users under the age of 18.</p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-2">2.8 Changes to Policy</h4>
              <p>
                This Privacy Policy may be updated. Continued use of the App constitutes acceptance of changes.
              </p>
            </div>
          </div>
        </section>

        {/* ADVERTISING POLICY */}
        <section className="border-t-2 pt-6">
          <h3 className="text-2xl font-bold mb-4 text-purple-600">3. ADVERTISING & SPONSORED CONTENT POLICY</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-bold mb-2">3.1 Advertising Philosophy</h4>
              <p>
                K11 prioritizes user trust and transaction clarity. Advertising must never interfere with 
                wallet actions or payment flows.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-2">3.2 Permitted Advertising</h4>
              <p className="mb-2">Allowed:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Static banners</li>
                <li>Sponsored branding</li>
                <li>Informational partner placements</li>
              </ul>
              <p className="mt-2">All ads must be clearly labeled: <em>"Sponsored"</em> or <em>"Advertisement"</em></p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-2">3.3 Prohibited Advertising</h4>
              <p className="mb-2">Not allowed:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Gambling or betting services</li>
                <li>Unregistered securities</li>
                <li>Yield guarantees or profit claims</li>
                <li>Wallet impersonation</li>
                <li>Ads requesting signatures or approvals</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-2">3.4 Placement Rules</h4>
              <p className="mb-2">Ads may appear:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Below primary UI elements</li>
                <li>After QR generation</li>
                <li>In footer sections</li>
              </ul>
              <p className="mt-2 mb-2">Ads may NOT:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Overlay buttons</li>
                <li>Appear near wallet approval prompts</li>
                <li>Mimic system UI or warnings</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-2">3.5 Advertiser Responsibility</h4>
              <p className="mb-2">
                Advertisers are solely responsible for compliance with applicable laws.
              </p>
              <p>
                K11 reserves the right to reject or remove any advertisement at its discretion.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-2">3.6 No Endorsement Disclaimer</h4>
              <p>
                Placement of advertising does not imply endorsement, approval, or verification by K11.
              </p>
            </div>
          </div>
        </section>

        {/* COMPLIANCE NOTES */}
        <section className="border-t-2 pt-6 bg-green-50 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-3 text-green-800">Play Store Compliance</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-600">✔</span>
              <span>Non-custodial</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✔</span>
              <span>No in-app payments</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✔</span>
              <span>No gambling mechanics</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✔</span>
              <span>No deceptive ads</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✔</span>
              <span>Clear disclaimers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✔</span>
              <span>No financial promises</span>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-6 flex items-start gap-3 bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
        <input
          type="checkbox"
          id="acceptTerms"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          className="mt-1 w-5 h-5 cursor-pointer"
        />
        <label htmlFor="acceptTerms" className="text-sm text-gray-700 cursor-pointer">
          I have read and agree to the <strong>Terms of Service</strong>, <strong>Privacy Policy</strong>, 
          and <strong>Advertising & Sponsored Content Policy</strong>
        </label>
      </div>
    </div>
  );
}