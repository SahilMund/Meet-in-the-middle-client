import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";


const schema = z.object({
  email: z.string().email("Invalid email"),
});

const ForgotPassword = () => {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      setError("");
      const res = await axios.post("http://localhost:8000/api/auth/forgot-password", data);
      toast.success(res.data.message)
      reset()
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }

  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        {/* {message && <p className="text-green-500">{message}</p>} */}
        {error && <p className="text-red-500">{error}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className="w-full border p-2 rounded mb-2"
        />
        {/* {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>} */}

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
