// SignIn.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export const metadata = {
  title: "Вход - Простой",
  description: "Описание страницы",
};

const SignIn = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      console.log("Login failed", data);
      if (response.ok) {
        console.log("Login successful", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        navigate("/ecommerce");
      } else {
        console.log("Login failed", response.body);
        console.log("Login failed", loginData);
        console.log("Login failed", data);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  const handleRegister = () => {
    navigate('/signup');
  }
  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Заголовок страницы */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">
              Simplify the analysis
            </h1>
          </div>

          {/* Форма входа */}
          <div className="max-w-sm mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-input w-full text-gray-800"
                    value={loginData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-input w-full text-gray-800"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button
                    type="submit"
                    className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                  >
                    Sign In
                  </button>
                </div>
              </div>
              <div className="mt-7">
                <p>Already have account?</p>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none mt-3"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
