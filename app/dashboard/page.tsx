'use client';

import React from 'react';

const Page = () => {
  const metrics = {
    eventsOrganized: 5,
    ticketsIssued: 120,
    ticketsSold: 98,
    activeEvents: 2,
  };

  const events = [
    { name: 'Summer Fest', date: 'Aug 20', issued: 50, sold: 45, status: 'Completed' },
    { name: 'Tech Meetup', date: 'Sep 1', issued: 30, sold: 20, status: 'Ongoing' },
    { name: 'NFT Expo', date: 'Sep 5', issued: 40, sold: 33, status: 'Upcoming' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-2xl p-4 text-center">
          <p className="text-gray-500">Events Organized</p>
          <h2 className="text-xl font-bold">{metrics.eventsOrganized}</h2>
        </div>
        <div className="bg-white shadow rounded-2xl p-4 text-center">
          <p className="text-gray-500">Tickets Issued</p>
          <h2 className="text-xl font-bold">{metrics.ticketsIssued}</h2>
        </div>
        <div className="bg-white shadow rounded-2xl p-4 text-center">
          <p className="text-gray-500">Tickets Sold</p>
          <h2 className="text-xl font-bold">{metrics.ticketsSold}</h2>
        </div>
        <div className="bg-white shadow rounded-2xl p-4 text-center">
          <p className="text-gray-500">Active Events</p>
          <h2 className="text-xl font-bold">{metrics.activeEvents}</h2>
        </div>
      </div>

      {/* Event List */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Event List</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left text-gray-600">
              <th className="p-2">Event Name</th>
              <th className="p-2">Date</th>
              <th className="p-2">Issued</th>
              <th className="p-2">Sold</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, i) => (
              <tr key={i} className="border-b last:border-none">
                <td className="p-2">{event.name}</td>
                <td className="p-2">{event.date}</td>
                <td className="p-2">{event.issued}</td>
                <td className="p-2">{event.sold}</td>
                <td className="p-2">{event.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
