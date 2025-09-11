import React from "react";
import { TfiImport } from "react-icons/tfi";
import { CiLock } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { deleteUserAccount } from "../services/userSettings";
import { replace, useNavigate } from "react-router-dom";

const SettingPageAccount = () => {
  const navigate = useNavigate();
  const handleDeleteAccount = async () => {
    try {
      const res = await deleteUserAccount();
      toast.success(res.data.message);
      navigate("/login", replace);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <br />
      <div className="p-6 bg-white rounded-2xl shadow-md space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Account Management
        </h1>

        {/* Export Data */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <TfiImport className="text-2xl text-gray-600 flex-shrink-0 self-center" />
            <div className="flex flex-col justify-center">
              <h2 className="text-lg font-medium text-gray-700">Export Data</h2>
              <p className="text-sm text-gray-500">
                Download a copy of your account data
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-transparent border border-black text-black rounded-lg hover:bg-black hover:text-white transition">
            Export
          </button>
        </div>

        {/* Change Password */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <CiLock className="text-2xl text-gray-600 flex-shrink-0 self-center" />
            <div className="flex flex-col justify-center">
              <h2 className="text-lg font-medium text-gray-700">
                Change Password
              </h2>
              <p className="text-sm text-gray-500">
                Update your account password
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-transparent border border-black text-black rounded-lg hover:bg-black hover:text-white transition">
            Change
          </button>
        </div>

        {/* Delete Account */}
        <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <RiDeleteBin5Line className="text-2xl text-red-600 flex-shrink-0 self-center" />
            <div className="flex flex-col justify-center">
              <h2 className="text-lg font-medium text-red-600">
                Delete Account
              </h2>
              <p className="text-sm text-gray-500">
                Permanently delete your account and all data
              </p>
            </div>
          </div>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-700 transition"
            onClick={handleDeleteAccount}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingPageAccount;
