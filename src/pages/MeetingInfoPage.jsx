import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react";

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
} from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
const ConfirmationModel = lazy(() => import("../components/ConfirmationModel"));
const LocationModel = lazy(() => import("../components/LocationModel"));

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import getDuration from "../utils/getDuration";
import { toast } from "react-toastify";
import {
  deleteMeetingById,
  getMeetingById,
  rejectMeeting,
  updatemeetingDetails,
} from "../services/meetings";
import Modal from "../components/Modal";
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

  const [isOpenMadal, setIsOpenMadal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const myParticipation = meeting?.participants?.find(
    (participant) => participant?.email == user?.email
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
    };
    fetchmeeting();
  }, [id]);

  const convertDate = (date) => {
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const convertTime = (date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const onClose = () => {
    setIsOpenMadal(false);
  };

  const updateMeeting = async () => {
    const response = await updatemeetingDetails(meeting?._id, {
      title,
      description,
    });
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  const onCloseLocationModal = () => {
    setIsOpen(false);
  };

  const handleDecline = useCallback(async (id) => {
    try {
      const response = await rejectMeeting(id);
      const data = response.data;
      if (!data.success) {
        throw new Error(data.message);
      }
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
    setShowDeclineModal(false);
  }, []);

  return (
    <div className="p-6 bg-[#f4f6f9] min-h-screen relative">
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
              {meeting.title}
            </span>
            <span className="rounded-2xl px-3 py-1 bg-yellow-400 text-gray-900 text-sm font-semibold shadow-md">
              Voting
            </span>
          </div>

          <p className="text-indigo-100 max-w-lg">{meeting.description}</p>

          <div className="flex flex-col gap-6 text-indigo-100 font-medium">
            <div className="flex gap-2">
              <p>Starts On:</p>
              <FaCalendarAlt className="text-yellow-300" />
              <span>{convertDate(new Date(meeting.scheduledAt))}</span>

              <FaClock className="text-pink-300" />
              <span>{convertTime(new Date(meeting.scheduledAt))}</span>
            </div>
            <div className="flex gap-2">
              <p>Ends On:</p>
              <FaCalendarAlt className="text-yellow-300" />
              <span>{convertDate(new Date(meeting.endsAt))}</span>

              <FaClock className="text-pink-300" />
              <span>{convertTime(new Date(meeting.endsAt))}</span>
            </div>

            <div className="flex gap-2">
              <FaUsers className="text-green-300" />
              <span>{meeting?.participants?.length} participants</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 items-baseline-last">
          <button className="flex items-center gap-2 border-2 border-green-300 text-green-100 hover:bg-green-400 hover:text-white transition px-3 py-2 rounded-lg shadow"
            onClick={() => {
              navigator.share({
                title: `Meeting Invite for ${meeting.title}`,
                text: "Join our meeting",
                url: meeting.meetingLink,
              });

            }}
          >
            <FaShareAlt /> Share
          </button>
          {user?.id === meeting?.creator?._id ? (
            <>
              <button
                className="flex items-center gap-2 border-2 border-blue-300 text-blue-100 hover:bg-blue-400 hover:text-white transition px-3 py-2 rounded-lg shadow"
                onClick={() => {
                  setIsOpenMadal(true);
                }}
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => setShowDeleteAlert(true)}
                className="flex items-center gap-2 border-2 border-red-300 text-red-100 hover:bg-red-500 hover:text-white transition px-3 py-2 rounded-lg shadow"
              >
                <FaTrash /> Cancel
              </button>
            </>
          ) : myParticipation?.status == "Pending" ? (
            <>
              <button
                className="flex items-center gap-2 border-2 border-green-300 text-blue-100 hover:bg-green-400 hover:text-white transition px-3 py-2 rounded-lg shadow"
                onClick={() => setIsOpen(true)}
              >
                Accept
              </button>
              <button
                className="flex items-center gap-2 border-2 border-red-300 text-red-100 hover:bg-red-500 hover:text-white transition px-3 py-2 rounded-lg shadow"
                onClick={() => setShowDeclineModal(true)}
              >
                Reject
              </button>
            </>
          ) : (
            <button
              disabled={true}
              className="flex cursor-not-allowed items-center gap-2 border-2 border-blue-300 text-blue-100 hover:text-white transition px-3 py-2 rounded-lg shadow"
            >
              {myParticipation?.status}
            </button>
          )}
        </div>
      </div>

      {/* Tabs + Content */}
      <div className="shadow bg-white rounded-2xl p-6">
        {/* Tabs */}
        <div className="flex gap-8 border-b-2 border-gray-200 pb-3 mb-6 text-lg">
          <div
            className={`flex items-center gap-2 cursor-pointer ${currentWindow === 0
              ? "text-indigo-600 font-semibold"
              : "text-gray-500"
              }`}
            onClick={() => setcurrentWindow(0)}
          >
            <FaInfoCircle /> Overview
          </div>
          <div
            className={`flex items-center gap-2 cursor-pointer ${currentWindow === 1
              ? "text-indigo-600 font-semibold"
              : "text-gray-500"
              }`}
            onClick={() => setcurrentWindow(1)}
          >
            <FaUsers /> Participants
          </div>
          <div
            className={`cursor-pointer ${currentWindow === 2
              ? "text-indigo-600 font-semibold"
              : "text-gray-500"
              }`}
            onClick={() => setcurrentWindow(2)}
          >
            Voting
          </div>
          <div
            className={`cursor-pointer ${currentWindow === 3
              ? "text-indigo-600 font-semibold"
              : "text-gray-500"
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
                  Created by:
                  <span className="font-medium"> {meeting?.creator?.name}</span>
                </p>
                <p>
                  Status:
                  <span className="text-yellow-600 font-semibold"> Voting</span>
                </p>
                <p>
                  Duration:{" "}
                  <span className="font-medium">
                    {getDuration(meeting.endsAt, meeting.scheduledAt)}
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* Participants */}
          {currentWindow === 1 && (
            <div>
              <p className="text-gray-700 mb-4 font-bold text-lg">
                Participants ({meeting?.participants.length})
              </p>
              <div
                className="flex flex-col gap-4 h-[40vh] overflow-y-scroll pr-2"
                style={{ scrollbarWidth: "none" }}
              >
                {meeting.participants.map((participant, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border border-gray-200 rounded-2xl p-4 bg-indigo-50 shadow-sm"
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

                    {participant.status === "Accepted" ? (
                      <div className="text-right text-green-600 font-semibold flex flex-col items-end">
                        <p> Location provided</p>
                        <div className="flex items-center gap-1 text-green-500">
                          <FaCheckCircle /> Confirmed
                        </div>
                      </div>
                    ) : participant.status === "Pending" ? (
                      <div className="text-right text-yellow-600 font-semibold flex flex-col items-end">
                        <p> Location pending</p>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <FaHourglassHalf /> Pending
                        </div>
                      </div>
                    ) : (
                      <div className="text-right text-red-600 font-semibold flex flex-col items-end">
                        <p> Location not provided</p>
                        <div className="flex items-center gap-1 text-red-500">
                          <FaCircleXmark className="text-sm" /> Rejected
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentWindow === 3 && (
            <div className="px-4">
              <MapContainer meeting={meeting} />
            </div>
          )}
        </div>
      </div>

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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meeting Title <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter meeting title"
              value={title}
              className={`w-full border rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition placeholder-gray-400`}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
              <span className="text-gray-500 font-normal ml-1">(optional)</span>
            </label>
            <textarea
              placeholder="Enter meeting description"
              value={description}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition placeholder-gray-400"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MeetingsInfoPage;
