'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from "@civic/auth-web3/react";
import DashboardLayout from "@/app/dashboard/components/DashboardLayout";
import { toast } from 'sonner';
import { FaUsers, FaCalendarAlt, FaMapMarkerAlt, FaTimes, FaTicketAlt, FaEye } from 'react-icons/fa';

interface Event {
  _id: string;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  startTime: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

interface Attendee {
  _id: string;
  attendeeName: string;
  attendeeEmail: string;
  ticketType: 'general' | 'vip' | 'early-bird';
  status: 'pending' | 'confirmed' | 'used' | 'cancelled';
  purchaseDate: string;
  price: number;
}

interface AttendeesModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

const AttendeesModal = ({ event, isOpen, onClose }: AttendeesModalProps) => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && event._id) {
      fetchAttendees();
    }
  }, [isOpen, event._id]);

  const fetchAttendees = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/attendees/event/${event._id}`);
      const data = await response.json();
      
      if (response.ok) {
        setAttendees(data.attendees);
      } else {
        toast.error('Failed to load attendees');
      }
    } catch (error) {
      console.error('Error fetching attendees:', error);
      toast.error('Failed to load attendees');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs rounded-full font-medium";
    switch (status) {
      case 'confirmed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'used':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getTicketTypeBadge = (type: string) => {
    const baseClasses = "px-2 py-1 text-xs rounded font-medium";
    switch (type) {
      case 'vip':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'early-bird':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'general':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <FaUsers className="text-orange-600 mr-3" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{event.name}</h2>
              <p className="text-sm text-gray-500">Event Attendees</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        {/* Event Info */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center text-sm text-gray-600">
              <FaCalendarAlt className="mr-2 h-4 w-4" />
              <span>{new Date(event.startTime).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaMapMarkerAlt className="mr-2 h-4 w-4" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaTicketAlt className="mr-2 h-4 w-4" />
              <span>{attendees.length} Total Attendees</span>
            </div>
          </div>
        </div>

        {/* Attendees List */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 250px)' }}>
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            </div>
          ) : attendees.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FaUsers className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p>No attendees yet</p>
              <p className="text-sm">Attendees will appear here once tickets are purchased</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b text-left text-gray-600">
                    <th className="p-3 font-medium">Attendee</th>
                    <th className="p-3 font-medium">Email</th>
                    <th className="p-3 font-medium">Ticket Type</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 font-medium">Price</th>
                    <th className="p-3 font-medium">Purchase Date</th>
                  </tr>
                </thead>
                <tbody>
                  {attendees.map((attendee) => (
                    <tr key={attendee._id} className="border-b last:border-none hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-medium text-gray-900">{attendee.attendeeName}</div>
                      </td>
                      <td className="p-3 text-gray-600">{attendee.attendeeEmail}</td>
                      <td className="p-3">
                        <span className={getTicketTypeBadge(attendee.ticketType)}>
                          {attendee.ticketType}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={getStatusBadge(attendee.status)}>
                          {attendee.status}
                        </span>
                      </td>
                      <td className="p-3 text-gray-700">${attendee.price}</td>
                      <td className="p-3 text-gray-500">
                        {new Date(attendee.purchaseDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const { user } = useUser();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchEvents();
    }
  }, [user?.id]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`/api/get-events/organizer/${user?.id}`);
      const data = await response.json();
      
      if (response.ok) {
        setEvents(data.events);
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

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs rounded-full font-medium";
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
              <div className="h-5 bg-gray-200 rounded w-64"></div>
            </div>
          ) : (
            <div className="opacity-0 animate-fade-in">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Event Attendees</h2>
              <p className="text-gray-600">View attendees for each of your events</p>
            </div>
          )}
        </div>

        {/* Events List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center opacity-0 animate-fade-in">
            <FaUsers className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events yet</h3>
            <p className="text-gray-500">Create events to start seeing attendees</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <div 
                key={event._id} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{event.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{event.description}</p>
                  </div>
                  <span className={getStatusBadge(event.status)}>
                    {event.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaCalendarAlt className="mr-2 h-4 w-4" />
                    <span>{formatDate(event.startTime)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt className="mr-2 h-4 w-4" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedEvent(event)}
                  className="w-full flex items-center justify-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <FaEye className="mr-2 h-4 w-4" />
                  View Attendees
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Attendees Modal */}
        {selectedEvent && (
          <AttendeesModal
            event={selectedEvent}
            isOpen={!!selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </div>

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
    </DashboardLayout>
  );
};

export default Page;