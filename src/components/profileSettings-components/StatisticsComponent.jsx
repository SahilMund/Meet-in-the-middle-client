import React from 'react'

const StatisticsComponent = () => {
  return (
    <div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 ">Your Statistics</h2>
      <div className="flex flex-wrap gap-10 justify-between items-center text-gray-400">
        <div className="rounded-[5px] bg-blue-900 p-6 w-28 md:w-32 text-center shadow ">vis</div>
        <div className="rounded-[5px] bg-green-800 p-6 w-28 md:w-32 text-center shadow">cici</div>
        <div className="rounded-[5px] bg-purple-900 p-6 w-28 md:w-32 text-center shadow">coc</div>
        <div className="rounded-[5px] bg-amber-700 p-6 w-29 md:w-32 text-center shadow">ksk</div>
      </div>
    </div>
  );
}

export default StatisticsComponent;
