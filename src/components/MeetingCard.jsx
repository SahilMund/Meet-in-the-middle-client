
import { useState } from "react";
import { CiFilter, CiSearch } from "react-icons/ci";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUserFriends } from "react-icons/fa";
import { IoMdGrid, IoMdTime } from "react-icons/io";
import { TfiMenuAlt } from "react-icons/tfi";

export default function MeetingList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isGrid, setIsGrid] = useState(false);

  const myMeetings = [
    {
      title: "Team Meet",
      description: "Weekly Team Meeting",
      date: "Today",
      time: "10:00 Am",
      duration: "1 hour",
      Place: "Starbucks, 5th Avenue",
      people: ["Virat Kholi", "Salman Khan", "Dhoni Bhai", "Some One", "Some Thing", "Kushal Deep"],
      status: "Confirmed",
    },
    {
      title: "Project Review",
      description: "Discuss ongoing sprint",
      date: "Tomorrow",
      time: "2:00 PM",
      duration: "2 hours",
      Place: "Zoom",
      people: ["Virat Kholi", "Salman Khan", "Dhoni Bhai"],
      status: "Pending",
    },
    {
      title: "Feature Voting",
      description: "Vote for Q3 features",
      date: "Friday",
      time: "11:00 AM",
      duration: "1.5 hours",
      Place: "Google Meet",
      people: ["Virat Kholi", "Salman Khan", "Dhoni Bhai", "Some One", "Some Thing"],
      status: "Voting",
    },
    {
      title: "Client Call",
      description: "Monthly update with client",
      date: "Monday",
      time: "9:00 AM",
      duration: "45 mins",
      Place: "Microsoft Teams",
      people: ["Virat Kholi", "Salman Khan"],
      status: "Confirmed",
    },
  ];

  const filteredMeetings = myMeetings.filter((meeting) => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || meeting.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    Confirmed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Voting: "bg-blue-100 text-blue-800",
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-bold">My meetings</h1>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[180px]">
            <CiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border pl-8 pr-2 py-1 rounded focus:outline-none text-sm sm:text-base"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative flex-1 min-w-[140px] sm:flex-none">
            <CiFilter className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border pl-8 pr-2 py-1 rounded appearance-none focus:outline-none text-sm sm:text-base"
            >
              <option value="All">Filter</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Voting">Voting</option>
            </select>
          </div>

          {/* View Icons */}
          <IoMdGrid
            className={`cursor-pointer hidden md:block ${
              isGrid ? "text-blue-500" : ""
            }`}
            size={24}
            onClick={() => setIsGrid(true)}
          />
           <TfiMenuAlt
            className={`cursor-pointer hidden md:block ${
              !isGrid ? "text-blue-500" : ""
            }`}
            size={24}
            onClick={() => setIsGrid(false)}
          />
        </div>
      </div>

      {/* Cards Grid */}
    
              <div
        className={`grid gap-4 mt-4 ${
          isGrid ? "md:grid-cols-2" : "grid-cols-1"
        }`}
      >

        {filteredMeetings.map((meeting, idx) => {
          const visiblePeople = meeting.people.slice(0, 3);
          const remainingCount = meeting.people.length - 3;

          return (
            <div
              key={idx}
              className="relative bg-white rounded-lg shadow-md p-5 flex flex-col gap-3 border border-gray-200"
            >
              {/* Status Badge */}
              <span
                className={`absolute top-3 right-3 px-3 py-1 text-sm font-semibold rounded-full ${
                  statusColors[meeting.status] || "bg-gray-100 text-gray-800"
                }`}
              >
                {meeting.status}
              </span>

              {/* Title & Description */}
              <div>
                <h2 className="text-lg font-bold">{meeting.title}</h2>
                <p className="text-gray-600 text-sm">{meeting.description}</p>
              </div>

              {/* Date, Time, Duration */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="text-gray-500" />
                  <span>{meeting.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <IoMdTime className="text-gray-500" />
                  <span>{meeting.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaClock className="text-gray-500" />
                  <span>{meeting.duration}</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <FaMapMarkerAlt className="text-gray-500" />
                <span>{meeting.Place}</span>
              </div>

              {/* People */}
              <div className="flex items-center gap-2">
                <FaUserFriends className="text-gray-500" />
                <div className="flex items-center">
                  {visiblePeople.map((person, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold border-2 border-white -ml-2 first:ml-0"
                    >
                      {getInitials(person)}
                    </div>
                  ))}
                  {remainingCount > 0 && (
                    <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-xs font-bold border-2 border-white -ml-2">
                      +{remainingCount}
                    </div>
                  )}
                </div>
              </div>

              {/* View Details */}
              <div className="flex justify-end mt-2">
                <button className="text-blue-600 hover:underline font-medium text-sm">
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
