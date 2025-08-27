import React, { useState, lazy, Suspense } from "react";
import { FaUsers } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { IoClose } from "react-icons/io5";
const ConfirmationModel = lazy(() => import("../components/ConfirmationModel"));
const LocationModel = lazy(() => import("../components/LocationModel"));
// import ConfirmationModel from "../components/ConfirmationModel";
// import LocationModel from "../components/LocationModel";
import { myMeetings } from "../MyMeetings";

const Invitations = () => {
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [selectedInvite, setSelectedInvite] = useState(null);

  const pendingInvitations = [
    {
      title: "Marketing Strategy session",
      name: "Kushal Deep",
      Description: "Lets discuss Q1 marketing plans and budget allocation.",
      people: 8,
      date: "Aug 15",
      time: "3:00PM",
    },
    {
      title: "Just Chill",
      name: "Kushal Deep",
      Description: "Lets hangout and go for a weekend ride.",
      people: 4,
      date: "Aug 24",
      time: "6:00AM",
    },
    {
      title: "Just Chill chill ",
      name: "Kushal Deep",
      Description: "Lets hangout and go for a weekend ride.",
      people: 4,
      date: "Aug 31",
      time: "4:00AM",
    },
  ];

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div>
      <div className="p-4 mt-4">
        <h2 className="text-xl font-bold mb-4">
          Pending Invitations ({pendingInvitations.length})
        </h2>

        {/* Grid for responsiveness */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pendingInvitations.map((invite, index) => (
            <div
              key={index}
              className="relative bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all"
            >
              {/* Date at top right */}
              <div className="absolute top-2 right-2 text-sm font-semibold text-gray-500">
                <div>{invite.date}</div>
                <div className="text-xs">{invite.time}</div>
              </div>

              {/* Header with initials and title */}
              <div className="flex items-center mb-2">
                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold mr-3">
                  {getInitials(invite.name)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{invite.title}</h3>
                  <p className="text-sm text-gray-500">by {invite.name}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-3">{invite.Description}</p>

              {/* People count */}
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <FaUsers className="mr-2" />
                {invite.people} people
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  className="flex-1 cursor-pointer bg-blue-500 text-white py-1.5 rounded-lg hover:bg-green-600"
                  onClick={() => {
                    setSelectedInvite(invite);
                    setShowAcceptModal(true);
                  }}
                >
                  Accept
                </button>
                <button
                  className="flex-1 cursor-pointer py-1.5 rounded-lg hover:bg-red-600 hover:text-white"
                  onClick={() => setShowDeclineModal(true)}
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decline Modal */}
      <Suspense>
        {showDeclineModal && (
          <ConfirmationModel
            showDeclineModal={showDeclineModal}
            setShowDeclineModal={setShowDeclineModal}
          />
        )}

        {/* Accept Modal */}
        {showAcceptModal && (
          <LocationModel
            isOpen={showAcceptModal}
            onClose={() => setShowAcceptModal(false)}
            invite={selectedInvite}
            myMeetings={myMeetings}
          />
        )}
      </Suspense>
    </div>
  );
};

export default Invitations;
