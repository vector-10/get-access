'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt, FaHome, FaList, FaSearch } from 'react-icons/fa';

interface Event {
  _id: string;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  startTime: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export default function AllEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      const response = await fetch(`/api/event/all`);
      const data = await response.json();
      
      if (response.ok) {
        setEvents(data.events);
        console.log('Events loaded:', data.events);
      } else {
        toast.error('Failed to load events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 text-xs rounded-full font-medium";
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      case 'ongoing':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'upcoming':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <Link href="/events" className="flex items-center text-orange-600 font-medium">
                <FaList className="mr-2" />
                All Events
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Events</h1>
          <p className="text-xl md:text-2xl text-orange-100 mb-8">Find amazing Web3 events happening around you</p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <FaCalendarAlt className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {searchTerm ? 'No events found' : 'No events available'}
            </h3>
            <p className="text-gray-500">
              {searchTerm ? 'Try adjusting your search terms' : 'Check back later for upcoming events'}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {searchTerm ? `Search results for "${searchTerm}"` : 'All Events'}
              </h2>
              <p className="text-gray-600">{filteredEvents.length} events found</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <div 
                  key={event._id} 
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Event Image */}
                  <div className="relative h-48 bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={event.imageUrl}
                      alt={event.name}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
                      onLoad={(e) => {
                        e.currentTarget.style.opacity = '1';
                      }}
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-event.jpg';
                      }}
                    />
                    <div className="absolute top-4 right-4">
                      <span className={getStatusBadge(event.status)}>
                        {event.status}
                      </span>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                      {event.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <FaCalendarAlt className="mr-2 h-4 w-4" />
                        <span>{formatDate(event.startTime)} at {formatTime(event.startTime)}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FaMapMarkerAlt className="mr-2 h-4 w-4" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Link 
                      href={`/event/${event._id}`}
                      className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center justify-center"
                    >
                      <FaTicketAlt className="mr-2" />
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 getAccess. Web3 Event Ticketing Platform.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}