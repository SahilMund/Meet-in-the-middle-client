import React, { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { MdOutlineLocationOn } from 'react-icons/md';
import ProfileUpdateForm from '../components/profileSettings-components/profileUpdateForm';
import MeetingHitoryCompnent from '../components/profileSettings-components/MeetingHitoryCompnent';
import StatisticsComponent from '../components/profileSettings-components/StatisticsComponent';
import MeetingCard from '../components/profileSettings-components/MeetingCard';
import { FaUserAlt } from 'react-icons/fa';
import { CiCalendar } from 'react-icons/ci';
import { FaRegStar } from 'react-icons/fa';
import { IoCameraSharp } from 'react-icons/io5';

const ProfileSettingsPage = () => {
  const [currWindow, setCurrWindow] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'vishnu',
    email: 'vishnu@123.com',
    phoneNumber: '939265',
    location: 'hyd',
    bio: 'hi evry one',
  });
  const [formDataUnderEdit, setFormDataUnderEdit] = useState(
    Object.assign({}, formData)
  );
  const fileInputRef = React.useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-3xl mx-auto p-3 select-none">
      {/* Header */}
      <div className="mb-6">
        <b className="text-xl block mb-1">Profile</b>
        <h5 className="text-gray-600">
          Manage your account settings and preferences
        </h5>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col sm:flex-row items-center w-full">
        <div className="flex flex-col sm:flex-row items-center w-full gap-5">
          <div
            className={`rounded-full bg-indigo-500 w-20 h-20 flex flex-col items-center justify-center text-2xl text-white mb-4 sm:mb-0 relative ${isEditing && 'cursor-pointer'}`}
            onClick={handleClick}
          >
            <div>DU</div>
            {isEditing && (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      console.log('Selected file:', file.name);
                      // Add preview or upload logic here
                    }
                  }}
                />
                <IoCameraSharp className="absolute bottom-1 right-1/2 translate-x-1/2 text-[rgba(200,200,200,0.5)]" />
              </>
            )}
          </div>
          <div className="flex flex-col text-center sm:text-left ">
            <b className="text-lg"> Demo User</b>
            <h6 className="text-gray-500">demo@meetinmiddle.com</h6>
            <h6 className="text-gray-500 flex items-center gap-1 justify-center sm:justify-start">
              <MdOutlineLocationOn />
              New York, NY
            </h6>
          </div>
          <div className="sm:ml-auto mt-4 sm:mt-0">
            {!isEditing && (
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-[5px] flex items-center gap-2 transition w-full sm:w-auto justify-center cursor-pointer"
                onClick={() => setIsEditing(!isEditing)}
              >
                <BiEdit />
                Edit Profile
              </button>
            )}
            {isEditing && (
              <div className="flex gap-4">
                <button
                  type="button"
                  className="bg-transparent text-black border border-gray-400 px-4 py-2 rounded hover:bg-gray-500 hover:text-white transition "
                  onClick={() =>
                    void (setIsEditing(!isEditing),
                    setFormDataUnderEdit(formData))
                  }
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-[5px] flex items-center gap-2 transition w-30 sm:w-auto justify-center cursor-pointer"
                  onClick={() =>
                    void (setIsEditing(!isEditing),
                    setFormData(formDataUnderEdit))
                  }
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <div className="mt-6">
        {/* Tabs */}
        <div className="flex justify-start gap-4 sm:gap-10 mb-6">
          <button
            className={`cursor-pointer p-2 text-lg flex items-center gap-2 ${currWindow === 0 ? 'text-rose-400 border-b-2' : 'text-black'}`}
            type="button"
            onClick={() => setCurrWindow(0)}
          >
            <FaUserAlt />
            Profile
          </button>

          <button
            className={`cursor-pointer p-2 text-lg flex items-center gap-2 ${currWindow === 1 ? 'text-rose-400 border-b-2' : 'text-black'}`}
            type="button"
            onClick={() => setCurrWindow(1)}
          >
            <CiCalendar />
            Meeting History
          </button>

          <button
            className={`cursor-pointer p-2 text-lg flex items-center gap-2 ${currWindow === 2 ? 'text-rose-400 border-b-2' : 'text-black'}`}
            type="button"
            onClick={() => setCurrWindow(2)}
          >
            <FaRegStar />
            Statistics
          </button>
        </div>

        {currWindow === 0 && (
          <ProfileUpdateForm
            isEditing={isEditing}
            formData={formData}
            formDataUnderEdit={formDataUnderEdit}
            setFormDataUnderEdit={setFormDataUnderEdit}
          />
        )}
        {currWindow === 1 && <MeetingHitoryCompnent />}
        {currWindow === 2 && <StatisticsComponent />}
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
