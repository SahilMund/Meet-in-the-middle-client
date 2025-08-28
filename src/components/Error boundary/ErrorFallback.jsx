import React from "react";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
      {/* Sinking Ship Illustration (SVG) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="180"
        height="180"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mb-6 animate-bounce"
      >
        <path d="M2 20h20M6 16l4-9 5 9 2-5 5 5" />
        <circle cx="6.5" cy="16.5" r="0.5" />
        <circle cx="11.5" cy="16.5" r="0.5" />
      </svg>

      {/* Error Text */}
      <h2 className="text-2xl font-semibold text-blue-600 mb-2">
        Something wrong here...
      </h2>
      <p className="text-gray-600 max-w-md text-sm">
        Sorry, we're having some technical issues (as you can see). <br />
        Try refreshing the page, sometimes it works :)
      </p>

      {/* Reload Button */}
      <button
        onClick={resetErrorBoundary}
        className="mt-6 px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
      >
        Reload Page
      </button>
    </div>
  );
};

export default ErrorFallback;
