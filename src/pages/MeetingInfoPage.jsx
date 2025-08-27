import React, { useState } from 'react';
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaInfoCircle,
  FaHourglassHalf,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
  FaShareAlt,
  FaUsers,
  FaCheckCircle,
} from 'react-icons/fa';

const MeetingsInfoPage = () => {
  const [currentWindow, setcurrentWindow] = useState(0);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  //  Participants with status
  const participants = [
    { name: 'Jane Smith', status: 'confirmed' },
    { name: 'Bob Johnson', status: 'confirmed' },
    { name: 'Alice Brown', status: 'pending' }, // one pending
  ];

  const handleDelete = () => {
    setShowDeleteAlert(false);
    console.log('Meeting Deleted ✅');
    // add delete logic here (API call etc.)
  };

  return (
    <div className="p-6 bg-[#f4f6f9] min-h-screen relative">
      {/* Delete Confirmation Modal */}
      {showDeleteAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-md text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Are you sure?
            </h2>
            <p className="text-gray-600 mb-6">
              Do you really want to delete this meeting?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="px-5 py-2 bg-red-600 text-white rounded-lg font-medium shadow hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteAlert(false)}
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium shadow hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 shadow-md p-6 flex justify-between bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl">
        {/* Meeting Info */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-end">
            <span className="text-3xl font-bold text-white drop-shadow-lg">
              Team Strategy Meeting
            </span>
            <span className="rounded-2xl px-3 py-1 bg-yellow-400 text-gray-900 text-sm font-semibold shadow-md">
              Voting
            </span>
          </div>

          <p className="text-indigo-100 max-w-lg">
            Quarterly Planning session to discuss goals, objectives, and
            strategic initiatives for Q2
          </p>

          <div className="flex gap-6 text-indigo-100 font-medium items-center">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-yellow-300" />
              <span>February 15, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-pink-300" />
              <span>2:00 - 4:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers className="text-green-300" />
              <span>{participants.length} participants</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 items-center">
          <button className="flex items-center gap-2 border-2 border-green-300 text-green-100 hover:bg-green-400 hover:text-white transition px-3 py-2 rounded-lg shadow">
            <FaShareAlt /> Share
          </button>
          <button className="flex items-center gap-2 border-2 border-blue-300 text-blue-100 hover:bg-blue-400 hover:text-white transition px-3 py-2 rounded-lg shadow">
            <FaEdit /> Edit
          </button>
          <button
            onClick={() => setShowDeleteAlert(true)}
            className="flex items-center gap-2 border-2 border-red-300 text-red-100 hover:bg-red-500 hover:text-white transition px-3 py-2 rounded-lg shadow"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>

      {/* Tabs + Content */}
      <div className="shadow bg-white rounded-2xl p-6">
        {/* Tabs */}
        <div className="flex gap-8 border-b-2 border-gray-200 pb-3 mb-6 text-lg">
          <div
            className={`flex items-center gap-2 cursor-pointer ${
              currentWindow === 0
                ? 'text-indigo-600 font-semibold'
                : 'text-gray-500'
            }`}
            onClick={() => setcurrentWindow(0)}
          >
            <FaInfoCircle /> Overview
          </div>
          <div
            className={`flex items-center gap-2 cursor-pointer ${
              currentWindow === 1
                ? 'text-indigo-600 font-semibold'
                : 'text-gray-500'
            }`}
            onClick={() => setcurrentWindow(1)}
          >
            <FaUsers /> Participants
          </div>
          <div
            className={`cursor-pointer ${
              currentWindow === 2
                ? 'text-indigo-600 font-semibold'
                : 'text-gray-500'
            }`}
            onClick={() => setcurrentWindow(2)}
          >
            Voting
          </div>
          <div
            className={`cursor-pointer ${
              currentWindow === 3
                ? 'text-indigo-600 font-semibold'
                : 'text-gray-500'
            }`}
            onClick={() => setcurrentWindow(3)}
          >
            Map View
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {/* Overview */}
          {currentWindow === 0 && (
            <div className="px-4">
              <div className="text-gray-700">
                <p className="text-xl font-bold mb-3"> Meeting Information</p>
                <p>
                  Created by: <span className="font-medium">John Doe</span>
                </p>
                <p>
                  Status:{' '}
                  <span className="text-yellow-600 font-semibold">Voting</span>
                </p>
                <p>
                  Duration: <span className="font-medium">2 hours</span>
                </p>
              </div>
            </div>
          )}

          {/* Participants */}
          {currentWindow === 1 && (
            <div>
              <p className="text-gray-700 mb-4 font-bold text-lg">
                Participants ({participants.length})
              </p>
              <div
                className="flex flex-col gap-4 h-[40vh] overflow-y-scroll pr-2"
                style={{ scrollbarWidth: 'none' }}
              >
                {participants.map((participant, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border border-gray-200 rounded-2xl p-4 bg-indigo-50 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-lg w-12 h-12 flex items-center justify-center rounded-full bg-indigo-500 text-white font-bold">
                        {participant.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <p className="text-gray-800 text-lg font-medium">
                          {participant.name}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {participant.name.toLowerCase().replace(' ', '.')}
                          @example.com
                        </p>
                      </div>
                    </div>

                    {/* Conditional Status */}
                    {participant.status === 'confirmed' ? (
                      <div className="text-right text-green-600 font-semibold flex flex-col items-end">
                        <p> Location provided</p>
                        <div className="flex items-center gap-1 text-green-500">
                          <FaCheckCircle /> Confirmed
                        </div>
                      </div>
                    ) : (
                      <div className="text-right text-yellow-600 font-semibold flex flex-col items-end">
                        <p> Location pending</p>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <FaHourglassHalf /> Pending
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingsInfoPage;
