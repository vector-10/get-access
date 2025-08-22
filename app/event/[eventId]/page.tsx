'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from "@civic/auth-web3/react";
import { toast } from 'sonner';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaTicketAlt, FaHome, FaList, FaCheck, FaSignInAlt } from 'react-icons/fa';

interface Event {
  _id: string;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  startTime: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export default function EventPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const eventId = params.eventId as string;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}`);
      const data = await response.json();
      
      if (response.ok) {
        setEvent(data.event);
      } else {
        toast.error('Event not found');
      }
    } catch (error) {
      console.error('Error fetching event:', error);
      toast.error('Failed to load event');
    } finally {
      setLoading(false);
    }
  };

  const handleSignInToPay = () => {
    const currentUrl = window.location.pathname;
    router.push(`/auth?returnUrl=${encodeURIComponent(currentUrl)}`);
  };

  const handlePurchaseTicket = () => {
    if (user) {
      // TODO: Implement payment flow
      toast.info('Payment integration coming soon!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-orange-600">
                getAccess
              </Link>
              <nav className="flex space-x-6">
                <Link href="/" className="flex items-center text-gray-600 hover:text-orange-600 transition-colors">
                  <FaHome className="mr-2" />
                  Home
                </Link>
                <Link href="/events" className="flex items-center text-gray-600 hover:text-orange-600 transition-colors">
                  <FaList className="mr-2" />
                  All Events
                </Link>
              </nav>
            </div>
          </div>
        </header>
        
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h1>
            <p className="text-gray-600">The event you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-orange-600">
              getAccess
            </Link>
            <nav className="flex space-x-6">
              <Link href="/" className="flex items-center text-gray-600 hover:text-orange-600 transition-colors">
                <FaHome className="mr-2" />
                Home
              </Link>
              <Link href="/events" className="flex items-center text-gray-600 hover:text-orange-600 transition-colors">
                <FaList className="mr-2" />
                All Events
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Image Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Event Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{event.name}</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl">{event.description}</p>
          </div>
        </div>
      </div>

      {/* Event Details Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Event Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <FaCalendarAlt className="h-6 w-6 text-orange-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Date</h3>
                    <p className="text-gray-600">{new Date(event.startTime).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <FaClock className="h-6 w-6 text-orange-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Time</h3>
                    <p className="text-gray-600">{new Date(event.startTime).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 md:col-span-2">
                  <div className="flex-shrink-0">
                    <FaMapMarkerAlt className="h-6 w-6 text-orange-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Location</h3>
                    <p className="text-gray-600">{event.location}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About This Event</h3>
                <p className="text-gray-600 leading-relaxed">{event.description}</p>
              </div>
            </div>
          </div>

          {/* Ticket Purchase Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-orange-50 rounded-lg border border-orange-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Get Your Ticket</h3>
                
                {/* Authentication Status */}
                {user ? (
                  <div className="mb-4 flex items-center space-x-2 text-sm bg-green-50 text-green-800 px-3 py-2 rounded-lg border border-green-200">
                    <FaCheck className="h-4 w-4" />
                    <span className="font-medium">{user.name || 'User'} • Verified</span>
                  </div>
                ) : (
                  <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800 mb-3 font-medium">Sign in to purchase tickets</p>
                    <button
                      onClick={handleSignInToPay}
                      className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors font-medium flex items-center justify-center"
                    >
                      <FaSignInAlt className="mr-2" />
                      Sign in to Pay
                    </button>
                  </div>
                )}
                
                <div className="space-y-4 mb-6">
                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-900">General Admission</h4>
                        <p className="text-sm text-gray-600">Standard event access</p>
                      </div>
                      <span className="text-2xl font-bold text-gray-900">$25</span>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 bg-white opacity-60">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-500">VIP Access</h4>
                        <p className="text-sm text-gray-500">Premium experience</p>
                      </div>
                      <span className="text-2xl font-bold text-gray-500">$75</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Coming soon</p>
                  </div>
                </div>
                
                <button 
                  onClick={handlePurchaseTicket}
                  disabled={!user}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center mb-4 transition-all duration-200 ${
                    user 
                      ? 'bg-orange-600 text-white hover:bg-orange-700 cursor-pointer shadow-md hover:shadow-lg' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-75'
                  }`}
                >
                  <FaTicketAlt className="mr-3" />
                  {user ? 'Purchase Ticket' : 'Sign in Required'}
                </button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">🔒 Secure payment powered by Civic</p>
                  <p className="text-sm text-gray-600">🎫 NFT ticket issued on Solana blockchain</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 getAccess. Web3 Event Ticketing Platform.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}