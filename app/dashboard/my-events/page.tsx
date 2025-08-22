'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from "@civic/auth-web3/react";
import DashboardLayout from "@/app/dashboard/components/DashboardLayout"
import EditEventModal from "@/app/dashboard/components/EditEventModal"
import { toast } from 'sonner';
import { FaMapMarkerAlt, FaClock, FaEdit, FaTrash, FaCalendarAlt } from 'react-icons/fa';

interface Event {
  _id: string;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  startTime: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  createdAt: string;
}

const Page = () => {
  const { user } = useUser();
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">My Events</h2>
          <p className="text-gray-600">Manage all your created events</p>
        </div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <FaCalendarAlt className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events yet</h3>
            <p className="text-gray-500 mb-6">Create your first event to get started!</p>
            <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
              Create Event
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Event Image */}
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={event.imageUrl}
                    alt={event.name}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-0 transition-opacity duration-300"
                    onLoad={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-event.jpg'; // Add a placeholder image
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

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex space-x-2">
                    <button 
                        onClick={() => setEditingEvent(event)}
                        className="flex items-center text-orange-600 hover:text-orange-700 text-sm font-medium transition-colors"
                        >
                        <FaEdit className="mr-1 h-3 w-3" />
                        Edit
                    </button>
                    </div>
                    <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {editingEvent && (
  <EditEventModal 
    event={editingEvent}
    isOpen={!!editingEvent}
    onClose={() => setEditingEvent(null)}
    onUpdate={fetchEvents}
  />
)}
      </div>
    </DashboardLayout>
  );
};

export default Page;