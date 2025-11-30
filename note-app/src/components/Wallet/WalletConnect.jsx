import React, { useState, useEffect } from 'react';
import { ArrowLeft, Wallet, Send, X } from 'lucide-react';
import './Wallet.css';

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

  const handleConnect = (provider) => {
    // eslint-disable-next-line react-hooks/purity
    const mockAddress = `addr1${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    // eslint-disable-next-line react-hooks/purity
    const mockBalance = (Math.random() * 10000).toFixed(2);

    const walletData = {
      isConnected: true,
      walletType: provider,
      walletAddress: mockAddress,
      balance: mockBalance,
    };

    localStorage.setItem('wallet', JSON.stringify(walletData));
    setIsConnected(true);
    setWalletType(provider);
    setWalletAddress(mockAddress);
    setBalance(mockBalance);
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
    <div className="wallet-page">
      <div className="wallet-header">
        <button className="back-btn" onClick={onClose}>
          <ArrowLeft size={20} />
          Back to Notes
        </button>
      </div>

      <div className="wallet-container">
        <div className="wallet-card">
          <div className="wallet-card-header">
            <Wallet size={32} />
            <h1>Cardano Wallet</h1>
          </div>

          {!isConnected ? (
            <div className="wallet-connect-section">
              <p className="wallet-subtitle">Choose a wallet provider to connect</p>
              <div className="wallet-providers">
                {walletProviders.map((provider) => (
                  <button
                    key={provider.name}
                    className="provider-btn"
                    style={{ borderColor: provider.color }}
                    onClick={() => handleConnect(provider.name)}
                  >
                    <div
                      className="provider-icon"
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
            <div className="wallet-connected-section">
              <div className="wallet-status">
                <span className="status-badge connected">Connected</span>
                <span className="wallet-provider">{walletType}</span>
              </div>

              <div className="balance-display">
                <div className="balance-label">Total Balance</div>
                <div className="balance-amount">{balance} <span>ADA</span></div>
              </div>

              <div className="wallet-info">
                <div className="info-item">
                  <label>Wallet Address</label>
                  <div className="address-display">{walletAddress}</div>
                </div>
              </div>

              <div className="wallet-actions">
                <button className="btn-primary" onClick={() => setShowSendModal(true)}>
                  <Send size={20} />
                  Send ADA
                </button>
                <button className="btn-secondary" onClick={handleDisconnect}>
                  Disconnect
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showSendModal && (
        <div className="modal-overlay" onClick={() => setShowSendModal(false)}>
          <div className="modal-container send-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Send ADA</h2>
              <button className="close-btn" onClick={() => setShowSendModal(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSend} className="send-form">
              <div className="form-group">
                <label htmlFor="recipient">Recipient Address</label>
                <input
                  type="text"
                  id="recipient"
                  value={sendForm.address}
                  onChange={(e) => setSendForm({ ...sendForm, address: e.target.value })}
                  placeholder="Enter wallet address"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="amount">Amount (ADA)</label>
                <input
                  type="number"
                  id="amount"
                  value={sendForm.amount}
                  onChange={(e) => setSendForm({ ...sendForm, amount: e.target.value })}
                  placeholder="0.00"
                  step="0.000001"
                  min="0"
                  required
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowSendModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
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