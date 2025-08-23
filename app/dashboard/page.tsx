'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from "@civic/auth-web3/react";
import DashboardLayout from './components/DashboardLayout';
import { toast } from 'sonner';

interface Event {
  _id: string;
  name: string;
  description: string;
  location: string;
  startTime: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  createdAt: string;
}

interface Metrics {
  eventsOrganized: number;
  ticketsIssued: number;
  ticketsSold: number;
  activeEvents: number;
}

const Page = () => {
  const { user } = useUser();
  const [metrics, setMetrics] = useState<Metrics>({
    eventsOrganized: 0,
    ticketsIssued: 0,
    ticketsSold: 0,
    activeEvents: 0,
  });
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchDashboardData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const fetchDashboardData = async () => {
    try {
      const [metricsResponse, eventsResponse] = await Promise.all([
        fetch(`/api/dashboard-metrics/organizer/${user?.id}`),
        fetch(`/api/get-events/organizer/${user?.id}`)
      ]);

      // Handle metrics
      if (metricsResponse.ok) {
        const metricsData = await metricsResponse.json();
        setMetrics(metricsData.metrics);
      } else {
        toast.error('Failed to load metrics');
      }

      // Handle events
      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json();
        setEvents(eventsData.events);
      } else {
        toast.error('Failed to load events');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
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
      <div className="p-4 space-y-10">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {loading ? (
            // Skeleton loading cards
            [...Array(4)].map((_, i) => (
              <div key={i} className="bg-white shadow rounded-xl p-6 text-center">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-20 mx-auto mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-12 mx-auto"></div>
                </div>
              </div>
            ))
          ) : (
            // Actual metrics cards
            <>
              <div className="bg-white shadow rounded-xl p-6 text-center opacity-0 animate-fade-in">
                <p className="text-gray-500 text-sm">Events Organized</p>
                <h2 className="text-2xl font-bold text-gray-900">{metrics.eventsOrganized}</h2>
              </div>
              <div className="bg-white shadow rounded-xl p-6 text-center opacity-0 animate-fade-in delay-100">
                <p className="text-gray-500 text-sm">Tickets Issued</p>
                <h2 className="text-2xl font-bold text-gray-900">{metrics.ticketsIssued}</h2>
              </div>
              <div className="bg-white shadow rounded-xl p-6 text-center opacity-0 animate-fade-in delay-200">
                <p className="text-gray-500 text-sm">Tickets Sold</p>
                <h2 className="text-2xl font-bold text-gray-900">{metrics.ticketsSold}</h2>
              </div>
              <div className="bg-white shadow rounded-xl p-6 text-center opacity-0 animate-fade-in delay-300">
                <p className="text-gray-500 text-sm">Active Events</p>
                <h2 className="text-2xl font-bold text-gray-900">{metrics.activeEvents}</h2>
              </div>
            </>
          )}
        </div>

        {/* Event List */}
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Event List</h3>
          {loading ? (
            // Skeleton loading table
            <div className="animate-pulse space-y-3">
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="grid grid-cols-4 gap-4">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-8 bg-gray-200 rounded"></div>
                  ))}
                </div>
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-8 text-gray-500 opacity-0 animate-fade-in">
              <p>No events created yet.</p>
              <p className="text-sm">Create your first event to see it here!</p>
            </div>
          ) : (
            <div className="overflow-x-auto opacity-0 animate-fade-in">
              <table className="w-full border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b text-left text-gray-600">
                    <th className="p-3 font-medium">Event Name</th>
                    <th className="p-3 font-medium">Date</th>
                    <th className="p-3 font-medium">Location</th>
                    <th className="p-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <tr 
                      key={event._id} 
                      className={`border-b last:border-none hover:bg-gray-50 opacity-0 animate-fade-in`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <td className="p-3">
                        <div>
                          <div className="font-medium text-gray-900">{event.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {event.description}
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-gray-700">{formatDate(event.startTime)}</td>
                      <td className="p-3 text-gray-500">{event.location}</td>
                      <td className="p-3">
                        <span className={getStatusBadge(event.status)}>
                          {event.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
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