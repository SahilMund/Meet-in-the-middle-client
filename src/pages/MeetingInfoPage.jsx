import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaInfoCircle,
  FaHourglassHalf,
  FaEdit,
  FaTrash,
  FaShareAlt,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import getDuration from "../utils/getDuration";
import {
  deleteMeetingById,
  getMeetingById,
  rejectMeeting,
  updatemeetingDetails,
} from "../services/meetings";
import Modal from "../components/Modal";
import VotingCard from "../components/votingCard";
import VotingResults from "../components/VotingResults";
import VoteDistribution from "../components/VoteDistribution";

const ConfirmationModel = lazy(() => import("../components/ConfirmationModel"));
const LocationModel = lazy(() => import("../components/LocationModel"));
import MapContainer from "../components/MapContainer";
import { useNavigate } from "react-router-dom";

const MeetingsInfoPage = () => {
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [meeting, setMeeting] = useState({});
  const [currentWindow, setcurrentWindow] = useState(0);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const { id } = useParams();
  const { user } = useSelector((store) => store.authSlice);

  const [isOpen, setIsOpen] = useState(false);

  // Edit modal
  const [isOpenMadal, setIsOpenMadal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Voting
  const [locations, setLocations] = useState([
    {
      id: 1,
      title: "Bryant Park Grill",
      image: "https://wallpapercave.com/wp/wp1874184.jpg",
      likes: 0,
      dislikes: 0,
    },
    {
      id: 2,
      title: "Central Park Picnic",
      image:
        "https://www.bing.com/th/id/OIP.ET_GDP6-6UtLgiNo3kpI8QHaE7?w=244&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2&ucfimg=1",
      likes: 0,
      dislikes: 0,
    },
    {
      id: 3,
      title: "Rooftop Bar",
      image:
        "https://www.bing.com/th/id/OIP.LNcfkezrbzTJZUE1R5ibYQHaFj?w=236&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2&ucfimg=1",
      likes: 0,
      dislikes: 0,
    },
  ]);
  const [endVotingOpen, setEndVotingOpen] = useState(false);
  const [selectPlace, setSelectPlace] = useState(null);

  const handleLike = (id) => {
    setLocations((prev) =>
      prev.map((loc) =>
        loc.id === id ? { ...loc, likes: loc.likes + 1 } : loc
      )
    );
  };

  const handleDislike = (id) => {
    setLocations((prev) =>
      prev.map((loc) =>
        loc.id === id ? { ...loc, dislikes: loc.dislikes + 1 } : loc
      )
    );
  };

  const ranked = [...locations].sort(
    (a, b) => b.likes - b.dislikes - (a.likes - a.dislikes)
  );

  const myParticipation = meeting?.participants?.find(
    (participant) => participant?.email === user?.email
  );

  useEffect(() => {
    if (meeting) {
      setTitle(meeting.title || "");
      setDescription(meeting.description || "");
    }
  }, [meeting]);

  const handleDelete = () => {
    deleteMeetingById(meeting._id);
    setShowDeleteAlert(false);
    navigate("/home", { replace: true });
  };

  useEffect(() => {
    const fetchmeeting = async () => {
      const response = await getMeetingById(id);
      setMeeting(response.data.data.meeting);
      console.log(response.data.data.meeting, "respon");
    };
    fetchmeeting();
  }, [id]);

  const convertDate = (date) =>
    date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const convertTime = (date) =>
    date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  const onClose = () => setIsOpenMadal(false);

  const updateMeeting = async () => {
    const response = await updatemeetingDetails(meeting?._id, {
      title,
      description,
    });
    if (response.data.success) toast.success(response.data.message);
    else toast.error(response.data.message);
  };

  const onCloseLocationModal = () => setIsOpen(false);

  const handleDecline = useCallback(async (id) => {
    try {
      const response = await rejectMeeting(id);
      const data = response.data;
      if (!data.success) throw new Error(data.message);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
    setShowDeclineModal(false);
  }, []);

  return (
    <div className="p-6 bg-[#f4f6f9] min-h-screen relative">
      {/* Delete Confirmation */}
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
                className="px-5 py-2 bg-red-600 text-white rounded-lg"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteAlert(false)}
                className="px-5 py-2 bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 shadow-md p-6 flex flex-col md:flex-row justify-between gap-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl">
        {/* Info */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-end">
            <span className="text-3xl font-bold text-white">
              {meeting.title}
            </span>
            <span className="rounded-2xl px-3 py-1 bg-yellow-400 text-gray-900 text-sm">
              Voting
            </span>
          </div>
          <p className="text-indigo-100 max-w-lg">{meeting.description}</p>

          <div className="flex flex-col gap-6 text-indigo-100 font-medium">
            <div className="flex flex-wrap  gap-2">
              <div className="flex items-center gap-2">
              <p>Starts On:</p>
              <FaCalendarAlt className="text-yellow-300" />
              <span>{convertDate(new Date(meeting.scheduledAt))}</span>
              </div>
              <div className="flex items-center gap-2">
              <FaClock className="text-pink-300" />
              <span>{convertTime(new Date(meeting.scheduledAt))}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
              <p>Ends On:</p>
              <FaCalendarAlt className="text-yellow-300" />
              <span>{convertDate(new Date(meeting.endsAt))}</span>
              </div>
              <div className="flex items-center gap-2">
              <FaClock className="text-pink-300" />
              <span>{convertTime(new Date(meeting.endsAt))}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <FaUsers className="text-green-300" />
              <span>{meeting?.participants?.length} participants</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 items-center">
          <button className="flex items-center gap-2 border border-green-300 text-green-100 px-3 py-2 rounded-md text-sm"
            onClick={() => {
              navigator.share({
                title: `Meeting Invite for ${meeting.title}`,
                text: "Join our meeting",
                url: meeting.meetingLink,
              });

            }}
          >
            <FaShareAlt className="text-base" /> Share
          </button>
          {user?.id === meeting?.creator?._id ? (
            <>
              <button
                onClick={() => setIsOpenMadal(true)}
                className="flex items-center gap-1 border border-blue-300 text-blue-100 px-2 py-1 rounded-md text-sm"
              >
                <FaEdit className="text-base" /> Edit
              </button>
              <button
                onClick={() => setShowDeleteAlert(true)}
                className="flex items-center gap-1 border border-red-300 text-red-100 px-2 py-1 rounded-md text-sm"
              >
                <FaTrash className="text-base" /> Cancel
              </button>
            </>
          ) : myParticipation?.status === "Pending" ? (
            <>
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-1 border border-green-300 text-blue-100 px-2 py-1 rounded-md text-sm"
              >
                Accept
              </button>
              <button
                onClick={() => setShowDeclineModal(true)}
                className="flex items-center gap-1 border border-red-300 text-red-100 px-2 py-1 rounded-md text-sm"
              >
                Reject
              </button>
            </>
          ) : (
            <button
              disabled
              className="flex cursor-not-allowed items-center gap-1 border border-blue-300 text-blue-100 px-2 py-1 rounded-md text-sm"
            >
              {myParticipation?.status}
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="shadow bg-white rounded-2xl p-6">
        <div className="flex flex-wrap gap-4 border-b-2 border-gray-200 pb-3 mb-6 text-base sm:text-lg">
          <div
            onClick={() => setcurrentWindow(0)}
            className={`flex items-center gap-2 cursor-pointer ${currentWindow === 0
              ? "text-indigo-600 font-semibold"
              : "text-gray-500"
              }`}
          >
            <FaInfoCircle /> Overview
          </div>
          <div
            onClick={() => setcurrentWindow(1)}
            className={`flex items-center gap-2 cursor-pointer ${
              currentWindow === 1
                ? "text-indigo-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            <FaUsers /> Participants
          </div>
          <div
            onClick={() => setcurrentWindow(2)}
            className={`cursor-pointer ${currentWindow === 2
              ? "text-indigo-600 font-semibold"
              : "text-gray-500"
              }`}
          >
            Voting
          </div>
          <div
            onClick={() => setcurrentWindow(3)}
            className={`cursor-pointer ${currentWindow === 3
              ? "text-indigo-600 font-semibold"
              : "text-gray-500"
              }`}
          >
            Map View
          </div>
        </div>

        {/* Content */}
        <div>
          {currentWindow === 0 && (
            <div className="px-4 text-gray-700">
              <p>
                Created by:{" "}
                <span className="font-medium">{meeting?.creator?.name}</span>
              </p>
              <p>
                Status:{" "}
                <span className="text-yellow-600 font-semibold">Voting</span>
              </p>
              <p>
                Duration:{" "}
                <span className="font-medium">
                  {getDuration(meeting.endsAt, meeting.scheduledAt)}
                </span>
              </p>
            </div>
          )}

          {currentWindow === 1 && (
            <div>
              <p className="text-gray-700 mb-4 font-bold text-lg">
                Participants ({meeting?.participants?.length})
              </p>
              <div className="flex flex-col gap-4 max-h-[40vh] overflow-y-auto pr-2">
                {meeting.participants?.map((participant, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border rounded-2xl p-4 bg-indigo-50 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-lg w-12 h-12 flex items-center justify-center rounded-full bg-indigo-500 text-white font-bold">
                        {participant?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-gray-800 text-lg font-medium">
                          {participant.name}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {participant.email}
                        </p>
                      </div>
                    </div>
                    {participant.status === "accepted" ? (
                      <div className="text-green-600 font-semibold flex flex-col items-end">
                        <p>Location provided</p>
                        <div className="flex items-center gap-1 text-green-500">
                          <FaCheckCircle /> Confirmed
                        </div>
                      </div>
                    ) : participant.status === "pending" ? (
                      <div className="text-yellow-600 font-semibold flex flex-col items-end">
                        <p>Location pending</p>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <FaHourglassHalf /> Pending
                        </div>
                      </div>
                    ) : (
                      <div className="text-red-600 font-semibold flex flex-col items-end">
                        <p>Location not provided</p>
                        <div className="flex items-center gap-1 text-red-500">
                          <FaCircleXmark /> Rejected
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentWindow === 2 && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Vote for a Place</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {locations.map((place) => (
                  <VotingCard
                    key={place.id}
                    place={place}
                    onLike={handleLike}
                    onDislike={handleDislike}
                  />
                ))}
              </div>
              <VotingResults locations={locations} />
              {/* <VotingResultsChart locations={locations} /> */}

              {meeting?.creator?.email === user.email && (
                <div className="flex justify-end">
                  <button
                    onClick={() => setEndVotingOpen(true)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    End Voting
                  </button>
                </div>
              )}

              {/* End Voting Modal */}
              {endVotingOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                  <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
                    <h2 className="text-xl font-bold mb-4">
                      As per the voting
                    </h2>
                    <p className="mb-4 text-gray-600">
                      Select one of the ranked places for final confirmation:
                    </p>
                    <ul className="space-y-3">
                      {ranked.map((place, index) => (
                        <li
                          key={place.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="radio"
                            id={`place-${place.id}`}
                            name="selectedPlace"
                            value={place.id}
                            checked={selectPlace === place.id}
                            onChange={() => setSelectPlace(place.id)}
                          />
                          <label
                            htmlFor={`place-${place.id}`}
                            className="flex-1"
                          >
                            {index + 1}. {place.title}
                          </label>
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        onClick={() => setEndVotingOpen(false)}
                        className="px-4 py-2 bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        disabled={!selectPlace}
                        onClick={() => {
                          console.log("Final confirmed place:", selectPlace);
                          setEndVotingOpen(false);
                        }}
                        className={`px-4 py-2 text-white rounded ${
                          selectPlace
                            ? "bg-blue-500"
                            : "bg-blue-300 cursor-not-allowed"
                        }`}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <VoteDistribution locations={locations} />
            </div>
          )}

          {currentWindow === 3 && <div>Map View (to be implemented)</div>}
        </div>
      </div>

      {/* Modals */}
      <LocationModel
        isOpen={isOpen}
        onClose={onCloseLocationModal}
        invite={{ ...meeting, id: meeting._id }}
      />
      <ConfirmationModel
        idx={meeting._id}
        handleDecline={handleDecline}
        showDeclineModal={showDeclineModal}
        setShowDeclineModal={setShowDeclineModal}
      />
      <Modal open={isOpenMadal} onClose={onClose} save={updateMeeting}>
        <div>
          <label className="block text-sm font-medium mb-2">
            Meeting Title *
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter meeting title"
            className="w-full border rounded-lg px-4 py-3 mb-4"
          />
          <label className="block text-sm font-medium mb-2">
            Description (optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>
      </Modal>
    </div>
  );
};

export default MeetingsInfoPage;
