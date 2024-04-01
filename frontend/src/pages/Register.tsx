import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
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
          phone_number: data.get('phone'),
          email: data.get('email'),
        }),
      });
      let responseJson = await response.json();
      if (responseJson.status === "Registration failed") {
        alert(responseJson["message"]);
      } else if (responseJson.status === "Registration successful") {
        alert("Registration Succeeded");
        window.localStorage.setItem("user_id", responseJson.user_id);
        window.localStorage.setItem("user_exist", "true");
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
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-80"
      >
        <h2 className="text-xl font-semibold mb-6">Sign Up</h2>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            E-Mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="09999999999/+919999999999"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-500 text-white py-2 px-4 rounded-md ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-indigo-600 transition duration-300"
            }`}
          >
            Sign Up
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
