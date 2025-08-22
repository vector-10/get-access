'use client';

import { useState } from "react";
import { useUser } from "@civic/auth-web3/react";
import { toast } from 'sonner'
import { FaTimes,  FaMapMarkerAlt, FaImage, FaClock } from "react-icons/fa";

interface CreateEventModalProps {
isOpen: boolean;
onClose: () => void;
}

export default function CreateEventModal({ isOpen, onClose }: CreateEventModalProps) {
const { user } = useUser();
const [loading, setLoading] = useState(false);
const [formData, setFormData] = useState({
  name: '',
  description: '',
  location: '',
  imageUrl: '',
  startTime: ''
});

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  
  // Show loading toast
  const loadingToast = toast.loading('Creating event...');

  try {
    const response = await fetch('/api/create-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        organizerId: user?.id
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Dismiss loading and show success
      toast.dismiss(loadingToast);
      toast.success('Event created successfully!');
      
      onClose();
      setFormData({
        name: '',
        description: '',
        location: '',
        imageUrl: '',
        startTime: ''
      });
      window.location.reload();
    } else {
      // Dismiss loading and show error
      toast.dismiss(loadingToast);
      toast.error(data.message || 'Failed to create event');
    }
  } catch (error) {
    console.error('Error creating event:', error);

    toast.dismiss(loadingToast);
    toast.error('Failed to create event');
  } finally {
    setLoading(false);
  }
};

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

if (!isOpen) return null;

 const Spinner = () => (
    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

 return (
   <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
     <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
       {/* Header */}
       <div className="flex items-center justify-between p-6 border-b border-gray-200">
         <h2 className="text-xl font-semibold text-gray-900">Create New Event</h2>
         <button
           onClick={onClose}
           className="text-gray-400 hover:text-gray-600 transition-colors"
         >
           <FaTimes className="w-5 h-5" />
         </button>
       </div>

       {/* Form */}
       <form onSubmit={handleSubmit} className="p-6 space-y-4">
         {/* Event Name */}
         <div>
           <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
             Event Name 
           </label>
           <input
             type="text"
             id="name"
             name="name"
             value={formData.name}
             onChange={handleInputChange}
             required
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
             placeholder="Enter event name"
           />
         </div>

         {/* Description */}
         <div>
           <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
             Description 
           </label>
           <textarea
             id="description"
             name="description"
             value={formData.description}
             onChange={handleInputChange}
             required
             rows={3}
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none"
             placeholder="Describe your event"
           />
         </div>

         {/* Location */}
         <div>
           <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
             <FaMapMarkerAlt className="inline w-4 h-4 mr-1" />
             Location 
           </label>
           <input
             type="text"
             id="location"
             name="location"
             value={formData.location}
             onChange={handleInputChange}
             required
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
             placeholder="Event location"
           />
         </div>

         {/* Image URL */}
         <div>
           <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
             <FaImage className="inline w-4 h-4 mr-1" />
             Cover Photo URL 
           </label>
           <input
             type="url"
             id="imageUrl"
             name="imageUrl"
             value={formData.imageUrl}
             onChange={handleInputChange}
             required
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
             placeholder="https://example.com/image.jpg"
           />
         </div>

         {/* Start Time */}
         <div>
           <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
             <FaClock className="inline w-4 h-4 mr-1" />
             Start Time 
           </label>
           <input
             type="datetime-local"
             id="startTime"
             name="startTime"
             value={formData.startTime}
             onChange={handleInputChange}
             required
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
           />
         </div>

         {/* Buttons */}
         <div className="flex space-x-3 pt-4">
           <button
             type="button"
             onClick={onClose}
             className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
           >
             Cancel
           </button>
           <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
            {loading && <Spinner />}
            <span>{loading ? 'Creating...' : 'Create Event'}</span>
            </button>
         </div>
       </form>
     </div>
   </div>
 );
}