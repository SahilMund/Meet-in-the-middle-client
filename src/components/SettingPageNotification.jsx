import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
const SettingPageNotification = () => {
  const [notification, setNotification] = useState(false);

  const handleToggle = (e) => {
    setNotification(true);
    toast.success(
      `${e.target.dataset.message}` +
        `${e.target.checked ? 'Enabled' : 'Disabled'}`
    );
    
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div>
      <br />

      <div className="p-6 bg-white rounded-2xl shadow-sm space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800 ">
          Notification Preferences
        </h1>

        <div className="space-y-4">
          {/* Email Notifications */}
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h2 className="text-lg font-medium text-gray-700">
                Email Notifications
              </h2>
              <p className="text-sm text-gray-500">
                Manage how you receive email updates
              </p>
            </div>
            {/* Tailwind toggle */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                data-message={`Email Notification `}
                type="checkbox"
                className="sr-only peer"
                onChange={handleToggle}
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
              <div className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full border border-gray-300 peer-checked:translate-x-7 transition-transform"></div>
            </label>
          </div>

          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h2 className="text-lg font-medium text-gray-700">
                Push Notifications
              </h2>
              <p className="text-sm text-gray-500">
                Control push alerts on your devices
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                data-message={`Push Notification `}
                type="checkbox"
                className="sr-only peer"
                onChange={handleToggle}
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
              <div className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full border border-gray-300 peer-checked:translate-x-7 transition-transform"></div>
            </label>
          </div>

          {/* Meeting Reminders */}
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h2 className="text-lg font-medium text-gray-700">
                Meeting Reminders
              </h2>
              <p className="text-sm text-gray-500">
                Choose how to be reminded about meetings
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
              data-message={`Meeting Notification `}
                type="checkbox"
                className="sr-only peer"
                onChange={handleToggle}
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
              <div className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full border border-gray-300 peer-checked:translate-x-7 transition-transform"></div>
            </label>
          </div>

          {/* Invitation Alerts */}
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h2 className="text-lg font-medium text-gray-700">
                Invitation Alerts
              </h2>
              <p className="text-sm text-gray-500">
                Get notified when someone invites you
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
              data-message={`Invitation Notification `}
                type="checkbox"
                className="sr-only peer"
                onChange={handleToggle}
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
              <div className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full border border-gray-300 peer-checked:translate-x-7 transition-transform"></div>
            </label>
          </div>

          {/* Voting Updates */}
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h2 className="text-lg font-medium text-gray-700">
                Voting Updates
              </h2>
              <p className="text-sm text-gray-500">
                Stay updated on polls and voting results
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
              data-message={`Voting Notification `}
                type="checkbox"
                className="sr-only peer"
                onChange={handleToggle}
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
              <div className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full border border-gray-300 peer-checked:translate-x-7 transition-transform"></div>
            </label>
          </div>

          {/* Weekly Digest */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-700">
                Weekly Digest
              </h2>
              <p className="text-sm text-gray-500">
                Get a summary of your meetings every week
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
              data-message={`Weekly Notification `}
                type="checkbox"
                className="sr-only peer"
                onChange={handleToggle}
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
              <div className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full border border-gray-300 peer-checked:translate-x-7 transition-transform "></div>
            </label>
          </div>
          <div className="border-b pb-3"></div>
          <div className="flex justify-end ">
            <button
              type="button"
              className="mt-6 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-1 transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPageNotification;
