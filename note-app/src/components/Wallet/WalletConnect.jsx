/* eslint-disable react-hooks/purity */
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Wallet, Send, X } from 'lucide-react';

const WalletConnect = ({ onClose }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletType, setWalletType] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('0.00');
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendForm, setSendForm] = useState({ address: '', amount: '' });

  const walletProviders = [
    { name: 'Nami', color: '#35D07F' },
    { name: 'Eternl', color: '#5C6AC4' },
    { name: 'Flint', color: '#FF6B6B' },
    { name: 'Yoroi', color: '#1B4965' },
  ];

  // Load saved wallet from localStorage
  useEffect(() => {
    const savedWallet = localStorage.getItem('wallet');
    if (savedWallet) {
      const wallet = JSON.parse(savedWallet);
      setIsConnected(wallet.isConnected);
      setWalletType(wallet.walletType);
      setWalletAddress(wallet.walletAddress);
      setBalance(wallet.balance || '1,234.56');
    }
  }, []);

  // Connect to wallet (mock)
  const handleConnect = (provider) => {
    const mockAddress = `addr1${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    const mockBalance = (Math.random() * 10000).toFixed(2);

    const walletData = {
      isConnected: true,
      walletType: provider,
      walletAddress: mockAddress,
      balance: mockBalance,
    };

    localStorage.setItem('wallet', JSON.stringify(walletData));
    setIsConnected(true);
    setWalletType(walletData.walletType);
    setWalletAddress(walletData.walletAddress);
    setBalance(walletData.balance);
  };

  const handleDisconnect = () => {
    localStorage.removeItem('wallet');
    setIsConnected(false);
    setWalletType('');
    setWalletAddress('');
    setBalance('0.00');
  };

  const handleSend = (e) => {
    e.preventDefault();
    alert(`Sending ${sendForm.amount} ADA to ${sendForm.address}`);
    setShowSendModal(false);
    setSendForm({ address: '', amount: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 p-5">
      <div className="max-w-3xl mx-auto mb-5">
        <button
          onClick={onClose}
          className="backdrop-blur bg-white/20 border border-white/30 text-white px-5 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/30 hover:-translate-x-1 transition-transform"
        >
          <ArrowLeft size={20} />
          Back to Notes
        </button>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-10 shadow-2xl">
          <div className="text-center mb-8">
            <Wallet size={32} className="mx-auto text-indigo-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Cardano Wallet</h1>
          </div>

          {!isConnected ? (
            <div className="animate-fadeIn">
              <p className="text-center text-gray-500 mb-8">Choose a wallet provider to connect</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {walletProviders.map((provider) => (
                  <button
                    key={provider.name}
                    onClick={() => handleConnect(provider.name)}
                    className="flex flex-col items-center gap-3 border-3 border-gray-200 rounded-lg p-6 font-semibold text-gray-700 hover:-translate-y-1 hover:shadow-md transition-transform"
                    style={{ borderColor: provider.color }}
                  >
                    <div
                      className="w-16 h-16 flex items-center justify-center text-2xl rounded-lg"
                      style={{ background: provider.color }}
                    >
                      💳
                    </div>
                    <span>{provider.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-fadeIn">
              <div className="flex justify-center items-center gap-3 mb-8">
                <span className="px-4 py-2 rounded-full text-green-700 font-semibold bg-green-100">Connected</span>
                <span className="text-gray-500 font-semibold">{walletType}</span>
              </div>

              <div className="text-center p-10 mb-8 rounded-xl bg-gradient-to-br from-indigo-100/20 to-purple-100/20">
                <div className="text-gray-500 font-semibold mb-2">Total Balance</div>
                <div className="text-4xl font-bold text-gray-900 flex justify-center items-baseline gap-3">
                  {balance} <span className="text-gray-500 text-xl">ADA</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="mb-4">
                  <label className="block text-gray-500 font-semibold text-sm mb-1">Wallet Address</label>
                  <div className="bg-white border border-gray-200 rounded-md p-3 font-mono text-sm break-all">{walletAddress}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowSendModal(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-500 text-white px-5 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition"
                >
                  <Send size={20} />
                  Send ADA
                </button>
                <button
                  onClick={handleDisconnect}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-5 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Disconnect
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showSendModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5"
          onClick={() => setShowSendModal(false)}
        >
          <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Send ADA</h2>
              <button onClick={() => setShowSendModal(false)} className="p-2 rounded-lg hover:bg-gray-100 transition">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSend} className="flex flex-col gap-4">
              <div>
                <label htmlFor="recipient" className="block text-gray-500 font-semibold mb-1">
                  Recipient Address
                </label>
                <input
                  id="recipient"
                  type="text"
                  value={sendForm.address}
                  onChange={(e) => setSendForm({ ...sendForm, address: e.target.value })}
                  placeholder="Enter wallet address"
                  required
                  className="w-full border border-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label htmlFor="amount" className="block text-gray-500 font-semibold mb-1">
                  Amount (ADA)
                </label>
                <input
                  id="amount"
                  type="number"
                  value={sendForm.amount}
                  onChange={(e) => setSendForm({ ...sendForm, amount: e.target.value })}
                  placeholder="0.00"
                  step="0.000001"
                  min="0"
                  required
                  className="w-full border border-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowSendModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-600 transition"
                >
                  <Send size={20} />
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
