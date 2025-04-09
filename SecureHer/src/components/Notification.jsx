import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { distressSignalAPI } from '../services/signalServices';
import { markAsReadAPI } from '../services/notificationServices';

function Notification() {
  const queryClient = useQueryClient();
  const { data: distressSignals, isLoading, error } = useQuery({
    queryKey: ['distressSignals'],
    queryFn: distressSignalAPI,
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id) => markAsReadAPI({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries(['distressSignals']);
    },
  });

  const openLocation = (coordinates) => {
    const url = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
    window.open(url, '_blank');
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading distress signals.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4  pt-21">
      <h1 className="text-3xl font-bold mb-6 text-center ">Notifications</h1>
      <div className="grid grid-cols-1 gap-4">
        {distressSignals?.map((signal) => (
          <div key={signal._id} className="bg-white p-4 rounded-2xl shadow-xl transition transform hover:scale-105 hover:shadow-2xl">
            <h2 className="text-xl font-semibold">{signal.name}</h2>
            <p className="text-gray-600 mb-1"><span className="font-medium">Message: 📍{signal.message}</span></p>
            <p className="text-gray-600">Time: ⏰{signal.date ? new Date(signal.date).toLocaleString() : 'N/A'}</p>

            <button
              onClick={() => markAsReadMutation.mutate(signal._id)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              ✅ Mark as read
            </button>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes fadeInUp {
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
          animation: fadeInUp 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}

export default Notification;
