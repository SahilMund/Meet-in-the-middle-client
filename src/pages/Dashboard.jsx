import React, { useEffect, useState } from 'react'
import MeetingCard from '../components/MeetingCard'
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaRegCheckCircle } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { AiOutlineStock } from 'react-icons/ai';
import InfoCard from '../components/InfoCard';


const Dashboard = () => {


    const updates1=[
        {
            title:"Upcoming meetings",
            number:5,
            icon:<FaCalendarAlt/>,
            color:"#155dfc"
        },
         {
            title:"Pending invitations",
            number:5,
            icon:<IoPersonOutline/>,
            color:"#ffc400"
        },
         {
            title:"Total Meetings",
            number:5,
            icon:<FaRegStar/>,
            color:"#f70505"
        },
    ]

       const updates2=[
         {
            title:"This Week",
            number:5,
            icon:<AiOutlineStock />,
            color:"#f70505"
        },
         {
            title:"Avg Participants",
            number:4.3,
            icon:<FaUsers/>,
            color:"#a063eb"
        },
          {
            title:"Success Rate",
            number:"92%",
            icon:<FaRegCheckCircle/>,
            color:"#ff7700"
        },
    ]
       
        //upcoming Meetings Dummy data
        const upcomingMeetings=[
            {
                title:"Team StandUp",
                date:"Today",
                time:"11.18PM",
                people:3,
                status:"confirmed",
                place:"Central park cafe"
            },
              {
                title:"Team StandUp",
                date:"Today",
                time:"11.18PM",
                people:3,
                status:"confirmed",
                 place:"Central park cafe"
            }
        ]
            // pending invitations dummy data
       

      



  return (
    <div className='w-screen'>
       
       <div className='px-5 sm:px-20 py-10'>
         <h1 className='text-4xl  font-extrabold'>Welcome Back! 👋</h1>
        <p className=''>Here's What happening With your meetings today</p>


       <InfoCard updates={updates1}/>

        {/* {card components} */}
         <div className="grid grid-cols-3 gap-4 mt-5">
      {updates1.map((elem, index) => (
        <motion.div
          key={index}
          initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{
              scale: 1.03,
              boxShadow: '0px 8px 24px rgba(0,0,0,0.1)',
              transition: { duration: 0.3 },
            }}
          style={{ backgroundColor: elem.color }}
          className={`p-1 sm:p-4 rounded-lg shadow-md flex items-center justify-between`}
        >
          {/* Left section - title and number inline */}
          <div className="flex flex-col items-center gap-2 text-white">
            <h3 className="text-md sm:text-lg font-bold">{elem.title}</h3>
            <p className="text-xl font-extrabold">{elem.number}</p>
          </div>

          {/* Right section - icon */}
          <div className="text-2xl text-white">{elem.icon}</div>
        </motion.div>
      ))}
    </div>


       

        {/* Long Card */}
        <div className="flex justify-between items-center mt-10 bg-[#0b0626] rounded-2xl p-6 shadow-lg">
        {/* Text Section */}
        <div className="flex flex-col text-white max-w-[70%]">
            <h2 className="text-2xl font-bold mb-2">Ready To Organize a New Meeting?</h2>
            <p className="text-sm opacity-90">
            Create a meeting and invite participants to find the perfect location.
            </p>
        </div>

        {/* Button */}
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-[#0b0626] bg-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
            + Create Meeting
        </motion.button>
        </div>

        {/* {cards again} */}

        <InfoCard updates={updates2}/>
       
       

         <div className="grid grid-cols-4 gap-4 mt-7">
      {updates2.map((elem, index) => (
        <motion.div
          key={index}
          initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{
              scale: 1.03,
              boxShadow: '0px 8px 24px rgba(0,0,0,0.1)',
              transition: { duration: 0.3 },
            }}
          style={{ backgroundColor:elem.color}}
          className={`bg-amber-300  p-2 sm:p-4 rounded-lg shadow-md flex sm:flex-row flex-col items-center justify-between`}
        >
          {/* Left section - title and number inline */}
          <div className="flex flex-col px-2 text-white items-center gap-2">
            <h3 className="text-lg sm:font-extrabold font-light">{" "}{elem.title}</h3>
            <p className="text-xl font-bold">{elem.number}</p>
          </div>

          {/* Right section - icon */}
          <div className="text-2xl text-white">{elem.icon}</div>
        </motion.div>
      ))}
    </div>


         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {/* Upcoming Meetings */}
      <div className="bg-white shadow-md rounded-xl p-5 flex flex-col">
        <div className="flex items-center gap-2 border-b pb-3 mb-3">
          <FaCalendarAlt className="text-blue-500 text-xl" />
          <h2 className="text-xl font-semibold">Upcoming Meetings</h2>
        </div>
        <div className="flex flex-col gap-4">
          {upcomingMeetings.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-blue-50 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm text-gray-600">
                  {item.date} at {item.time}
                </p>
                <p className="text-sm text-gray-500 flex gap-2">
                  <IoPersonOutline className='mt-1'/>{item.people} • {item.place}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow-md rounded-xl p-5 flex flex-col">
        <div className="flex items-center gap-2 border-b pb-3 mb-3">
          <MdHistory className="text-purple-500 text-xl" />
          <h2 className="text-xl font-semibold">Recent Activity</h2>
        </div>
        <div className="flex flex-col gap-4">
          {[
            { user: "John", action: "voted for Central Park Cafe", context: "Team StandUp", time: "12:08 PM" },
            { user: "Sarah", action: "joined the meeting", context: "Weekly Sync", time: "9:45 AM" },
            { user: "Mike", action: "created a new poll", context: "Product Planning", time: "8:30 AM" },
          ].map((activity, index) => (
            <div key={index} className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-medium">
                <span className="font-semibold">{activity.user}</span> {activity.action}
              </h3>
              <p className="text-sm text-gray-500">
                {activity.context} • {activity.time}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white shadow-md rounded-xl p-5 flex flex-col">
        <div className="flex items-center gap-2 border-b pb-3 mb-3">
          <IoNotificationsOutline className="text-red-500 text-xl" />
          <h2 className="text-xl font-semibold">Notifications</h2>
        </div>
        <div className="flex flex-col gap-4">
          {[
            { title: "Meeting will start soon", message: "Team StandUp starts in 2 hours" },
            { title: "New poll created", message: "Vote for the next meeting location" },
          ].map((notif, index) => (
            <div key={index} className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-semibold">{notif.title}</h4>
              <p className="text-sm text-gray-600">{notif.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* {pending Invitations } */}

            

    {/* My Meetings section */}
  

        {/*  My Meeting card */}
        <MeetingCard/>
       




       </div>
    </div>
  )
}

export default Dashboard