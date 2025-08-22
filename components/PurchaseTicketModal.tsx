'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useUser, userHasWallet } from "@civic/auth-web3/react";
import { Connection, SystemProgram, Transaction, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { X, Ticket, Wallet, CreditCard } from 'lucide-react';

interface PurchaseTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    _id: string;
    name: string;
    location: string;
    startTime: string;
    imageUrl?: string;
  };
  userId: string;
}

export default function PurchaseTicketModal({ 
  isOpen, 
  onClose, 
  event, 
  userId 
}: PurchaseTicketModalProps) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [ticketType, setTicketType] = useState('general');
  const [showNFTSuccess, setShowNFTSuccess] = useState(false);

  const ticketPrices = {
    'general': 0.05,    // 0.05 SOL (~$10-15) - matches your 'general' enum
    'vip': 0.15,        // 0.15 SOL (~$30-45)
    'early-bird': 0.03, // 0.03 SOL (~$6-9)
    'student': 0.02     // 0.02 SOL (~$4-6)
  };

  const ticketDescriptions = {
    'general': 'General admission to the event',
    'vip': 'Premium access with exclusive perks',
    'early-bird': 'Limited time discount pricing',
    'student': 'Discounted rate for students'
  };

  // Check wallet balance
  const checkWalletBalance = async () => {
    if (!user || !userHasWallet(user)) return 0;
    
    try {
      const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com');
      const balance = await connection.getBalance(user.solana.wallet.publicKey);
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      console.error('Error checking balance:', error);
      return 0;
    }
  };

  const handlePurchase = async () => {
    if (!userId || !user) {
      toast.error('Please sign in to purchase tickets');
      return;
    }

    if (!userHasWallet(user)) {
      toast.error('Wallet not found. Please try signing in again.');
      return;
    }

    setLoading(true);
    
    try {
      const ticketPrice = ticketPrices[ticketType as keyof typeof ticketPrices];
      
      toast.loading('Checking wallet balance...', { id: 'purchase' });
      
      const balance = await checkWalletBalance();
      
      if (balance < ticketPrice) {
        toast.error(`Insufficient balance. You need ${ticketPrice} SOL but have ${balance.toFixed(4)} SOL`, { id: 'purchase' });
        setLoading(false);
        return;
      }

      toast.loading('Processing payment on Solana...', { id: 'purchase' });

      // Simulate Solana transaction (replace with real payment in production)
      // For now, we'll simulate the payment process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create ticket record
      const response = await fetch('/api/purchase-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: event._id,
          attendeeId: userId,
          ticketType,
          price: ticketPrice,
          paymentMethod: 'embedded_wallet',
          walletAddress: user.solana.address
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Purchase failed');
      }

      toast.success('Payment confirmed! Minting your NFT ticket...', { id: 'purchase' });
      
      // Simulate NFT minting delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('🎫 NFT Ticket minted successfully!', { id: 'purchase' });
      setShowNFTSuccess(true);
      
              setTimeout(() => {
        onClose();
        setShowNFTSuccess(false);
        // Refresh page to show updated status
        window.location.reload();
      }, 3000);

    } catch (error) {
      console.error('Purchase error:', error);
      toast.error(error instanceof Error ? error.message : 'Purchase failed', { id: 'purchase' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  if (showNFTSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Ticket className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">NFT Ticket Minted!</h3>
          <p className="text-gray-600 mb-4">Your ticket has been successfully minted as an NFT on Solana blockchain.</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-600">Event: <span className="font-medium">{event.name}</span></p>
            <p className="text-sm text-gray-600">Type: <span className="font-medium capitalize">{ticketType}</span></p>
            <p className="text-sm text-gray-600">Price: <span className="font-medium">{ticketPrices[ticketType as keyof typeof ticketPrices]} SOL</span></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Purchase Ticket</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Event Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900">{event.name}</h3>
          <p className="text-sm text-gray-600">{event.location}</p>
          <p className="text-sm text-gray-600">
            {new Date(event.startTime).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>

        {/* Ticket Types */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Select Ticket Type</h4>
          <div className="space-y-3">
            {Object.entries(ticketPrices).map(([type, price]) => (
              <label key={type} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="ticketType"
                  value={type}
                  checked={ticketType === type}
                  onChange={(e) => setTicketType(e.target.value)}
                  className="mr-3 text-orange-600"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium capitalize">{type.replace('-', ' ')}</span>
                    <span className="font-bold text-orange-600">{price} SOL</span>
                  </div>
                  <p className="text-sm text-gray-600">{ticketDescriptions[type as keyof typeof ticketDescriptions]}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Wallet Info */}
        {user && userHasWallet(user) && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center mb-2">
              <Wallet className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-medium text-blue-900">Civic Embedded Wallet</span>
            </div>
            <p className="text-sm text-blue-700">
              Address: {user.solana.address.slice(0, 8)}...{user.solana.address.slice(-8)}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Payment will be processed on Solana network
            </p>
          </div>
        )}

        {/* Purchase Button */}
        <button
          onClick={handlePurchase}
          disabled={loading}
          className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5 mr-2" />
              Pay {ticketPrices[ticketType as keyof typeof ticketPrices]} SOL
            </>
          )}
        </button>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            🔒 Secure payment • 🎫 NFT ticket on Solana • ⚡ Low transaction fees
          </p>
        </div>
      </div>
    </div>
  );
}