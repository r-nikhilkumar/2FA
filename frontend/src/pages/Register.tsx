import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event : any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    try {
      let response = await fetch("http://localhost:8000/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.get("username"),
          password: data.get("password"),
        }),
      });
      let responseJson = await response.json();
      if (responseJson.status === "Registration failed") {
        alert(responseJson["message"]);
      } else {
        alert("Registration Succeeded");
        navigate("/two-fa-register-page");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Registration Failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-6">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" id="username" name="username" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" name="password" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-6">
          <button type="submit" disabled={loading} className={`w-full bg-indigo-500 text-white py-2 px-4 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600 transition duration-300'}`}>Sign Up</button>
        </div>
        <p className="text-sm text-gray-600">Already have an account? <a href="#" className="text-indigo-600 hover:underline">Sign In</a></p>
      </form>
    </div>
  );
};

export default Register;
